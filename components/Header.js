import Link from 'next/link';
import NavBar from './NavBar';
import { useState, useEffect } from 'react';

const Header = () => {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white bg-opacity-90 transition duration-300 ease-in-out ${
        !top && ' backdrop-blur-sm shadow-lg'
      }`}
    >
      <div className='px-2 py-4 sm:px-6 xl:px-8'>
        <div className='flex items-center justify-between'>
          <Link href='/' aria-label='Humanities Research Lab'>
            <a className='mr-3 flex items-center flex-wrap '>
              {/* HRL SVG LOGO */}
              <div className='w-20 h-10 bg-contain bg-center bg-no-repeat bg-hrl-condensed'></div>
              {/* HRL TITLE */}
              <h3 className='hidden sm:block text-gradient-hrl'>
                Humanities Research Lab
              </h3>
            </a>
          </Link>
          <NavBar></NavBar>
        </div>
      </div>
    </header>
  );
};

export default Header;
