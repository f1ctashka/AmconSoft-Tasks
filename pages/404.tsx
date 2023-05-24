import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-4">
                Oops! The page you are looking for does not exist :(
            </p>
            <Link legacyBehavior href="/">
                <a className="text-blue-500 hover:text-blue-700">Go back to the Home Page</a>
            </Link>
        </div>
    );
};

export default Custom404;