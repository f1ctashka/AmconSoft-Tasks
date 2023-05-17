import SearchWidget from "@/components/SearchWidget";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Pagination from './Pagination';
import { UsersResponseType, User } from '@/types';

const PAGE_SIZE = 10;
const USERS_PER_ROW = 5;

export const UsersList = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const queryPage = Number(router.query.page);
        if (queryPage && queryPage >= 1 && queryPage <= totalPages) {
            setCurrentPage(queryPage);
        } else {
            setCurrentPage(1);
        }
    }, [router.query.page, totalPages]);

    useEffect(() => {
        fetch(`https://dummyjson.com/users?limit=${PAGE_SIZE}&skip=${(currentPage - 1) * PAGE_SIZE}`)
            .then((res) => res.json())
            .then((response: UsersResponseType) => {
                setUsers(response.users);
                setTotalPages(Math.ceil(response.total / PAGE_SIZE));
            });
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        router.push(`/users?page=${page}`);
    };

    const renderUserCards = () => {
        const rows = [];

        for (let i = 0; i < users.length; i += USERS_PER_ROW) {
            const rowUsers = users.slice(i, i + USERS_PER_ROW);

            const userCards = rowUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-3 flex flex-col items-center w-40 h-52 m-2 transition duration-300 ease-in-out transform hover:scale-105">
                    <Link legacyBehavior href={`/users/${user.id}`}>
                        <a className="flex flex-col items-center">
                            <img className="h-24 w-24 rounded-full mb-3 object-center" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                            <h2 className="text-lg font-bold text-center">{user.firstName} {user.lastName}</h2>
                        </a>
                    </Link>
                </div>
            ));

            rows.push(
                <div key={i} className="flex flex-wrap justify-center pt-3">
                    {userCards}
                </div>
            );
        }
        return rows;
    };

    return (
        <div>
            <SearchWidget />
            {users.length > 0 ? (
                renderUserCards()
            ) : (
                <div>Loading users</div>
            )}

            {totalPages > 1 && <Pagination currentPage={currentPage} pageCount={totalPages} onPageChange={handlePageChange} />}
        </div>
    );
};