import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges?: string[];
  reputation?: number;
}

const StatCards = ({ imgUrl, value, title }: any) => {
  return (
    <div
      className='light-border background-light900_dark300 flex flex-wrap items-center
        justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200
        '
    >
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className='paragraph-semibold text-dark200_light900'>
          {formatAndDivideNumber(value)}
        </p>
        <p className='body-medium text-dark400_light700'>{title}</p>
      </div>
    </div>
  );
};

const Stats = ({ totalQuestions, totalAnswers, badges, reputation }: Props) => {
  return (
    <div className='mt-10'>
      <h4 className='h3-semibold text-dark200_light900'>Stats</h4>
      <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
        <div
          className='light-border background-light900_dark300 flex flex-wrap items-center
        justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200
        '
        >
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {formatAndDivideNumber(totalQuestions)}
            </p>
            <p className='body-medium text-dark400_light700'>Questions</p>
          </div>
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {formatAndDivideNumber(totalAnswers)}
            </p>
            <p className='body-medium text-dark400_light700'>Answers</p>
          </div>
        </div>
        <StatCards
          imgUrl='/assets/icons/gold-medal.svg'
          value={0}
          title='Gold Badges'
        />
        <StatCards
          imgUrl='/assets/icons/silver-medal.svg'
          value={0}
          title='Silver Badges'
        />
        <StatCards
          imgUrl='/assets/icons/bronze-medal.svg'
          value={0}
          title='Bronze Badges'
        />
      </div>
    </div>
  );
};

export default Stats;
