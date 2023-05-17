import { useRouter } from 'next/router';
import { UserDetails } from '@/components/UserDetails';

export default function UserPage() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            {<UserDetails />}
        </div>
    );
}
