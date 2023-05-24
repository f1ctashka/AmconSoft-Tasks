import Link from "next/link";

export const UsersList = ({ users }) => {

    return (
        <div className='flex flex-row flex-wrap'>
            {users ? (
                users.map((user) => (
                    <div
                        key={user.id}
                        className="border rounded-lg p-3 flex flex-col items-center w-40 h-52 m-2 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <Link legacyBehavior href={`/users/${user.id}`}>
                            <a className="flex flex-col items-center">
                                <img
                                    className="h-24 w-24 rounded-full mb-3 object-center"
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}`}
                                />
                                <h2 className="text-lg font-bold text-center">
                                    {user.firstName} {user.lastName}
                                </h2>
                            </a>
                        </Link>
                    </div>
                ))
            ) : (
                <div>Loading users</div>
            )}
        </div>
    );
};