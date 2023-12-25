'use client';
import { HomePageFilters } from '@/constants/filters';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { formUrlQuery } from '@/lib/utils';

const HomeFIlters = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [active, setActive] = useState('');

  const handleClick = (item: string) => {
    if (active === item) {
      setActive('');
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className='mt-10 hidden flex-wrap gap-3 md:flex'>
      {HomePageFilters.map((filter) => {
        return (
          <Button
            key={filter.value}
            onClick={() => {
              handleClick(filter.value);
            }}
            className={`body-medium px6 rounded-lg py-3 capitalize shadow-none ${
              active === filter.value
                ? 'bg-primary-100 text-primary-500'
                : 'bg-light-800 text-light-500 hover:text-dark-400 dark:bg-dark-300 dark:text-light-500  dark:hover:bg-dark-500'
            }`}
          >
            {filter.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFIlters;
