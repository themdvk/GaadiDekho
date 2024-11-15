'use client';

import { useEffect, useState } from 'react';
import AddCarClient from './AddCarClient';
import LoadingUI from './loading-ui';

export default function ClientWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingUI />;
  }

  return <AddCarClient />;
}
