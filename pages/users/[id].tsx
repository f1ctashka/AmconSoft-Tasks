import { UserDetails } from '@/components/UserDetails';
import { GetServerSideProps } from 'next';
import { User } from '@/types';
import { FC } from 'react';

export type UserPageProps = {
    user: User;
    error?: Error;
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (ctx) => {
    try {
        const id = Number(ctx.query.id);

        if (!id) {
            throw new Error('Invalid user ID');
        }

        const resFromApi = await fetch(`https://dummyjson.com/users/${id}`);
        const user = await resFromApi.json() as User;

        return {
            props: {
                user: user,
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

const UserPage: FC<UserPageProps> = ({ user, error }) => {
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <UserDetails user={user} />
        </div>
    );
};

export default UserPage;