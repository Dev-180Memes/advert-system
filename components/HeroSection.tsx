/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <header className='block'>
      <div className="px-14">
        <div className="w-full mt-10">
          <div className="gap-10 justify-between items-center w-full pb-12 flex">
            <div className="flex-col flex-nowrap justify-between items-start w-full flex gap-3">
              <div className="flex-col flex-nowrap items-start w-full flex ">
                <img 
                  src={"/icons.png"}
                  alt="icons"
                  className='mb-6 ml-0 max-w-full inline-block border-0'
                />
                <div className="gap-5 flex-col flex-wrap flex-1 justify-between items-start mb-6 flex">
                  <h1 className="my-2.5 text-5xl block font-black text-[#2d2323]">
                    {/* Content for an email advert platform */}
                    Revolutionize Your Adverising. Organize Your Campaigns.
                  </h1>
                  <p className="mb-2.5 text-[22px] mt-0 text-[#2d2323]">
                    {/* Content for an email advert platform */}
                    We help you manage your email campaigns, organize your adverising and keep track of your marketing efforts.
                    <span className="inline-block">
                      {/* More content */}
                      No more spreadsheets, no more headaches. Just easy, organized, and effective email marketing.
                    </span>
                  </p>
                </div>
                <div className="justify-center items-center mt-0 mb-7 flex ">
                  <Link href={"/platform"} className='bg-blue-600 text-white rounded-full flex-grow-0 flex-shrink flex-basis py-4 px-6 text-lg font-normal transition-all flex max-w-full hover:bg-blue-700 hover:-rotate-3'>Get Started</Link>
                </div>
              </div>
            </div>
            <img 
              src={"/hero.webp"}
              alt="hero"
              className='max-h-[700px] border-4 border-[#d9d9d9] rounded-xl flex-grow-0 flex-shrink max-w-none -mr-[132px] inline-block basis-auto'
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeroSection
