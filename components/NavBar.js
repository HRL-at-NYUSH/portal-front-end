import { MenuIcon, XIcon } from '@heroicons/react/solid';
import navbarLinks from '@/data/NavBar';

import Link from 'next/link';
import { useRouter } from 'next/router';

import HRL from '@/assets/hrl-condensed.svg';

import MobileNav from './MobileNav';

const NavBar = () => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className='flex items-center flex-wrap text-base leading-5'>
      <div className='hidden lg:block'>
        {navbarLinks.map((link) => (
          <Link key={link.title} href={link.href}>
            <a
              className={`transition p-1 sm:p-6 whitespace-nowrap
          ${
            currentPath.startsWith(link.href)
              ? 'text-gray-900 font-bold'
              : 'text-gray-800'
          } 
            hover:text-gray-500 `}
            >
              {link.title}
            </a>
          </Link>
        ))}
        <Link href='login'>
          <a
            className={`btn p-3 ml-4 bg-accent hover:bg-accent-darker text-white
        
           `}
          >
            Login
          </a>
        </Link>
        <div className=''></div>
      </div>

      <MobileNav currentPath={currentPath} />
    </div>
  );
};

export default NavBar;
