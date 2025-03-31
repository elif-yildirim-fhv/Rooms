"use client";
import { ApiResponse } from "../services/ApiService";
import FormItems from "./FormItems";
import { useActionState } from "react";
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  action: (state: ApiResponse | undefined, data: FormData) => Promise<ApiResponse>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {pending ? "Creating..." : "Create Cabin"}
    </button>
  );
}

export default function RegisterForm({ action }: Props) {
  const [state, formAction] = useActionState(action, undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData(event.target as HTMLFormElement);
    const newErrors: Record<string, string> = {};
  
    if (!formData.get("title")) newErrors.title = "Title is required";
    if (!formData.get("description")) newErrors.description = "Description is required";
    if (!formData.get("heroUrl")) newErrors.heroUrl = "Image URL is required";
    if (!formData.get("price")) newErrors.price = "Price is required";
    
    setErrors(newErrors); // Setzt Fehler für die Anzeige
  
    if (Object.keys(newErrors).length === 0) {
      await formAction(formData);
    }
  };
  
  

  useEffect(() => {
    if (state?.status === 201) {
      router.push("/rooms");
    }
  }, [state, router]);

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <FormItems errors={errors} />
      {state?.status && state.status >= 400 && (
        <p className="text-red-500 mt-2">{state.statusText}</p>
      )}
      <SubmitButton />
    </form>
  );
}
