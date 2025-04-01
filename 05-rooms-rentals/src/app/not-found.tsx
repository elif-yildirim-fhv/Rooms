export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-gray-600 mb-6">OOOPPPPPPSSSS!</p>
            <img 
                src="https://http.cat/404" 
                alt="Funny 404 Cat"
                className="mx-auto mb-6 w-1/2 h-auto"
            />
        </div>
    );
}