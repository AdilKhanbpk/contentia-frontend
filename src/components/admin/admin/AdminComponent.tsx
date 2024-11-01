import dynamic from 'next/dynamic';

const Analytics = dynamic(() => import('./sub-admin/Analytics'), { ssr: false });

export default function AdminComponent() {
  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:pl-72 lg:mt-28">
      <Analytics />
    </div>
  );
}
