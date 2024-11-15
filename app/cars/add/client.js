'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddCarClient from './AddCarClient';

export default function ClientEntry() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    // Mount the client component
    const root = document.getElementById('add-car-root');
    if (root) {
      root.innerHTML = '';
      const addCarForm = document.createElement('div');
      root.appendChild(addCarForm);
    }
  }, []);

  return null;
}
