import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/types';

export const UserDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (id) {
            const userId = parseInt(id as string);
            if (userId > 100) {
                setError('Sorry, this user does not exist :(');
            } else {
                fetch(`https://dummyjson.com/user/${id}`)
                    .then((res) => res.json())
                    .then((response) => {
                        setUser(response);
                    });
            }
        }
    }, [id]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            {error ? (
                <div className="max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center">{error}</h2>
                    <div className="flex justify-center">
                        <Link legacyBehavior href="/users">
                            <a className="bg-gray-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-950 transition-colors duration-300 ease-in-out">
                                Back to the Users List
                            </a>
                        </Link>
                    </div>
                </div>
            ) : (
                user ? (
                    <div className="max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col gap-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                        <div className="flex justify-center">
                            <img className="h-40 w-40 rounded-full object-center" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-center">{user.firstName} {user.lastName}</h2>
                            <p className="mt-2 text-center">ID: {user.id}</p>
                            <hr className="my-4" />
                            <p><span className="font-semibold">Address:</span> {user.address.address}</p>
                            <p><span className="font-semibold">City:</span> {user.address.city}</p>
                            <p><span className="font-semibold">Postal Code:</span> {user.address.postalCode}</p>
                            <p><span className="font-semibold">State:</span> {user.address.state}</p>
                        </div>
                        <div className="flex justify-center">
                            <Link legacyBehavior href="/users">
                                <a className="bg-gray-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-950 transition-colors duration-300 ease-in-out">
                                    Back to the Users List
                                </a>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )
            )}
        </div>
    );
};