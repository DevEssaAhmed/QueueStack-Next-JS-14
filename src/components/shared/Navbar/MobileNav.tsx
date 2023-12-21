'use client';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { sidebarLinks } from '@/constants';

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className='flex   flex-col gap-6 pt-16'>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === '/profile') {
          return (
            <SignedIn key={item.route}>
              <SheetClose asChild key={item.route}>
                <Link
                  href={item.route}
                  className={`${
                    isActive
                      ? 'primary-gradient rounded-lg text-light-900'
                      : 'text-dark300_light900'
                  } flex items-center justify-start gap-2 bg-transparent  p-3 sm:gap-4 sm:p-4`}
                >
                  <Image
                    className={`${isActive ? '' : 'invert-colors'} `}
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                    {item.label}
                  </p>
                </Link>
              </SheetClose>
            </SignedIn>
          );
        }

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
              } flex items-center justify-start gap-2 bg-transparent p-3 sm:gap-4 sm:p-4`}
            >
              <Image
                className={`${isActive ? '' : 'invert-colors'} `}
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src='/assets/icons/hamburger.svg'
          width={36}
          height={36}
          alt='menu'
          className='invert-colors sm:hidden'
        />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='background-light900_dark200 border-none'
      >
        <Link href='/' className='flex items-center gap-1'>
          <Image
            src='/assets/images/site-logo.svg'
            width={23}
            height={23}
            alt='QueueStack'
          />
          <p className='h2-bold  text-dark100_light900 spaceGrotesk'>
            Queue<span className='text-primary-500'>Stack</span>
          </p>
        </Link>
        <div className='flex h-full flex-col justify-between pb-4 sm:pb-8  '>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className='flex flex-col gap-3'>
              <SheetClose asChild>
                <Link href='/sign-in'>
                  <Button className='small-medium btn-secondary min-h-[42px] w-full rounded-lg px-4 py-3 shadow-none'>
                    <span className='primary-text-gradient'>Sign In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href='/sign-up'>
                  <Button className='small-medium btn-tertiary text-dark400_light900 min-h-[42px] w-full rounded-lg px-4 py-3 shadow-none'>
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
