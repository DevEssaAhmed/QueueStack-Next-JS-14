'use client';
import React from 'react';
// import { useTheme } from '@/context/ThemeProvider';
import { useTheme } from 'next-themes';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Image from 'next/image';
import { themes } from '@/constants/index';

const Theme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Menubar className='relative border-none shadow-none'>
      <MenubarMenu>
        <MenubarTrigger className='focus:bg-light-900 data-[state-open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state-open]:bg-dark-200'>
          {theme === 'light' ? (
            <Image
              src='/assets/icons/sun.svg'
              className='active-theme'
              width={20}
              height={20}
              alt='light'
            />
          ) : (
            <Image
              src='/assets/icons/moon.svg'
              className='active-theme'
              width={20}
              height={20}
              alt='dark'
            />
          )}
        </MenubarTrigger>
        <MenubarContent className='absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300'>
          {themes.map((item) => {
            return (
              <MenubarItem
                className='dark:foucs:bg-dark-400  z-50 flex items-center gap-4 bg-light-900 px-2.5 py-2 dark:bg-dark-200 '
                key={item.value}
                onClick={() => {
                  setTheme(item.value);
                  // if (item.value !== 'system') {
                  //   localStorage.theme = item.value;
                  // } else {
                  //   localStorage.removeItem('theme');
                  // }
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.value}
                  height={16}
                  width={16}
                  className={`${theme === item.value && `active-theme`}`}
                />
                <p
                  className={`body-semibold text-light-500 ${
                    theme === item.value
                      ? `text-primary-500`
                      : `text-dark100_light900`
                  }`}
                >
                  {item.label}
                </p>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
