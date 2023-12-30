import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <div className='mb-12 mt-11 flex flex-wrap items-center justify-between gap-5'>
        <Skeleton className='h-14 flex-1' />
        <div className='hidden max-md:block'>
          <Skeleton className='h-14 w-28' />
        </div>
      </div>

      <div className='my-10 hidden flex-wrap gap-3 md:flex'>
        <Skeleton className='h-9 w-28' />
        <Skeleton className='h-9 w-28' />
        <Skeleton className='h-9 w-28' />
        <Skeleton className='h-9 w-28' />
      </div>

      <div className='flex flex-col gap-6'>
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className='h-48 w-full rounded-xl' />
        ))}
      </div>
    </section>
  );
};

export default Loading;
