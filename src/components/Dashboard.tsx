"use client";

import Sidebar from "@/components/Sidebar";
import ClaimsProcess from '@/components/knowledge-guide/ClaimsProcess';
import ClaimsFlow from '@/components/knowledge-guide/ClaimsFlow';
import FAQ from '@/components/knowledge-guide/FAQ';
import PhotoUploadGuidelines from '@/components/knowledge-guide/PhotoUploadGuidelines';
import ClaimsForm from '@/components/claims/ClaimsForm';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DashboardProps {
  setComponent: (component: string) => void;
}
export const Dashboard: React.FC<DashboardProps> = ({ setComponent }) => {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState<string | null>('welcome');

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleSidebarItemClick = (componentName: string) => {
    setActiveComponent(componentName);
  };


  return (
    <div className='flex h-screen bg-secondary overflow-hidden'>
      <div className="w-64 shrink-0">
        <Sidebar onItemClick={handleSidebarItemClick} />
      </div>
      <div className='flex-1 p-8 relative overflow-y-auto'>
        <Button variant='destructive' onClick={handleLogout} className='absolute top-4 right-4'>
          Logout
        </Button>
        {activeComponent === 'welcome' && (
          <div className='mt-8'>
            <h1 className='text-2xl font-bold'>Welcome to the Dashboard!</h1>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        )}
        {activeComponent === 'claims-process' && <ClaimsProcess />}
        {activeComponent === 'claims-flow' && <ClaimsFlow />}
        {activeComponent === 'faq' && <FAQ />}
        {activeComponent === 'photo-upload' && <PhotoUploadGuidelines />}
        {activeComponent === 'claims-form' && <ClaimsForm setComponent={setActiveComponent}/>}
      </div>
    </div>
  );
};

