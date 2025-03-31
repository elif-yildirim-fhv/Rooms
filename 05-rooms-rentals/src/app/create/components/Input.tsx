    export default function Input({ className, type, name, placeholder, pending}) {
    return (
        <input
            className= {className}
            type= {type}
            name= {name}
            placeholder= {placeholder}
            required
            disabled= {pending}
        />
    );
}