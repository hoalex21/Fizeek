import Image from 'next/image';
import Link from 'next/link';
import NavBar from './ui/navbar';

export default function Home() {
  return (
    <>
      <div style={{
        zIndex: -1,
        position: 'absolute',
        width: "100vw",
        height: "calc(100vh - 56px)",
      }}>
        <Image
          src="/deadlift.jpg" 
          alt="A man deadlifting"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className='flex h-[calc(100vh-56px)] text-center'>
        <div className='m-auto text-5xl text-white'>
          <p>Achieve your physique goals with Fizeek.</p>
          <br />
          <p><Link href="/signup" className='text-blue-500'>Sign up</Link> for an account today.</p>
        </div>
      </div>
    </>
  );
}
