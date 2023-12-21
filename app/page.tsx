"use client";

import Image from 'next/image';
import Link from 'next/link';
import NavBar from './ui/navbar';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <NavBar />

      <div className='-z-10 absolute w-screen h-[calc(100vh-56px)] opacity-75'>
        <Image
          src="/back.jpg" 
          alt="A bodybuilder performing a back pose."
          fill={true}
          style={{objectFit: "cover"}}
        />
      </div>

      <main className='text-white'>
        <div className='h-[calc(100vh-56px)] grid grid-cols-2'>
          <div className='flex items-center lg:col-span-1 col-span-2 gap-1'>
            <div className='px-10'>
              <p className='text-6xl'>Achieve your best physique with Fizeek</p> <br></br>
              <p>Solutions to help you reach your health and fitness goals</p> <br></br>
              {
                status === "unauthenticated" ? 
                <Link className="bg-black p-1 border-2 border-white text-white px-4 py-2" href="/auth/signup">Sign Up</Link> : 
                <div hidden></div>
              }
            </div>
          </div>
        </div>

        <div className='h-[50vh]'>
          <div className='h-full grid grid-cols-2'>
            <div className='lg:col-span-1 lg:block hidden'></div>
            <div className='flex items-center lg:col-span-1 col-span-2'>
              <div className='px-20'>
                <p className='text-5xl'>Recommendations based on your needs</p> <br></br>
                <Link className="bg-black p-1 border-2 border-white text-white px-4 py-2 mr-2" href="/recommendation/exercise">Exercise</Link>
                <Link className="bg-black p-1 border-2 border-white text-white px-4 py-2 mx-2" href="/recommendation/food">Food</Link>
              </div>
            </div>
          </div>
        </div>

        <div className='h-[50vh]'>
          <div className='h-full grid grid-cols-2'>
            <div className='flex items-center lg:col-span-1 col-span-2 gap-1'>
              <div className='px-20'>
                <p className='text-5xl'>Calculators for measuring your biometrics</p> <br></br>
                <Link className="bg-black p-1 border-2 border-white text-white px-4 py-2 mr-2" href="/calculator/bmi">BMI</Link>
                <Link className="bg-black p-1 border-2 border-white text-white px-4 py-2 mx-2" href="/calculator/bmr">BMR</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
