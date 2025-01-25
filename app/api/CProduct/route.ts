import { NextResponse } from "next/server";

const API_KEY = "b3e7d519ae50a5b9433c679303a6437c";
const BASE_URL = "https://shopwe.espocloud.eu/api/v1";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const where = searchParams.get("where");

    // Build the URL with proper query parameters
    let url = `${BASE_URL}/CProduct`;
    if (where) {
      url += `?where=${where}`;
    } else {
      // Default parameters for listing products
      url += "?maxSize=100&orderBy=name&order=asc";
    }

    console.log("Fetching from URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { revalidate: 0 }, // Disable cache
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    if (!data.list) {
      console.error("No list property in response:", data);
      throw new Error("Invalid response format from API");
    }

    // Transform the data to match our expected format
    const transformedData = {
      total: data.total,
      list: data.list.map((product: any) => ({
        id: product.id,
        name: product.name,
        disease: product.disease || "",
        price: parseFloat(product.price) || 0,
        rating: parseFloat(product.rating) || 0,
        image: product.image || "",
        shipsTo: product.shipsTo || "Worldwide",
        description: product.description || "",
        longDescription: product.longDescription || "",
        safetyInfo: product.safetyInfo || "",
        sideEffects: product.sideEffects || "",
        sku: product.sku || "",
      })),
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
