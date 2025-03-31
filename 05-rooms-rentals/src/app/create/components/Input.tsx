export default function Input({ 
    className, 
    type, 
    name, 
    placeholder, 
    pending, 
    error 
  }: { 
    className: string; 
    type: string; 
    name: string; 
    placeholder: string; 
    pending: boolean;
    error?: string;
  }) {
    return (
      <div>
        <input
          className={`${className} border ${error ? "border-red-500" : "border-gray-300"}`}
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={pending}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
  