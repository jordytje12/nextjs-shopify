import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

// Helper om het juiste icoon te kiezen
const getSocialIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case 'instagram': return <Instagram size={20} />;
    case 'facebook': return <Facebook size={20} />;
    case 'twitter': return <Twitter size={20} />;
    case 'linkedin': return <Linkedin size={20} />;
    case 'tiktok': return <span className="font-bold text-sm">TT</span>; // Lucide heeft (nog) geen TikTok standaard
    default: return null;
  }
}

interface FooterProps {
  data: {
    logoUrl?: string
    tagline?: string
    columns?: Array<{
      heading: string
      links: Array<{ label: string; url: string }>
    }>
    socials?: Array<{ platform: string; url: string }>
    copyright?: string
  }
}

export default function Footer({ data }: FooterProps) {
  if (!data) return null;

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 max-w-[1600px]">
        
        {/* BOVENKANT: Grid met Logo en Kolommen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* 1. Logo & Tagline (Neemt 2 kolommen breedte in op grote schermen) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              {data.logoUrl ? (
                <Image 
                    src={data.logoUrl} 
                    alt="Logo" 
                    width={120} 
                    height={40} 
                    className="h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-2xl font-bold">MijnMerk</span>
              )}
            </Link>
            {data.tagline && (
              <p className="text-gray-500 max-w-sm leading-relaxed">
                {data.tagline}
              </p>
            )}
          </div>

          {/* 2. Dynamische Kolommen (Shop, Info, etc.) */}
          {data.columns?.map((col, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-900 mb-6">{col.heading}</h3>
              <ul className="space-y-4">
                {col.links?.map((link, i) => (
                  <li key={i}>
                    <Link 
                        href={link.url || '#'} 
                        className="text-gray-500 hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ONDERKANT: Copyright & Socials */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            {data.copyright || `© ${new Date().getFullYear()} Alle rechten voorbehouden.`}
          </p>

          {/* Social Icons */}
          {data.socials && (
            <div className="flex gap-4">
              {data.socials.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-black transition-colors p-2 hover:bg-gray-200 rounded-full"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </footer>
  )
}