'use client';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const LeftSideBarLinks = ({ item, isActive }: any) => {
  if (item.route === '/profile') {
    return (
      <SignedIn>
        <Link
          key={item.route}
          href={item.route}
          className={`${
            isActive
              ? 'primary-gradient rounded-lg text-light-900'
              : 'text-dark300_light900'
          } flex items-center justify-start gap-4 bg-transparent p-4`}
        >
          <Image
            className={`${isActive ? '' : 'invert-colors'} `}
            src={item.imgURL}
            alt={item.label}
            width={20}
            height={20}
          />
          <p
            className={`${
              isActive ? 'base-bold' : 'base-medium'
            } max-lg:hidden`}
          >
            {item.label}
          </p>
        </Link>
      </SignedIn>
    );
  }
  return (
    <Link
      key={item.route}
      href={item.route}
      className={`${
        isActive
          ? 'primary-gradient rounded-lg text-light-900'
          : 'text-dark300_light900'
      } flex items-center justify-start gap-4 bg-transparent p-4`}
    >
      <Image
        className={`${isActive ? '' : 'invert-colors'} `}
        src={item.imgURL}
        alt={item.label}
        width={20}
        height={20}
      />
      <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>
        {item.label}
      </p>
    </Link>
  );
};

const LeftSideBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className='background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-5 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] '>
      <div className='flex  flex-1 flex-col gap-6'>
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === '/profile') {
            if (userId) {
              item.route = `/profile/${userId}`;
            } else {
              return null;
            }
          }

          return (
            // <Link
            //   key={item.route}
            //   href={item.route}
            //   className={`${
            //     isActive
            //       ? 'primary-gradient rounded-lg text-light-900'
            //       : 'text-dark300_light900'
            //   } flex items-center justify-start gap-4 bg-transparent p-4`}
            // >
            //   <Image
            //     className={`${isActive ? '' : 'invert-colors'} `}
            //     src={item.imgURL}
            //     alt={item.label}
            //     width={20}
            //     height={20}
            //   />
            //   <p
            //     className={`${
            //       isActive ? 'base-bold' : 'base-medium'
            //     } max-lg:hidden`}
            //   >
            //     {item.label}
            //   </p>
            // </Link>
            <LeftSideBarLinks
              key={item.route}
              item={item}
              isActive={isActive}
            />
          );
        })}
      </div>
      <SignedOut>
        <div className='flex flex-col gap-3'>
          <Link href='/sign-in'>
            <Button className='small-medium btn-secondary min-h-[42px] w-full rounded-lg px-4 py-3 shadow-none'>
              <Image
                src='/assets/icons/account.svg'
                alt='login'
                width={20}
                height={20}
                className='invert-colors lg:hidden'
              />
              <span className='primary-text-gradient max-lg:hidden'>
                Log In
              </span>
            </Button>
          </Link>

          <Link href='/sign-up'>
            <Button className='small-medium btn-tertiary text-dark400_light900 min-h-[42px] w-full rounded-lg px-4 py-3 shadow-none'>
              <Image
                src='/assets/icons/sign-up.svg'
                alt='login'
                width={20}
                height={20}
                className='invert-colors lg:hidden'
              />
              <span className='max-lg:hidden'>Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSideBar;
