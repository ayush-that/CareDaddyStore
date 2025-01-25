const API_CONFIG = {
  baseUrl: "/api",
  apiKey: "b3e7d519ae50a5b9433c679303a6437c",
};

export interface Product {
  id: string;
  name: string;
  disease: string;
  price: number;
  rating: number;
  image: string;
  shipsTo: string | string[];
  description?: string;
  dosage?: string;
  sideEffects?: string;
  slug: string;
  deliveryPeriod?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const ProductService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      console.log("Fetching all products...");
      const response = await fetch(`${BASE_URL}/CProduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Products fetched:", data);

      if (!data.list) {
        console.error("Invalid response format:", data);
        return [];
      }

      return data.list;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  getProductImageUrl(imageId: string): string {
    if (!imageId) return "";
    if (imageId.startsWith("http")) return imageId;
    return `https://shopwe.espocloud.eu/api/v1/Attachment/file/${imageId}`;
  },

  async getProduct(id: string): Promise<Product | null> {
    try {
      console.log("Fetching product:", id);
      const response = await fetch(`${BASE_URL}/CProduct/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Product fetched:", data);

      if (!data.id) {
        console.error("Invalid product data:", data);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  },

  async getAllDiseases(): Promise<string[]> {
    try {
      const products = await this.getAllProducts();
      const diseases = [...new Set(products.map((product) => product.disease))]
        .filter((disease) => disease)
        .sort();
      return diseases;
    } catch (error) {
      console.error("Error getting diseases:", error);
      return [];
    }
  },

  async getProductsByDisease(disease: string): Promise<Product[]> {
    try {
      console.log("Fetching products for disease:", disease);
      const params = new URLSearchParams({
        where: JSON.stringify([
          {
            type: "equals",
            attribute: "disease",
            value: disease,
          },
        ]),
      });

      const response = await fetch(`${BASE_URL}/CProduct?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Products by disease fetched:", data);

      if (!data.list) {
        console.error("Invalid response format:", data);
        return [];
      }

      return data.list;
    } catch (error) {
      console.error("Error fetching products by disease:", error);
      return [];
    }
  },
};
