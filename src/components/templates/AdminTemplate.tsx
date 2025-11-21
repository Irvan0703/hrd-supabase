// src/components/templates/AdminTemplate.tsx
import React from 'react';
import type { ReactNode } from 'react';

interface AdminTemplateProps {
  title: string;
  children: ReactNode;
}

const AdminTemplate: React.FC<AdminTemplateProps> = ({ title, children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Konten Utama */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminTemplate;