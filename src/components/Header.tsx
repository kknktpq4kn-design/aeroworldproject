import { useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'

const WINDOWS_LOGO = 'https://reloadedwin.neocities.org/index_pliki/4300ae64-546c-4bbe-9026-6779b3684fb9.png'

type SubItem = { label: string; to: string }

const downloadSubMenu: Array<SubItem> = [
  { label: 'Windows 7.1', to: '/download' },
  { label: 'Windows 7.1 themes', to: '#' },
  { label: 'Desktop backgrounds', to: '#' },
]

const discoverSubMenu: Array<SubItem> = [
  { label: 'Desktop', to: '#' },
  { label: 'Personalize', to: '#' },
  { label: 'TV and streaming', to: '#' },
  { label: 'Windows Touch', to: '#' },
  { label: 'More articles', to: '/discover' },
]

type NavItemProps = {
  label: string
  to: string
  subItems?: Array<SubItem>
  isActive: boolean
}

function NavLinkOrAnchor({ to, className, children }: { to: string; className: string; children: React.ReactNode }) {
  if (to === '#' || to.startsWith('http')) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

function NavItem({ label, to, subItems, isActive }: NavItemProps) {
  const [open, setOpen] = useState(false)
  const hasSubMenu = Boolean(subItems && subItems.length > 0)
  return (
    <div
      className="relative"
      onMouseEnter={() => hasSubMenu && setOpen(true)}
      onMouseLeave={() => hasSubMenu && setOpen(false)}
    >
      <NavLinkOrAnchor
        to={to}
        className={`px-3 py-2 text-sm font-main inline-block transition-colors ${
          isActive ? 'text-white font-semibold' : 'text-[#b4d5f0] hover:text-white'
        }`}
      >
        {label}
      </NavLinkOrAnchor>
      {hasSubMenu && open && (
        <div className="absolute top-full left-0 z-50 bg-[#0b2e4e] border border-[#1a5a8a] shadow-lg min-w-[200px]">
          {subItems!.map((item, i) => (
            <div key={i}>
              {i === subItems!.length - 1 && subItems!.length > 2 && (
                <div className="border-t border-[#1a5a8a] mx-2" />
              )}
              <NavLinkOrAnchor
                to={item.to}
                className="block px-4 py-2 text-sm text-[#b4d5f0] hover:text-white hover:bg-[#0d3a5f] font-main"
              >
                {item.label}
              </NavLinkOrAnchor>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const location = useLocation()
  return (
    <div className="w-full bg-gradient-to-b from-[#0a1e33] to-[#0d2845] font-main">
      <div className="max-w-[900px] mx-auto px-4">
        <div className="flex justify-end items-center py-2 text-xs gap-2">
          <span className="text-[#8ab8d8]">United States</span>
          <span className="text-[#d4a800] hover:underline cursor-pointer">Change</span>
          <span className="text-[#5a8aaa]">|</span>
          <span className="text-[#d4a800] hover:underline cursor-pointer">Other projects</span>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto px-4 pb-1">
        <Link to="/">
          <img src={WINDOWS_LOGO} alt="Windows" className="h-[34px]" />
        </Link>
      </div>
      <div className="border-t border-[#1a4a6e]">
        <div className="max-w-[900px] mx-auto px-4">
          <nav className="flex items-center">
            <NavItem label="Home" to="/" isActive={location.pathname === '/'} />
            <NavItem
              label="Download"
              to="/download"
              subItems={downloadSubMenu}
              isActive={location.pathname === '/download'}
            />
            <NavItem
              label="Discover Windows"
              to="/discover"
              subItems={discoverSubMenu}
              isActive={location.pathname === '/discover'}
            />
          </nav>
        </div>
      </div>
    </div>
  )
}
