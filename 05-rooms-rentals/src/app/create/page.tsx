import RegisterForm from "./components/RegisterForm";
import ApiService, { ApiResponse } from "./services/ApiService";
import { Room } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Cabin - Arrrbnb",
};

async function onSubmit(state: ApiResponse | undefined, data: FormData) {
  "use server";
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const heroUrl = data.get("heroUrl") as string;
  const price = data.get("price") as string;
  
  // Client-side validation should prevent this, but just in case
  if (!title || !description || !heroUrl || !price) {
    return {
      status: 400,
      statusText: "All fields are required",
      data: undefined,
    } as ApiResponse;
  }

  const pricePerNight = { 
    amount: parseInt(price), 
    currency: "USD" 
  };

  const response = await ApiService.post('http://localhost:3001/rooms', {
    title,
    description,
    heroUrl,
    pricePerNight
  });
  
  if (response.status === 201) {
    revalidatePath('/rooms');
    redirect('/rooms');
  }

  return response as ApiResponse<Room>;
}

export default function CreateCabinPage() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Create New Cabin</h2>
      <RegisterForm action={onSubmit} />
    </div>
  );
}