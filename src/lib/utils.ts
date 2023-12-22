import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { RemoveUrlQueryParams, UrlQueryParams } from '@/types';
import qs from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
};

export const formatAndDivideNumber = (number: number): string => {
  if (number >= 1000000) {
    const millions = (number / 1000000).toFixed(1);
    return `${millions}M`;
  } else if (number >= 1000) {
    const thousands = (number / 1000).toFixed(1);
    return `${thousands}K`;
  } else {
    return `${number}`;
  }
};
export const getFormattedNumber = (number: number): string => {
  if (number < 1000) return number.toString(); // Return the same number
  if (number < 1000000) return `${(number / 1000).toFixed(1)}K`; // Convert to K for number from 1000 < n < 1 million
  if (number < 1000000000) return `${(number / 1000000).toFixed(1)}M`; // Convert to M for number from 1 million < n < 1 billion
  return `${(number / 1000000000).toFixed(1)}B`; // Convert to B for number n > 1 billion
};

export const getFormattedJoinedDate = (date: Date): string => {
  const month: string = date.toLocaleString('en', { month: 'long' });
  const year: number = date.getFullYear();

  return `Joined ${month} ${year}`;
};

export const formUrlQuery = ({
  params,
  key,
  value,
}: UrlQueryParams): string => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams): string => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
