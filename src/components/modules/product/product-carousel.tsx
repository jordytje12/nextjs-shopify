'use client' 

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/src/components/modules/product/product-card' 

interface Product {
  title: string
  handle: string
  price: string
  imageUrl: string
}

interface ProductCarouselProps {
  title?: string
  products: Product[]
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Functie om naar links/rechts te scrollen
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350 // Hoeveel pixels per klik
      const currentScroll = scrollContainerRef.current.scrollLeft
      
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (!products || products.length === 0) return null

  return (
    <section className="py-12 w-full">
      <div className="max-w-[1600px] mx-auto px-4">
        
        {/* Header met titel en navigatiepijltjes */}
        <div className="flex justify-between items-end mb-8">
          {title && <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>}
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors"
              aria-label="Vorige"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors"
              aria-label="Volgende"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* De Scroll Container */}
        {/* 'snap-x' zorgt dat hij mooi stopt bij een kaart */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Verberg scrollbar
        >
          {products.map((product, index) => (
            // min-w-[...] bepaalt de breedte van de kaart op mobiel vs desktop
            <div key={index} className="flex-none w-[280px] md:w-[320px] snap-center">
              <ProductCard 
                title={product.title}
                handle={product.handle}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}