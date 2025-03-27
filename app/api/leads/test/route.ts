import { NextResponse } from 'next/server';

// This is a simple test endpoint to verify the EspoCRM connection
export async function GET(request: Request) {
  try {
    // Use the hardcoded values if not provided in env
    const leadCaptureId = process.env.ESPOCRM_LEAD_CAPTURE_ID || 'd6e603dda729de3fb3c8c13560b7e8cb';
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://139.59.23.17/api/v1';

    // Format the URL (remove trailing slash if present)
    const baseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;

    const espoApiUrl = `${baseUrl}/LeadCapture/${leadCaptureId}`;

    // Return configuration information
    return NextResponse.json({
      success: true,
      config: {
        baseApiUrl: baseUrl,
        leadCaptureId,
        fullApiUrl: espoApiUrl,
      },
      // Show the exact payload format that should be sent
      exactPayloadFormat: {
        firstName: 'FIRST_NAME',
        lastName: 'LAST_NAME',
        emailAddress: 'EMAIL_ADDRESS',
        phoneNumber: 'PHONE_NUMBER',
        addressStreet: 'ADDRESS_STREET',
        addressCity: 'ADDRESS_CITY',
        addressState: 'ADDRESS_STATE',
        addressCountry: 'ADDRESS_COUNTRY',
        addressPostalCode: 'ADDRESS_POSTAL_CODE',
        description: 'DESCRIPTION',
        status: 'STATUS',
      },
      notes: [
        'Make sure the API URL is accessible from your server',
        'All field names must match exactly as shown in the payload',
        'The Lead Capture ID must be the one provided by EspoCRM',
      ],
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'API test error',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
