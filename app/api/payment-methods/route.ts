export async function GET() {
  try {
    // Return static QR code URLs
    const paymentMethods = {
      venmo: {
        qrCode: '/images/qr/venmo-qr.png',
      },
      cashapp: {
        qrCode: '/images/qr/cashapp-qr.png',
      },
    };

    return Response.json(paymentMethods);
  } catch (error) {
    console.error('Error with payment methods:', error);
    return Response.json(
      {
        error: 'Failed to get payment methods',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
