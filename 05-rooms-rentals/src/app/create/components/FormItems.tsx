"use client"
import { useFormStatus } from "react-dom"
import Input from "./Input"

interface FormItemsProps {
  errors?: Record<string, string>
}

export default function FormItems({ errors = {} }: FormItemsProps) {
  const { pending } = useFormStatus()

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label htmlFor="title" className="block">
          Title
        </label>
        <Input
          type="text"
          name="title"
          className={`w-full ${errors.title ? "border-red-500" : ""}`}
          placeholder="Enter a title"
          pending={pending}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Repeat similar structure for other fields */}
      <div>
        <label htmlFor="description" className="block">
          Description
        </label>
        <Input
          type="text"
          name="description"
          className={`w-full ${errors.description ? "border-red-500" : ""}`}
          placeholder="Enter a description"
          pending={pending}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="heroUrl" className="block">
          Hero Url
        </label>
        <Input
          type="text"
          name="heroUrl"
          className={`w-full ${errors.heroUrl ? "border-red-500" : ""}`}
          placeholder="Enter a hero image url"
          pending={pending}
        />
        {errors.heroUrl && <p className="text-red-500 text-sm mt-1">{errors.heroUrl}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block">
          Price
        </label>
        <Input
          type="number"
          name="price"
          className={`w-full ${errors.price ? "border-red-500" : ""}`}
          placeholder="Price per Night"
          pending={pending}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>
    </div>
  )
}