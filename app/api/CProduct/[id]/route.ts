import { NextResponse } from "next/server";

const API_KEY = "b3e7d519ae50a5b9433c679303a6437c";
const BASE_URL = "https://shopwe.espocloud.eu/api/v1";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const url = `${BASE_URL}/CProduct/${params.id}`;
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

    if (!data || !data.id) {
      console.error("Invalid product data:", data);
      throw new Error("Invalid response format from API");
    }

    // Transform the data to match our expected format
    const transformedProduct = {
      id: data.id,
      name: data.name || "",
      disease: data.disease || "",
      price: parseFloat(data.price) || 0,
      rating: parseFloat(data.rating) || 0,
      image: data.image || "",
      shipsTo: data.shipsTo || "Worldwide",
      description: data.description || "",
      longDescription: data.longDescription || "",
      safetyInfo: data.safetyInfo || "",
      sideEffects: data.sideEffects || "",
      sku: data.sku || "",
      status: data.status || "Active",
      createdAt: data.createdAt || "",
      modifiedAt: data.modifiedAt || "",
    };

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
