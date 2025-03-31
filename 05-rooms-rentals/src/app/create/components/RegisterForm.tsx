"use client"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type { ApiResponse } from "../services/ApiService"
import FormItems from "./FormItems";


type Props<T = unknown> = {
  action: (prevState: ApiResponse<T> | undefined, formData: FormData) => Promise<ApiResponse<T>>
}

function SubmitButton() {
  const { pending } = useFormStatus()
  
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
  )
}

export default function RegisterForm<T = unknown>({ action }: Props<T>) {
  const [state, formAction] = useActionState(action, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state?.status === 201) {
      router.push("/rooms")
    }
  }, [state, router])

  const errorMessages = state?.status && state.status >= 400 ? {
    title: state.statusText.includes("title") ? state.statusText : undefined,
    description: state.statusText.includes("description") ? state.statusText : undefined,
    heroUrl: state.statusText.includes("URL") || state.statusText.includes("Url") ? state.statusText : undefined,
    price: state.statusText.includes("price") ? state.statusText : undefined,
  } : {}

  return (
    <form action={formAction} className="max-w-md">
      <FormItems errors={errorMessages as Record<string, string>} />
      {state?.status && state.status >= 400 && (
        <p className="text-red-500 mt-2">{state.statusText}</p>
      )}
      <SubmitButton />
    </form>
  )
}