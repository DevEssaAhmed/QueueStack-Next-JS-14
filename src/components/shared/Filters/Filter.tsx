'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterProps {
  filters: { name: string; value: string }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get('filter');
  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        defaultValue={paramFilter || undefined}
        onValueChange={(value) => handleUpdateParams(value)}
      >
        <SelectTrigger
          className={` ${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className='line-clamp-1 flex-1 text-left'>
            <SelectValue placeholder='Select a filter' />
          </div>
        </SelectTrigger>
        <SelectContent className='dark:border-none'>
          <SelectGroup className=''>
            {filters.map((filter, index) => (
              <SelectItem
                className='background-light900_dark300 hover:background-light800_dark400 z-20 cursor-pointer p-3'
                key={index}
                value={filter.value}
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
