import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User } from 'lucide-react' // Zorg dat je lucide-react hebt geïnstalleerd

// Type definities op basis van je GROQ query
interface HeaderProps {
  data: {
    logo?: {
      asset: {
        url: string
      }
      alt?: string
    }
    menuItems?: Array<{
      label: string
      slug: string
    }>
  }
}

export default function Header({ data }: HeaderProps) {
  const { logo, menuItems } = data || {}

  return (
    <header className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4">
        {/* We gebruiken een Grid met 3 kolommen voor perfecte centrering van het logo */}
        <div className="grid grid-cols-3 items-center">
          
          {/* LINKS: Menu Items */}
          <nav className="flex items-center gap-6 justify-start">
            {menuItems?.map((item, index) => (
              <Link 
                key={index} 
                href={`/${item.slug}`} 
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* MIDDEN: Logo */}
          <div className="flex justify-center">
            <Link href="/">
              {logo?.asset?.url ? (
                <Image
                  src={logo.asset.url}
                  alt={logo.alt || 'Logo'}
                  width={120} // Pas aan naar wens
                  height={40} // Pas aan naar wens
                  className="object-contain h-10 w-auto"
                  priority
                />
              ) : (
                <span className="text-xl font-bold">MijnMerk</span>
              )}
            </Link>
          </div>

          {/* RECHTS: Account & Cart Icons */}
          <div className="flex items-center gap-4 justify-end">
            <button aria-label="Account" className="text-gray-700 hover:text-black transition-colors">
              <User size={24} />
            </button>
            
            <button aria-label="Winkelwagen" className="relative text-gray-700 hover:text-black transition-colors">
              <ShoppingCart size={24} />
              {/* Optioneel: Badge voor aantal items */}
              {/* <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">2</span> */}
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}