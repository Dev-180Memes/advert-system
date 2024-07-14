import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="overflow-hidden">
        <HeroSection />
        {/* Show main featurs of application which are the ability to manage users, send campaigns and see campaign reports */}
        <div className="bg-[#f9f9f9] py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold text-center text-[#2d2323]">Main Features</h2>
              <p className="text-center text-[#2d2323] mt-4">Manage users, send campaigns and see campaign reports</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-[#2d2323]">Manage Users</h3>
                <p className="text-[#2d2323] mt-4">Manage users and their roles</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-[#2d2323]">Send Campaigns</h3>
                <p className="text-[#2d2323] mt-4">Send campaigns to users</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-[#2d2323]">Campaign Reports</h3>
                <p className="text-[#2d2323] mt-4">View campaign reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
