import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Inventory & Store Management | Sai Gold Covering',
  description: 'Private administration portal for Sai Gold Covering store manager.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
