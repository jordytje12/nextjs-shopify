import Image from 'next/image';
import { urlFor } from '@/src/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
 
interface BannerProps {
    heading: string;
    subheading?: string;
    image: SanityImageSource;
}

export default function Banner({ heading, subheading, image }: BannerProps) {
    return (
        <div className="relative h-[600px] w-full">
            <Image
                src={urlFor(image).url()}
                alt="Banner"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {heading}
                </h1>
                {subheading && (
                    <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl">
                        {subheading}
                    </p>
                )}
            </div>
        </div>
    );
}