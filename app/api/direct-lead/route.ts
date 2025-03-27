import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // This payload will be sent directly to the EspoCRM API
    const testLead = {
      firstName: 'Direct',
      lastName: 'Test',
      emailAddress: 'direct@example.com',
      phoneNumber: '+1-123-456-7890',
      addressStreet: '123 Direct St',
      addressCity: 'Direct City',
      addressState: 'Direct State',
      addressCountry: 'Direct Country',
      addressPostalCode: '12345',
      description: 'Direct API test lead',
      source: 'Web Site',
      status: 'New',
      assignedUserId: '1', // Try assigning to admin
    };

    // Use the base API URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://139.59.23.17/api/v1';
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '1156fc8a540553f20b6ef489ea42cd9c';

    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

    // Direct API endpoint for creating a lead entity
    const ESPO_API_URL = `${baseUrl}/Lead`;

    console.log('Direct API URL:', ESPO_API_URL);
    console.log('Direct Lead Payload:', testLead);

    try {
      const response = await fetch(ESPO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Api-Key': API_KEY,
        },
        body: JSON.stringify(testLead),
      });

      const responseStatus = `${response.status} ${response.statusText}`;
      console.log('Direct API Response Status:', responseStatus);

      let responseBody;
      try {
        responseBody = await response.json();
        console.log('Direct API Response Body:', responseBody);
      } catch (e) {
        const responseText = await response.text();
        console.log('Direct API Response Text:', responseText);
        responseBody = { text: responseText };
      }

      return NextResponse.json({
        success: response.ok,
        message: 'Direct lead creation attempt',
        responseStatus,
        response: responseBody,
        payload: testLead,
      });
    } catch (fetchError) {
      console.error('Direct API Fetch Error:', fetchError);
      return NextResponse.json(
        {
          success: false,
          error: String(fetchError),
          message: 'Error sending direct lead',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Direct API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: 'Error in direct API',
      },
      { status: 500 }
    );
  }
}
