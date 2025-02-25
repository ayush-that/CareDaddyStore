import { NextResponse } from 'next/server';
import { headers as getHeaders } from 'next/headers';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const url = `${BASE_URL}/CProduct/${params.id}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY as string,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response Data:', data);

    if (!data || !data.id) {
      console.error('Invalid product data:', data);
      throw new Error('Invalid response format from API');
    }

    // Transform the data to match our expected format
    const transformedProduct = {
      id: data.id,
      name: data.name || '',
      disease: data.disease || '',
      price: parseFloat(data.price) || 0,
      rating: parseFloat(data.rating) || 0,
      image: data.image || '',
      shipsTo: data.shipsTo || 'Worldwide',
      description: data.description || '',
      longDescription: data.longDescription || '',
      safetyInfo: data.safetyInfo || '',
      sideEffects: data.sideEffects || '',
      sku: data.sku || '',
      status: data.status || 'Active',
      createdAt: data.createdAt || '',
      modifiedAt: data.modifiedAt || '',
    };

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch product',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
