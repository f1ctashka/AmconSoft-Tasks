import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User } from '@/types';

const UserDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (id) {
            fetch(`https://dummyjson.com/user/${id}`)
                .then((res) => res.json())
                .then((response) => {
                    setUser(response);
                });
        }
    }, [id]);

    return (
        <div>
            {user ? (
                <div>
                    <h1 className="text-pink-700 text-3xl">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p>ID: {user.id}</p>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default UserDetails;

