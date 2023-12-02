import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MatricProps {
  imgSrc: string;
  alt: string;
  value: string | number;
  title: string;
  textStyles: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgSrc,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MatricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgSrc}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href ? 'rounded-full' : ''}`}
      />
      <p className={`${textStyles} flex items-center gap-2`}>
        {value}
        <span
          className={`${
            isAuthor ? 'max-sm:hidden' : ''
          } small-regular line-clamp-1`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className='flex-center gap-1'>
        {metricContent}
      </Link>
    );
  }

  return <div className='flex-center flex-wrap gap-1'>{metricContent}</div>;
};

export default Metric;
