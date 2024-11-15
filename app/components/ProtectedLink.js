'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProtectedLink({ href, className, children }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (!session) {
      // Store the intended destination
      sessionStorage.setItem('redirectAfterLogin', href);
      router.push('/auth/signin');
    } else {
      router.push(href);
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
