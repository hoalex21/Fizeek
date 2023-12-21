import Image from 'next/image';
import Link from 'next/link';
import NavBar from './ui/navbar';

export default function Home() {
  return (
    <>
      <NavBar />

      <div className='-z-10 absolute w-screen h-[calc(100vh-56px)]'>
        <Image
          src="/back.jpg" 
          alt="A bodybuilder performing a back pose."
          fill={true}
          style={{objectFit: "cover"}}
        />
      </div>

      <main>
        <div className='h-[calc(100vh-56px)] grid grid-cols-2'>
          <div className='text-white flex justify-center md:col-span-1 col-span-2 gap-1 items-center'>
            <div className='px-10'>
              <p className='text-6xl'>Achieve your best physique with Fizeek</p> <br></br>
              <p>Solutions to help you reach your health and fitness goals</p> <br></br>
              <Link className="bg-black p-1 border-2 border-white text-white px-4 py-2" href="/auth/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
