import { SearchWidget } from '@/components/SearchWidget';
import { UsersList } from '@/components/UsersList';
import Pagination from '@/components/Pagination';
import { FC } from 'react';
import { UsersResponse } from '@/types';
import { GetServerSideProps } from 'next';
import {getPageNumbers} from "@/utils/paginationUtils";

export type UsersPageProps = {
    apiResponse?: UsersResponse;
    currentPage?: number;
    error?: string;
};

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async (ctx) => {
    try {
        const resFromApi = await fetch(`https://dummyjson.com/users?limit=10&skip=${(Number(ctx.query.page ?? '1')-1)*10}`);
        const apiResponse = await resFromApi.json() as UsersResponse;

        return {
            props: {
                apiResponse,
                currentPage: Number(ctx.query.page ?? '1')
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
            },
        };
    }
};

const UsersPage: FC<UsersPageProps> = ({ apiResponse, error, currentPage }) => {
    const users = apiResponse?.users ?? [];

    return (
        <>
            <SearchWidget />
            <UsersList users={users} />
            <Pagination
                currentPage={currentPage}
                pageCount={10}
                pageNumbers={getPageNumbers(currentPage, 10)}
            />
        </>
    );
};

export default UsersPage;