import { Me } from '@/types';
import { API_URL } from '@/config';

const URL = API_URL + '/users/me';

export default async function Header() {
  try {
    const response = await fetch(URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const user = (await response.json()) as Me;

    return (
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold">Arrrbnb</div>

          <div className="flex items-center gap-3">
            <div className="text-sm">
              <span>{user.firstName} </span>
              <span>{user.lastName}</span>
            </div>
            {user.portraitUrl && (
              <img
                src={user.portraitUrl || "/placeholder.svg"}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    
    return (
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold">Arrrbnb</div>
          <div className="text-sm text-gray-500">Loading user...</div>
        </div>
      </header>
    );
  }
}