import Link from 'next/link'
import Image from 'next/image'

interface BannerProps {
  data: {
    heading?: string
    subheading?: string
    imageUrl?: string
    button?: {
      text: string
      url: string
    }
  }
}

export default function OnPageBanner({ data }: BannerProps) {
  if (!data) return null

  return (
    <div className="w-full my-6">
      
      {/* De banner zelf: max 1600px, gecentreerd, relatief voor de afbeelding */}
      <div className="relative w-full h-[550px] md:h-[800px] overflow-hidden group">
        
        {/* 1. Achtergrond Afbeelding */}
        {data.imageUrl ? (
          <Image 
            src={data.imageUrl} 
            alt={data.heading || 'Banner'} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}

        {/* 2. Overlay Gradient (zodat tekst leesbaar is linksonder) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* 3. Content: Linksonder uitgelijnd */}
        <div className="absolute max-w-[1600px] mx-auto inset-0 p-8 flex flex-col justify-end items-start z-10">
          
          {data.heading && (
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl drop-shadow-lg">
              {data.heading}
            </h2>
          )}
          
          {data.subheading && (
            <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md">
              {data.subheading}
            </p>
          )}

          {data.button?.text && data.button?.url && (
            <Link 
              href={data.button.url}
              className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              {data.button.text}
            </Link>
          )}
        </div>
        
      </div>
    </div>
  )
}