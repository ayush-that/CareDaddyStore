interface OrderData {
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  address: FormDataEntryValue | null;
  city: FormDataEntryValue | null;
  state: FormDataEntryValue | null;
  zipCode: FormDataEntryValue | null;
  country: FormDataEntryValue | null;
  paymentMethod: FormDataEntryValue | null;
  orderId: FormDataEntryValue | null;
  status: string;
  paymentProofAttachment?: File;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (!process.env.NEXT_PUBLIC_API_BASE_URL || !process.env.NEXT_PUBLIC_API_KEY) {
      throw new Error('Missing required environment variables');
    }

    const ESPO_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const ESPO_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    // Create order record in EspoCRM
    const orderData: { entityType: string; data: OrderData } = {
      entityType: 'Order',
      data: {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
        country: formData.get('country'),
        paymentMethod: formData.get('paymentMethod'),
        orderId: formData.get('orderId'),
        status: 'Pending',
      },
    };

    // If payment proof is included, upload it
    const paymentProof = formData.get('paymentProof') as File | null;
    if (paymentProof) {
      // TODO: Implement file upload to EspoCRM
      // You'll need to use their file upload API endpoint
      orderData.data.paymentProofAttachment = paymentProof;
    }

    // Send to EspoCRM
    const response = await fetch(`${ESPO_API_URL}/Order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': ESPO_API_KEY,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order in EspoCRM');
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error processing shipping details:', error);
    return Response.json({ error: 'Failed to process shipping details' }, { status: 500 });
  }
}
