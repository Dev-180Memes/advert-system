import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <nav className="flex w-full z-[1000] flex-col items-center object-fill h-[72px] md:h-[93px] fixed md:sticky top-0 opacity-100 mt-2">
      <div className="w-[98%] ml-5 mr-5 fixed backdrop-blur-md h-[73px] md:h-[93px] bg-white p-0 rounded-[50px] max-w-[980px] overflow-visible z-[1000] md:w-[95%] md:px-[20px] md:py-[15px]">
        <Link href={"/"} className='max-w-72 float-left h-12.5 px-5 hidden md:flex items-center h-full'>
          <Image 
            src={"/logo.png"}
            width={110}
            height={24}
            alt="logo"
            className='mt-3 mr-3 max-w-[100%] inline-block align-middle border-0'
          />
        </Link>
        <div className="justify-center items-center hidden md:flex">
          <ul className="text-center flex-row flex-nowrap content-around justify-center self-center items-center mx-auto flex float-right relative">
            <li className='h-11 px-4 py-[10px] text-xl font-normal text-[#222] text-left mx-auto inline-block relative hover:bg-gray-200 hover:rounded-lg'>
              <Link href={"/"} className='text-[#222] text-xl font-normal text-left'>Home</Link>
            </li>
            <li className='h-11 px-4 py-[10px] text-xl font-normal text-[#222] text-left mx-auto inline-block relative hover:bg-gray-200 hover:rounded-lg'>
              <Link href={"/"} className='text-[#222] text-xl font-normal text-left'>About</Link>
            </li>
            <li className='h-11 px-4 py-[10px] text-xl font-normal text-[#222] text-left mx-auto inline-block relative hover:bg-gray-200 hover:rounded-lg'>
              <Link href={"/"} className='text-[#222] text-xl font-normal text-left'>Services</Link>
            </li>
          </ul>
          <div className="flex flex-row justify-end text-center items-center">
            <Link href={"/"} className='bg-white text-[#2d2323] border-1 border border-[#e3e1e1] rounded-full py-[15px] px-5 text-lg font-normal transition-all flex hover:bg-gray-200 hover:-rotate-3'>Log in</Link>
            <div className="w-2 h-2"></div>
            <Link href={"/"} className='bg-blue-600 text-white rounded-full flex-grow-0 flex-shrink pt-4 pb-[15px] px-6 text-lg font-normal transition-all flex max-w-full hover:bg-[#254cda] hover:-rotate-6'>Sign Up</Link>
          </div>
        </div>
        <div className="bg-white rounded-full justify-between items-center m-0 p-[10px] flex md:hidden relative mt-1">
          <FaBars className="block mr-0 px-[13px] text-center rounded-lg flex-none self-center w-[50px] h-[40px] ml-5px pt-[7px] pb-[5px] float-right text-2xl relative" onClick={() => setIsOpen(!isOpen)} />
          <Link href="/" className="px-1 flex-1 justify-center flex float-left h-6 max-w-full">
            <Image 
              src={"/logo.png"}
              width={110}
              height={24}
              alt="logo"
              className="flex-none self-center mt-0 mr-0 max-w-full inline-block border-0"
            />
          </Link>
          <Link href={"/"} className='mr-2.5 py-2.5 px-3.5 text-base flex bg-blue-600 text-white rounded-full'>Sign Up</Link>
        </div>
        {isOpen && (
          // Mobile Menu
          <div className="flex flex-col w-full bg-white rounded-lg p-5 absolute">
            <ul className="text-left flex-col flex-nowrap content-around flex relative">
              <li className='h-11 px-4 py-[10px] text-xl font-normal text-[#222] text-left inline-block relative hover:bg-gray-200 hover:rounded-lg'>
                <Link href={"/"} className='text-[#222] text-xl font-normal text-left'>Log in</Link>
              </li>
              <li className='h-11 px-4 py-[10px] text-xl font-normal text-[#222] text-left inline-block relative hover:bg-gray-200 hover:rounded-lg'>
                <Link href={"/"} className='text-[#222] text-xl font-normal text-left'>Home</Link>
              </li>
              <li className='h-11 px-4 py-[10px] text-xl font-normal text-[#222] text-left inline-block relative hover:bg-gray-200 hover:rounded-lg'>
                <Link href={"/"} className='text-[#222] text-xl font-normal text-left'>About</Link>
              </li>
              <li className='h-11 px-4 py-[10px] text-xl font-normal text-[#222] text-left inline-block relative hover:bg-gray-200 hover:rounded-lg'>
                <Link href={"/"} className='text-[#222] text-xl font-normal text-left'>Services</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
