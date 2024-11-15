'use client';

import dynamic from 'next/dynamic';
import Loading from './loading';

const AddCarClient = dynamic(() => import('./AddCarClient'), {
  ssr: false,
  loading: () => <Loading />
});

export default function ClientPage() {
  return <AddCarClient />;
}
