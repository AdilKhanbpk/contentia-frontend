"use client";
import React from 'react';

const PageViews = () => {
  const pageData = [
    { title: "Admin Home", url: "/demo/admin/index.html", views: 7755, percentage: "31.74%" },
    { title: "Form Elements", url: "/demo/admin/forms.html", views: 5215, percentage: "28.53%" },
    { title: "Utilities", url: "/demo/admin/util.html", views: 4848, percentage: "25.35%" },
    { title: "Form Validation", url: "/demo/admin/validation.html", views: 3275, percentage: "23.17%" },
    { title: "Modals", url: "/demo/admin/modals.html", views: 3003, percentage: "22.21%" },
  ];

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Page Views by Page Title</h2>
      <div className="mt-4 space-y-4">
        {pageData.map((page, index) => (
          <div key={index} className="flex justify-between items-center py-4 border-b border-gray-200">
            <div>
              <p className="text-sm font-medium">{page.title}</p>
              <p className="text-xs text-gray-500">{page.url}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-600 text-lg font-semibold">{page.views}</p>
              <p className="text-xs text-gray-500">{page.percentage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageViews;
