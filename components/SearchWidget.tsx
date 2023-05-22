import { useEffect, useState, useRef } from 'react';
import { FiSearch, FiUser, FiChevronRight } from 'react-icons/fi';
import { UsersResponse, User } from '@/types';
import Link from "next/link";

export const SearchWidget = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const [showList, setShowList] = useState(false);
    const widgetRef = useRef(null);

    useEffect(() => {
        if (searchQuery) {
            fetch(`https://dummyjson.com/users/search?limit=10&q=${searchQuery}`)
                .then((res) => res.json())
                .then((response: UsersResponse) => {
                    setSearchedUsers(response.users);
                    setShowList(true);
                });
        } else {
            setSearchedUsers([]);
            setShowList(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (widgetRef.current && !widgetRef.current.contains(event.target)) {
            setShowList(false);
        }
    };

    return (
        <div className="flex flex-col items-center py-8 bg-gray-900 text-white">
            <h1 className="text-2xl mb-4 font-bold">Users List</h1>
            <div className="relative w-96 p-2 bg-white rounded-lg shadow-md flex items-center" ref={widgetRef}>
                <div className="mr-2">
                    <FiSearch size={18} className="text-gray-500" />
                </div>
                <input
                    className="w-full border border-gray-800 text-black"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={() => setShowList(true)}
                />
                {showList && searchedUsers.length > 0 && (
                    <div className="absolute z-50 top-full right-0 bg-white text-blue-950 w-96 py-2 shadow-md rounded-b-lg">
                        <div className="flex flex-col">
                            {searchedUsers.map((user) => (
                                <Link legacyBehavior href={`/users/${user.id}`} key={user.id}>
                                    <a className="p-2 hover:bg-gray-200 flex items-center">
                                        <FiUser className="mr-2" size={16} />
                                        <span>{user.firstName} {user.lastName}</span>
                                        <FiChevronRight className="ml-auto" size={16} />
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};