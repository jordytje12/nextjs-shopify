import Image from 'next/image'
import Link from 'next/link'

// Definieer de props voor één kaart
interface CollectionCardProps {
  subtitle: string
  title: string
  subtext: string
  bgImageUrl: string
  button: {
    text: string
    url: string
  }
}

export default function CollectionCard({ subtitle, title, subtext, bgImageUrl, button }: CollectionCardProps) {
  return (
    <div className="relative w-full h-[700px] overflow-hidden group">
      
      {/* 1. Achtergrond Afbeelding */}
      {bgImageUrl && (
        <Image
          src={bgImageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* 2. Overlay (Zwart filter zodat tekst leesbaar is) */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

      {/* 3. Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-white">
        <span className="text-sm font-semibold uppercase tracking-wider mb-2 text-gray-200">
          {subtitle}
        </span>
        <h3 className="text-3xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-gray-200 mb-6 max-w-sm">
          {subtext}
        </p>

        {/* Button */}
        <Link 
          href={button?.url || '#'} 
          className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
        >
          {button?.text || 'Bekijk meer'}
        </Link>
      </div>
    </div>
  )
}