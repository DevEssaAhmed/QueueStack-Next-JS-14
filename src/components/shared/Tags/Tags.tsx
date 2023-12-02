import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const Tags = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className='flex justify-between gap-2'>
      <Badge className='subtle-medium background-light800_dark300 text-light400_dark500 rounded-md border-none px-4 py-2 uppercase'>
        <span className='text-dark200_light900'>{name}</span>
      </Badge>
      {showCount && (
        <p className='small-medium text-dark500_light700'>{totalQuestions}</p>
      )}
    </Link>
  );
};

export default Tags;
