import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiUser, FiChevronRight } from 'react-icons/fi';
import { UsersResponse, User } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';

export const SearchWidget = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const [showList, setShowList] = useState(false);
    const [abortController, setAbortController] = useState<AbortController | null>(null);
    const [cache, setCache] = useState<{ [query: string]: User[] }>({});

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (abortController) {
            abortController.abort();
        }

        if (debouncedSearchQuery) {
            if (cache[debouncedSearchQuery]) {
                setSearchedUsers(cache[debouncedSearchQuery]);
                setShowList(true);
            } else {
                const controller = new AbortController();
                setAbortController(controller);

                fetch(`https://dummyjson.com/users/search?limit=10&q=${debouncedSearchQuery}`, { signal: controller.signal })
                    .then((res) => res.json())
                    .then((response: UsersResponse) => {
                        setSearchedUsers(response.users);
                        setShowList(true);

                        setCache((prevCache) => ({
                            ...prevCache,
                            [debouncedSearchQuery]: response.users,
                        }));
                    })
                    .catch((error) => {
                        if (error.name !== 'AbortError') {
                            console.error('Error:', error);
                        }
                    });
            }
        } else {
            setSearchedUsers([]);
            setShowList(false);
        }
    }, [debouncedSearchQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const widgetRef = document.getElementById('search-widget');
        if (widgetRef && !widgetRef.contains(event.target as Node)) {
            setShowList(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col items-center py-8 bg-gray-900 text-white">
            <h1 className="text-2xl mb-4 font-bold">Users List</h1>
            <div className="relative w-96 p-2 bg-white rounded-lg shadow-md flex items-center" id="search-widget">
                <div className="mr-2">
                    <FiSearch size={18} className="text-gray-500" />
                </div>
                <input
                    className="w-full border border-gray-800 text-black"
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onClick={() => setShowList(true)}
                />
                {showList && searchedUsers.length > 0 && (
                    <div className="absolute z-50 top-full right-0 bg-white text-blue-950 w-96 py-2 shadow-md rounded-b-lg">
                        <div className="flex flex-col">
                            {searchedUsers.map((user) => (
                                <Link legacyBehavior key={user.id} href={`/users/${user.id}`}>
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
