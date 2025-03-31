"use client";
import { useFormStatus } from "react-dom";
import Input from "./Input";
export default function FormItems() {
    const { pending } = useFormStatus();

    return (
        <div className="flex flex-col space-y-4">
            <div>
                <label htmlFor="title" className="block">Title</label>
                <Input type="text" name="title" className="w-full" placeholder="Enter a title" pending={pending}></Input>
            </div>
        
            <div>
                <label htmlFor="description" className="block">Description</label>
                <Input type="text" name="description" className="w-full" placeholder="Enter a description" pending={pending}></Input>
            </div>

            <div>
                <label htmlFor="heroUrl" className="block">Hero Url</label>
                <Input type="text" name="heroUrl" className="w-full" placeholder="Enter a hero image url" pending={pending}></Input>
            </div>
            
            <div>
                <label htmlFor="price" className="block">Price</label>
                <Input type="number" name="price" className="w-full" placeholder="Price per Night" pending={pending}></Input>
            </div>

        
        </div>
    );
}