import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { UsersList } from '@/components/UsersList';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
      <div>
        <h1>Welcome to the Home Page!</h1>
        <p>Here, you can find various features and functionalities.</p>
        <Link legacyBehavior href="/users">
          <a>Go to Users</a>
        </Link>
      </div>
  );
}
