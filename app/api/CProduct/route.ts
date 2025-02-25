import { NextResponse } from 'next/server';
import { headers as getHeaders } from 'next/headers';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_KEY || !BASE_URL) {
  throw new Error('API credentials not found in environment variables');
}

export async function GET(request: Request) {
  try {
    const headers = getHeaders();
    const clientIp = headers.get('x-forwarded-for') || 'unknown';
    console.log('Client IP:', clientIp);

    const { searchParams } = new URL(request.url);
    const where = searchParams.get('where');

    // Build the URL with proper query parameters
    let url = `${BASE_URL}/CProduct`;
    if (where) {
      url += `?where=${where}`;
    } else {
      // Default parameters for listing products
      url += '?maxSize=100&orderBy=name&order=asc';
    }

    console.log('API Key being used:', API_KEY);
    console.log('Fetching from URL:', url);

    // Test the API connection first
    try {
      const testResponse = await fetch(`${BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY as string,
        },
      });
      console.log('Health check status:', testResponse.status);
    } catch (healthError) {
      console.error('Health check failed:', healthError);
    }

    const requestHeaders: HeadersInit = {
      Authorization: `Bearer ${API_KEY as string}`,
      'X-Api-Key': API_KEY as string,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: requestHeaders,
      next: { revalidate: 0 },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Details:');
      console.error('Status:', response.status);
      console.error('Status Text:', response.statusText);
      console.error('Response Headers:', Object.fromEntries(response.headers.entries()));
      console.error('Error Text:', errorText);
      console.error('Request Headers:', requestHeaders);

      throw new Error(`API responded with status: ${response.status}. Details: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response Data:', data);

    if (!data.list) {
      console.error('No list property in response:', data);
      throw new Error('Invalid response format from API');
    }

    // Transform the data to match our expected format
    const transformedData = {
      total: data.total,
      list: data.list.map((product: any) => {
        // Generate a clean slug from the name if not provided
        const productSlug = product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        return {
          id: product.id,
          name: product.name,
          disease: product.disease || '',
          price: parseFloat(product.price) || 0,
          rating: parseFloat(product.rating) || 0,
          image: product.image || '',
          shipsTo: product.shipsTo || 'Worldwide',
          description: product.description || '',
          longDescription: product.longDescription || '',
          safetyInfo: product.safetyInfo || '',
          sideEffects: product.sideEffects || '',
          sku: product.sku || '',
          dosage: product.dosage || '',
          slug: productSlug,
          bestseller: Boolean(product.bestseller),
        };
      }),
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
