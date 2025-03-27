import { NextResponse } from 'next/server';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CreditCardOrderData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  insurance: number;
  total: number;
}

export async function POST(request: Request) {
  try {
    const data: CreditCardOrderData = await request.json();

    // Generate a unique order ID
    const orderId = `CC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Format items for display
    const itemsDescription = data.items
      .map(
        item =>
          `${item.name} (Quantity: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    // Send notification email to admin
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        from_name: `${data.firstName} ${data.lastName}`,
        subject: `New Credit Card Order Request - ${orderId}`,
        message: `
          New Credit Card Order Request
          ---------------------------
          Order ID: ${orderId}
          Customer: ${data.firstName} ${data.lastName}
          Email: ${data.email}
          Phone: ${data.phone}
          
          Shipping Address:
          ----------------
          ${data.address}
          ${data.city}, ${data.state} ${data.zipCode}
          ${data.country}
          
          Order Details:
          -------------
          ${itemsDescription}
          
          Subtotal: $${data.subtotal.toFixed(2)}
          Shipping: $${data.shipping.toFixed(2)}
          Insurance: $${data.insurance.toFixed(2)}
          Total: $${data.total.toFixed(2)}
          
          Action Required:
          --------------
          1. Create a PayPal payment link for $${data.total.toFixed(2)}
          2. Send the payment link to the customer's email (${data.email})
        `,
        email_to: 'shopwe820@gmail.com',
      }),
    });

    // Send confirmation email to customer
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        from_name: 'CareCaddy Store',
        subject: `Your Order Request - ${orderId}`,
        message: `
          Dear ${data.firstName} ${data.lastName},

          Thank you for your order! We have received your order request and it is being processed.
          
          Order Details:
          -------------
          Order ID: ${orderId}
          
          Items Ordered:
          ${data.items.map(item => `- ${item.name} (Quantity: ${item.quantity})`).join('\n')}
          
          Order Summary:
          -------------
          Subtotal: $${data.subtotal.toFixed(2)}
          Shipping: $${data.shipping.toFixed(2)}
          Insurance: $${data.insurance.toFixed(2)}
          Total: $${data.total.toFixed(2)}
          
          Shipping Address:
          ----------------
          ${data.address}
          ${data.city}, ${data.state} ${data.zipCode}
          ${data.country}
          
          What happens next:
          ----------------
          1. You will receive another email with a payment link within 24 hours.
          2. Once you complete the payment, your order will be processed and shipped.
          
          If you have any questions, please contact our customer service.
          
          Thank you for shopping with CareCaddy Store!
        `,
        email_to: data.email,
      }),
    });

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Error processing credit card order:', error);
    return NextResponse.json(
      {
        error: 'Failed to process order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
