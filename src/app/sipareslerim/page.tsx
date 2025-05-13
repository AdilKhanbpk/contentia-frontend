'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SipareslerimRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/siparislerim');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Yönlendiriliyor...</p>
    </div>
  );
}
