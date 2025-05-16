"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Loading component
const LoadingComponent = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-pulse text-center">
      <div className="text-lg font-semibold">Loading About Section...</div>
      <div className="text-sm text-gray-500 mt-2">Please wait while we load the content</div>
    </div>
  </div>
);

// Use dynamic import with no SSR to avoid server-side rendering errors
const AboutsComponent = dynamic(
  () => import("@/components/admin/content-management/About/Abouts"),
  {
    ssr: false,
    loading: () => <LoadingComponent />
  }
);

export default function About() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <AboutsComponent />
    </Suspense>
  );
}
