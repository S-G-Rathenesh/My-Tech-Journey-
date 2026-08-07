'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminDashboard } from '@/components/ui/AdminDashboard';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const router = useRouter();

  return (
    <AdminDashboard onBackToWorld={() => router.push('/')} />
  );
}
