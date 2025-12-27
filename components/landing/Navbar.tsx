'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastMain, setIsPastMain] = useState(false);
  const [isInBlueZone, setIsInBlueZone] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const lenis = useLenis();
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLinksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const blueZoneIds = ['info', 'download', 'stats', 'help'];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);

      const mainRect = document.getElementById('hero')?.getBoundingClientRect();
      if (mainRect) setIsPastMain(mainRect.bottom <= 100); 

      let inBlue = false;
      for (const id of blueZoneIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 120) {
            inBlue = true;
            break;
          }
        }
      }
      setIsInBlueZone(inBlue);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.to('#navbar', {
      duration: 0.4,
      backgroundColor:
        isInBlueZone || isPastMain
          ? '#0369a1'
          : isScrolled
            ? 'rgba(255, 255, 255, 0.05)'
            : 'transparent',
      backdropFilter:
        isScrolled || isInBlueZone || isPastMain ? 'blur(12px)' : 'none',
      borderBottom:
        isScrolled || isInBlueZone || isPastMain
          ? '1px solid rgba(255, 255, 255, 0.25)'
          : 'none',
      ease: 'power2.out',
    });
  }, [isScrolled, isPastMain, isInBlueZone]);

  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { y: -100, opacity: 0, display: 'none' });
    }
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    const links = mobileMenuRef.current.querySelectorAll('.mobile-link');

    if (isMobileOpen) {
      gsap.set(mobileMenuRef.current, { display: 'block' });
      const tl = gsap.timeline();
      tl.to(mobileMenuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      }).fromTo(
        links,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.25'
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: 'none' });
        }
      });
      tl.to(mobileMenuRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [isMobileOpen]);

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    const bar = e.currentTarget.querySelector('.underline-bar') as HTMLSpanElement;
    if (!bar) return;
    gsap.killTweensOf(bar);
    gsap.to(bar, {
      scaleX: enter ? 1 : 0,
      duration: 0.10,
      ease: 'power3.out',
    });
  };

  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (target.startsWith('http')) {
      window.open(target, '_blank');
      return;
    }

    lenis?.scrollTo(target, {
      offset: -100,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: () => {
        if (isMobileOpen) setIsMobileOpen(false);
      },
    });
  };

  const toggleMobile = () => setIsMobileOpen(o => !o);

  return (
    <>
      <style jsx global>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 50;
          transition: none !important;
        }
        .underline-bar {
          will-change: transform;
        }
      `}</style>

      <nav
        id="navbar"
        className="navbar flex items-center justify-between p-4 lg:px-8 text-white"
        aria-label="Global"
      >
        {/* LEFT: Logos & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/img/logo-bmti.png"
              alt="Logo BMTI"
              width={40}
              height={40}
              className="h-8 w-auto sm:h-10"
            />
          </div>
          <div className="hidden md:block w-px h-8 bg-white/30 mx-2"></div>
          <span className="font-bold text-2xl hidden md:block leading-tight">
            SIMTERA
          </span>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={toggleMobile}
            aria-label={isMobileOpen ? 'Tutup menu' : 'Buka menu'}
            className="relative inline-flex items-center justify-center rounded-md p-2.5 text-white transition-colors"
          >
            <span className="relative w-6 h-6">
              <span className="absolute inset-0 flex items-center justify-center">
                <Menu
                  className={`h-6 w-6 transition-all duration-300 ${isMobileOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'
                    }`}
                />
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <X
                  className={`h-6 w-6 transition-all duration-300 ${isMobileOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'
                    }`}
                />
              </span>
            </span>
          </button>
        </div>

        {/* DESKTOP MENU (RIGHT) */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-x-8">
            <Link
              href="#"
              onClick={(e) => smoothScrollTo(e, '#hero')}
              className="relative text-sm font-semibold hover:text-gray-200 transition-colors"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              Beranda
              <span className="underline-bar block h-1 w-10 bg-white rounded-full mt-1 mx-auto transform-gpu origin-center scale-x-0"></span>
            </Link>

            <Link
              href="#download"
              onClick={(e) => smoothScrollTo(e, '#download')}
              className="relative text-sm font-semibold hover:text-gray-200 transition-colors"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              Unduh Regulasi
              <span className="underline-bar block h-1 w-10 bg-white rounded-full mt-1 mx-auto transform-gpu origin-center scale-x-0"></span>
            </Link>

            <Link
              href="#help"
              onClick={(e) => smoothScrollTo(e, '#help')}
              className="relative text-sm font-semibold hover:text-gray-200 transition-colors"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              Panduan Pengguna
              <span className="underline-bar block h-1 w-10 bg-white rounded-full mt-1 mx-auto transform-gpu origin-center scale-x-0"></span>
            </Link>
          </div>

          <Link href="/login">
            <Button className="cursor-pointer bg-transparent text-gray-200 border border-gray-200 hover:bg-white/10 hover:text-white font-semibold rounded-full transition-all -mt-2">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden fixed inset-x-0 top-0 z-40 bg-sky-700/95 backdrop-blur-lg shadow-2xl border-b border-white/20 pt-20 pb-12"
      >
        <div ref={mobileLinksRef} className="px-6 space-y-7 text-white text-lg font-medium">
          <Link
            href="#hero"
            onClick={(e) => { smoothScrollTo(e, '#hero'); toggleMobile(); }}
            className="block mobile-link"
          >
            Beranda
          </Link>
          <Link
            href="#download"
            onClick={(e) => { smoothScrollTo(e, '#download'); toggleMobile(); }}
            className="block mobile-link"
          >
            Unduh Regulasi
          </Link>
          <Link
            href="#help"
            onClick={(e) => { smoothScrollTo(e, '#help'); toggleMobile(); }}
            className="block mobile-link"
          >
            Panduan Pengguna
          </Link>
          <Link
            href="/login"
            className="block mobile-link"
          >
            <Button className="cursor-pointer w-full bg-white text-blue-600 hover:bg-blue-50 font-bold">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
