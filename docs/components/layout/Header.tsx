import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import './Header.css'

export const UnbrnLogo = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 526 526" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 105.203C0 47.101 47.101 0 105.203 0C163.305 0 210.406 47.101 210.406 105.203V280.533C210.406 385.667 295.636 470.895 400.773 470.895C409.421 470.895 417.935 470.319 426.277 469.202C381.423 504.763 324.695 526 263.008 526C117.753 526 0 408.251 0 263V105.203Z" fill="var(--accent-color)" />
    <path d="M286.977 119.511C286.977 53.507 340.484 0 406.489 0C472.493 0 526 53.507 526 119.511V267.545C526 333.55 472.493 387.057 406.489 387.057C340.484 387.057 286.977 333.55 286.977 267.545V119.511Z" fill="var(--accent-color)" />
  </svg>
)

export interface HeaderLink {
  label: string
  href?: string
  onClick?: () => void
  targetId?: string
}

export interface HeaderProps {
  logo?: React.ReactNode
  brandName?: string
  brandHref?: string
  links?: HeaderLink[]
  actions?: React.ReactNode
  onLinkClick?: (href: string) => void
  accentColor?: string
  activeId?: string
  hamburger?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  brandName,
  brandHref,
  links,
  actions,
  onLinkClick,
  accentColor,
  activeId: activeIdProp,
  hamburger
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const capsuleRef = useRef<HTMLDivElement>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const [activeId, setActiveId] = useState(activeIdProp || '')

  useEffect(() => {
    if (activeIdProp !== undefined) {
      setActiveId(activeIdProp)
    }
  }, [activeIdProp])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (capsuleRef.current && !capsuleRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Always show header at the very top and reset active target (hero section)
      if (currentScrollY <= 50) {
        setIsHeaderVisible(true)
        if (activeIdProp === undefined) {
          setActiveId('')
        }
        return
      }

      // Do not hide the header on scroll in mobile view
      if (window.innerWidth <= 768) {
        setIsHeaderVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      // Check scroll direction
      if (currentScrollY > lastScrollY.current) {
        // Scrolling Down -> Hide header (only if menu is collapsed)
        if (!isMenuOpen) {
          setIsHeaderVisible(false)
        }
      } else {
        // Scrolling Up -> Show header
        setIsHeaderVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMenuOpen, activeIdProp])

  useEffect(() => {
    // 1. Initial active element state check
    if (activeIdProp === undefined && window.scrollY <= 50) {
      setActiveId('')
    }

    // 2. ScrollSpy logic using IntersectionObserver
    if (!links || links.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px', // Target focus viewport area
      threshold: 0
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (activeIdProp !== undefined) return
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (id) {
            setActiveId(id)
          }
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    links.forEach((link) => {
      const id = link.targetId || (link.href?.startsWith('#') ? link.href.slice(1) : null)
      if (id) {
        const el = document.getElementById(id)
        if (el) {
          observer.observe(el)
        }
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [links, activeIdProp])

  return (
    <>
      <div 
        className={`unbrn-menu-backdrop ${isMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
      <header 
        className={`unbrn-header-wrapper ${isHeaderVisible ? '' : 'is-hidden'}`}
        style={accentColor ? { '--accent-color': accentColor } as React.CSSProperties : undefined}
      >
        <div className="unbrn-header-container">
        {/* Floating Left Menu Capsule */}
        <div ref={capsuleRef} className={`menu-capsule unbrn-glass ${isMenuOpen ? 'is-open' : ''}`}>
          <div className="capsule-header">
            <a href={brandHref || '#'} className="unbrn-logo">
              {logo}
              {brandName && <span>{brandName}</span>}
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {hamburger}
              <button
                className="capsule-toggle-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <ChevronDown className={`toggle-icon ${isMenuOpen ? 'is-open' : ''}`} size={16} />
              </button>
            </div>
          </div>

          <div className={`capsule-body-wrapper ${isMenuOpen ? 'is-open' : ''}`}>
            <div className="capsule-body-inner">
              <nav className="capsule-nav">
                {links && links.length > 0 && links.map((link) => {
                  const linkId = link.targetId || (link.href?.startsWith('#') ? link.href.slice(1) : '')
                  const isActive = activeId === linkId
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`capsule-nav-link ${isActive ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault()
                        setIsMenuOpen(false)
                        if (linkId && activeIdProp === undefined) {
                          setActiveId(linkId)
                        }
                        if (link.onClick) {
                          link.onClick()
                        }
                        if (onLinkClick && link.href) {
                          onLinkClick(link.href)
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {link.label}
                    </a>
                  )
                })}
                
                {actions && (
                  <>
                    <div className="capsule-divider" />
                    <div className="capsule-action" onClick={() => setIsMenuOpen(false)}>
                      {actions}
                    </div>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
  )
}
