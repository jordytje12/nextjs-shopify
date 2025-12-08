'use client'

import { ShoppingCart } from 'lucide-react'

interface AddToCartProps {
  variantId: string
  available: boolean
}

export default function AddToCart({ variantId, available }: AddToCartProps) {
  
  const handleAddToCart = () => {
    // HIER komt later je logica om iets in je winkelmandje te stoppen.
    // Voor nu loggen we het ID in de console.
    console.log('Toevoegen aan cart:', variantId);
    alert('Product toegevoegd! (Check console voor ID)');
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={!available}
      className={`
        w-full py-4 px-8 rounded-full flex items-center justify-center gap-3 font-bold text-lg transition-all
        ${available 
          ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl' 
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
      `}
    >
      <ShoppingCart size={20} />
      {available ? 'In Winkelwagen' : 'Uitverkocht'}
    </button>
  )
}