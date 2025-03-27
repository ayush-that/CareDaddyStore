import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request data
    let data;
    try {
      const text = await request.text();
      console.log('Raw request data:', text);
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing request JSON:', parseError);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request',
        },
        { status: 400 }
      );
    }

    // Get environment variables
    const LEAD_CAPTURE_ID =
      process.env.NEXT_PUBLIC_ESPOCRM_LEAD_CAPTURE_ID || 'd6e603dda729de3fb3c8c13560b7e8cb';
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://139.59.23.17/api/v1';
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '1156fc8a540553f20b6ef489ea42cd9c';

    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

    // Process the description to include all fields
    let description = data.description || '';
    if (data.orderItems) {
      description += `\n\nOrdered Items:\n${data.orderItems}`;
    }
    if (data.orderId) {
      description += `\n\nOrder ID: ${data.orderId}`;
    }
    if (data.amount) {
      description += `\n\nOrder Amount: ${data.amount}`;
    }

    // 1. First try using the Lead Capture API (what we've been using)
    const capturePayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      addressStreet: data.addressStreet || data.address || '',
      addressCity: data.addressCity || data.city || '',
      addressState: data.addressState || data.state || '',
      addressCountry: data.addressCountry || data.country || '',
      addressPostalCode: data.addressPostalCode || data.postalCode || '',
      description: description,
      source: data.source || 'Web Site',
      status: 'New',
      campaign: 'CareDaddyStore',
    };

    // Create the lead data for direct API (more fields available)
    const directPayload = {
      ...capturePayload,
      assignedUserId: '1', // Try to assign to Admin
      name: `${data.firstName} ${data.lastName}`, // Add name field required by Lead entity
    };

    const results = {
      leadCapture: null,
      directApi: null,
      overallSuccess: false,
    };

    // First try Lead Capture API
    try {
      const CAPTURE_URL = `${baseUrl}/LeadCapture/${LEAD_CAPTURE_ID}`;
      console.log('Trying Lead Capture API:', CAPTURE_URL);

      const captureResponse = await fetch(CAPTURE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(capturePayload),
      });

      const captureStatus = captureResponse.status;
      let captureResult;

      try {
        const responseText = await captureResponse.text();
        if (responseText.trim() === 'true') {
          captureResult = { success: true };
        } else {
          try {
            captureResult = JSON.parse(responseText);
          } catch (e) {
            captureResult = { text: responseText };
          }
        }
      } catch (e) {
        captureResult = { error: String(e) };
      }

      results.leadCapture = {
        status: captureStatus,
        result: captureResult,
        success: captureStatus === 200,
      };

      if (captureStatus === 200) {
        results.overallSuccess = true;
      }
    } catch (captureError) {
      results.leadCapture = {
        error: String(captureError),
        success: false,
      };
    }

    // Then also try direct API to ensure it shows in the panel
    try {
      const DIRECT_URL = `${baseUrl}/Lead`;
      console.log('Trying Direct Lead API:', DIRECT_URL);

      const directResponse = await fetch(DIRECT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Api-Key': API_KEY,
        },
        body: JSON.stringify(directPayload),
      });

      const directStatus = directResponse.status;
      let directResult;

      try {
        directResult = await directResponse.json();
      } catch (e) {
        const responseText = await directResponse.text();
        directResult = { text: responseText };
      }

      results.directApi = {
        status: directStatus,
        result: directResult,
        success: directStatus >= 200 && directStatus < 300,
      };

      if (directStatus >= 200 && directStatus < 300) {
        results.overallSuccess = true;
      }
    } catch (directError) {
      results.directApi = {
        error: String(directError),
        success: false,
      };
    }

    // Return combined results
    return NextResponse.json({
      success: results.overallSuccess,
      results,
      message: results.overallSuccess
        ? 'Lead submitted successfully via one or both methods'
        : 'Failed to submit lead via both methods',
    });
  } catch (error) {
    console.error('Dual-lead API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: 'Error in dual-lead API',
      },
      { status: 500 }
    );
  }
}
