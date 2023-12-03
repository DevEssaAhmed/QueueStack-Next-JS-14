'use client';
import { HomePageFilters } from '@/constants/filters';
import React from 'react';
import { Button } from '../ui/button';

const HomeFIlters = () => {
  const active = 'newest';
  return (
    <div className='mt-10 hidden flex-wrap gap-3 md:flex'>
      {HomePageFilters.map((filter) => {
        return (
          <Button
            key={filter.value}
            onClick={() => {}}
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
