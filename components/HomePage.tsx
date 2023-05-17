import Link from 'next/link';

export const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition duration-300 ease-in-out w-96">
                <h1 className="text-4xl font-bold">Hello!</h1>
                <p className="text-gray-600 text-lg">Welcome to the Home Page</p>
            </div>

            <Link legacyBehavior href="/users">
                <a className="bg-gray-600 text-white px-6 py-3 rounded-md mt-8 hover:bg-gray-950 transition-colors duration-300 ease-in-out text-xl shadow-xl">
                    Go to the Users List
                </a>
            </Link>

            <footer className="mt-8">
                <p className="text-gray-500 text-xs">
                    Created by Victoria Ilchenko (@f1ctashka)
                </p>
            </footer>
        </div>
    );
}