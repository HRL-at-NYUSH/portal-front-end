import { useState } from 'react';
import Link from 'next/link';

import navbarLinks from '@/data/NavBar';
import { MenuIcon, XIcon } from '@heroicons/react/solid';

const MobileNav = ({ currentPath }) => {
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
  };

  return (
    <div className='lg:hidden'>
      <button
        type='button'
        className='w-8 h-8 ml-1 mr-1 rounded'
        aria-label='Toggle Menu'
        onClick={onToggleNav}
      >
        {navShow ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
      </button>

      <div
        className={`fixed w-full h-full top-24 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type='button'
          aria-label='toggle modal'
          className='fixed w-full h-full cursor-auto focus:outline-none'
          onClick={onToggleNav}
        ></button>
        <nav className='fixed h-full mt-8'>
          {/* navigation links */}
          {navbarLinks.map((link) => (
            <div key={link.title} className='px-12 py-2'>
              <Link href={link.href} onClick={onToggleNav}>
                <a
                  className={`text-xl font-bold
                 ${
                   currentPath.startsWith(link.href)
                     ? 'text-gray-900 font-bold'
                     : 'text-gray-600 font-medium'
                 } 
                tracking-widest text-gray-900 dark:text-gray-100`}
                >
                  {link.title}
                </a>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
