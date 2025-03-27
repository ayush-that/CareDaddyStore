import { NextResponse } from 'next/server';

interface LeadData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  description?: string;
  source?: string;
  orderItems?: string;
  orderId?: string;
  amount?: string;
  status?: string;
  addressStreet?: string;
  addressCity?: string;
  addressState?: string;
  addressCountry?: string;
  addressPostalCode?: string;
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    let data: LeadData;
    try {
      const text = await request.text();
      console.log('Raw request data:', text);

      if (!text || text.trim() === '') {
        throw new Error('Empty request body');
      }

      data = JSON.parse(text) as LeadData;
    } catch (parseError) {
      console.error('Error parsing request JSON:', parseError);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request',
          details: parseError instanceof Error ? parseError.message : String(parseError),
        },
        { status: 400 }
      );
    }

    console.log('Received lead data:', data);

    if (!data.firstName || !data.lastName) {
      console.error('Missing required fields');
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          details: 'firstName and lastName are required',
        },
        { status: 400 }
      );
    }

    const LEAD_CAPTURE_ID =
      process.env.NEXT_PUBLIC_ESPOCRM_LEAD_CAPTURE_ID || 'd6e603dda729de3fb3c8c13560b7e8cb';

    if (LEAD_CAPTURE_ID === 'dummy') {
      console.log('Using dummy mode - EspoCRM API will not be called');
      console.log('Data that would have been sent:', data);

      return NextResponse.json({
        success: true,
        data: {
          message: 'Dummy mode - lead captured successfully (simulated)',
          leadId: 'dummy-lead-id-' + Date.now(),
        },
      });
    }

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://139.59.23.17/api/v1';

    console.log('Using Lead Capture ID:', LEAD_CAPTURE_ID);
    console.log('Using environment variable NEXT_PUBLIC_ESPOCRM_LEAD_CAPTURE_ID:', LEAD_CAPTURE_ID);
    console.log('Using environment variable NEXT_PUBLIC_API_BASE_URL:', API_BASE_URL);

    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

    const ESPO_API_URL = `${baseUrl}/LeadCapture/${LEAD_CAPTURE_ID}`;
    console.log('Sending data to EspoCRM Lead Capture:', ESPO_API_URL);

    let enhancedDescription = data.description || '';

    if (data.orderItems) {
      enhancedDescription += `\n\nOrdered Items:\n${data.orderItems}`;
    }

    if (data.orderId) {
      enhancedDescription += `\n\nOrder ID: ${data.orderId}`;
    }

    if (data.amount) {
      enhancedDescription += `\n\nOrder Amount: ${data.amount}`;
    }

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber ? formatPhoneNumber(data.phoneNumber) : '',
      addressStreet: data.addressStreet || data.address || '',
      addressCity: data.addressCity || data.city || '',
      addressState: data.addressState || data.state || '',
      addressCountry: data.addressCountry || data.country || '',
      addressPostalCode: data.addressPostalCode || data.postalCode || '',
      description: enhancedDescription,
      source: data.source || 'Web Site',
      status: 'New',
      campaign: 'CareDaddyStore',
    };

    const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v != null));

    console.log('Payload being sent to EspoCRM:', cleanPayload);
    console.log('Final request URL:', ESPO_API_URL);
    console.log('Request headers:', {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    console.log('Request body:', JSON.stringify(cleanPayload));

    try {
      const response = await fetch(ESPO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(cleanPayload),
      });

      if (!response.ok) {
        console.error(`EspoCRM API error: ${response.status} ${response.statusText}`);

        let errorDetail;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            errorDetail = await response.json();
          } else {
            errorDetail = await response.text();
          }
        } catch (responseError) {
          errorDetail = 'Could not parse response';
        }

        console.error('Error details:', errorDetail);

        return NextResponse.json({
          success: true,
          data: {
            message:
              'Form submitted successfully, but there was an issue with the EspoCRM integration',
            apiError: `${response.status} ${response.statusText}`,
          },
          warning: 'EspoCRM integration failed - data may not have been saved in CRM',
          sentPayload: cleanPayload,
        });
      }

      let result;
      try {
        const responseText = await response.text();
        console.log('Raw response from EspoCRM:', responseText);

        if (responseText && responseText.trim() !== '') {
          if (responseText.trim() === 'true') {
            result = { success: true, message: 'Lead successfully created in EspoCRM' };
          } else {
            try {
              result = JSON.parse(responseText);
            } catch (jsonError) {
              result = { text: responseText };
            }
          }
        } else {
          result = { success: true, message: 'Empty response from EspoCRM' };
        }
      } catch (error) {
        console.error('Error reading response:', error);
        result = { success: true, message: 'Response read error' };
      }

      console.log('EspoCRM Lead Capture success response:', result);
      return NextResponse.json({
        success: true,
        data: result,
        sentPayload: cleanPayload,
        espoApiUrl: ESPO_API_URL,
        leadCaptureId: LEAD_CAPTURE_ID,
      });
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json({
        success: true,
        data: {
          message: 'Form submitted successfully, but could not connect to EspoCRM',
          error: fetchError instanceof Error ? fetchError.message : String(fetchError),
        },
        warning: 'EspoCRM connection issue - data could not be sent to CRM',
        sentPayload: cleanPayload,
      });
    }
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json({
      success: true,
      data: {
        message: 'Form submitted successfully, but there was an issue with the EspoCRM integration',
        error: error instanceof Error ? error.message : String(error),
      },
      warning: 'EspoCRM integration issue - processing error occurred',
    });
  }
}

function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return '';

  const digitsOnly = phoneNumber.replace(/\D/g, '');

  if (phoneNumber.includes('+') || phoneNumber.includes('-')) {
    return phoneNumber;
  }

  if (digitsOnly.length === 10) {
    return digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  } else if (digitsOnly.length > 10) {
    const countryCode = digitsOnly.slice(0, digitsOnly.length - 10);
    const restOfNumber = digitsOnly.slice(-10);
    return `+${countryCode}-${restOfNumber.slice(0, 3)}-${restOfNumber.slice(3, 6)}-${restOfNumber.slice(6)}`;
  } else {
    return digitsOnly.replace(/(\d{3})(?=\d)/g, '$1-');
  }
}
