import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import Link from 'next/link'
import snake from "@/../public/snake-1.png"; 
export default function NotFound() {
  return (
    <main>
        <MaxWidthWrapper className="flex flex-col items-center min-h-screen justify-center gap-2">
            <div className="h-40 w-40 flex justify-center">
            <Image src={snake} className='h-full w-auto' alt="snake"/>
            </div>
            <h1 className="text-lg">Page Not Found</h1>
            <Link href="/" className="text-blue-500 underline">Go to Home Page</Link>
        </MaxWidthWrapper>
    </main>
  )
}