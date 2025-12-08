import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'

interface ProductCardProps {
  title: string
  handle: string
  price: string 
  imageUrl: string
}

export default function ProductCard({ title, handle, price, imageUrl }: ProductCardProps) {
  return (
    <Link href={`/products/${handle}`} className="group block h-full">
      <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100 mb-4">
        {/* Afbeelding met Zoom effect op hover */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Geen beeld
          </div>
        )}

        {/* 'Quick Add' knop die verschijnt op hover (Optioneel) */}
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="bg-white p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 group-hover:underline decoration-1 underline-offset-4">
          {title}
        </h3>
        <p className="text-gray-500 font-medium">
          {price} EUR
        </p>
      </div>
    </Link>
  )
}