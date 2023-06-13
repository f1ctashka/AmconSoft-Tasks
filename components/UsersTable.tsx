import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { UsersResponse, User } from '@/types';

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<UsersResponse>('https://dummyjson.com/users?limit=100');
            setUsers(response.data.users);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const newSortBy = urlParams.get('sortBy');
        const newSortOrder = urlParams.get('sortOrder');

        if (newSortBy && newSortOrder) {
            setSortBy(newSortBy);
            setSortOrder(newSortOrder as 'asc' | 'desc');
        }
    }, []);

    const handleSort = (column: string) => {
        let newSortOrder: 'asc' | 'desc' = 'desc';
        if (column === sortBy) {
            newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        }
        setSortBy(column);
        setSortOrder(newSortOrder);
        const queryParams = new URLSearchParams({
            sortBy: column,
            sortOrder: newSortOrder,
        });
        window.history.pushState({}, '', `?${queryParams.toString()}`);
    };

    const sortComparators = {
        name: (a: User, b: User) => a.firstName.localeCompare(b.firstName),
        age: (a: User, b: User) => a.age - b.age,
        weight: (a: User, b: User) => a.weight - b.weight,
        height: (a: User, b: User) => a.height - b.height,
    };

    const sortedUsers = [...users].sort((a, b) => {
        const comparator = sortComparators[sortBy];
        if (comparator) {
            return sortOrder === 'desc' ? comparator(b, a) : comparator(a, b);
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center mt-8">
            <table className="min-w-max bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition duration-300 ease-in-out">
                <thead>
                <tr>
                    <th onClick={() => handleSort('name')} className="cursor-pointer w-1/6">
                        Name
                    </th>
                    <th onClick={() => handleSort('age')} className="cursor-pointer w-1/6">
                        Age
                    </th>
                    <th onClick={() => handleSort('weight')} className="cursor-pointer w-1/6">
                        Weight
                    </th>
                    <th onClick={() => handleSort('height')} className="cursor-pointer w-1/6">
                        Height
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map((user) => (
                    <tr key={user.id}>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.age}</td>
                        <td>{user.weight}</td>
                        <td>{user.height}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link legacyBehavior href="/">
                <a className="bg-gray-600 mb-8 text-white px-6 py-3 rounded-md mt-8 hover:bg-gray-950 transition-colors duration-300 ease-in-out text-xl shadow-xl">
                    Go Back
                </a>
            </Link>
        </div>
    );
};

export default UsersTable;
