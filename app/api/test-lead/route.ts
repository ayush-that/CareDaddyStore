import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const testPayload = {
      firstName: 'Test',
      lastName: 'User',
      emailAddress: 'test@example.com',
      phoneNumber: '+1-123-456-7890',
      addressStreet: 'Test Street',
      addressCity: 'Test City',
      addressState: 'Test State',
      addressCountry: 'Test Country',
      addressPostalCode: '12345',
      description: 'Test lead from API test script',
      source: 'Web Site',
      status: 'New',
    };

    const LEAD_CAPTURE_ID =
      process.env.NEXT_PUBLIC_ESPOCRM_LEAD_CAPTURE_ID || 'd6e603dda729de3fb3c8c13560b7e8cb';
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://139.59.23.17/api/v1';

    console.log('Using Lead Capture ID:', LEAD_CAPTURE_ID);
    console.log('Using API Base URL:', API_BASE_URL);

    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const ESPO_API_URL = `${baseUrl}/LeadCapture/${LEAD_CAPTURE_ID}`;

    console.log('Test API URL:', ESPO_API_URL);
    console.log('Test Payload:', testPayload);

    try {
      const response = await fetch(ESPO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(testPayload),
      });

      const responseStatus = `${response.status} ${response.statusText}`;
      console.log('Test Response Status:', responseStatus);

      const responseText = await response.text();
      console.log('Test Response Text:', responseText);

      return NextResponse.json({
        success: true,
        message: 'Test lead submitted',
        responseStatus,
        responseText,
        payload: testPayload,
      });
    } catch (fetchError) {
      console.error('Test API Fetch Error:', fetchError);
      return NextResponse.json(
        {
          success: false,
          error: String(fetchError),
          message: 'Error sending test lead',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: 'Error in test API',
      },
      { status: 500 }
    );
  }
}
