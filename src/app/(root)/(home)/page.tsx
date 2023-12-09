import HomeFIlters from '@/components/home/HomeFIlters';
import Filter from '@/components/shared/Filters/Filter';
import NoResult from '@/components/shared/NoResult/NoResult';
import QuestionCard from '@/components/shared/QuestonCard/QuestionCard';
import LocalSearchBar from '@/components/shared/Search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import { getQuestions } from '@/lib/actions/question.action';
import Link from 'next/link';

// interface Question {
//   _id: string;
//   title: string;
//   tags: { _id: string; name: string }[];
//   author: { _id: string; name: string; picture: string };
//   upvotes: number;
//   views: number;
//   answers: Array<object>;
//   createdAt: Date;
// }

// const questions: Question[] = [
//   {
//     _id: '1',
//     title: 'Cascading Deletes in SQLAlchemy',
//     tags: [
//       { _id: '1', name: 'python' },
//       { _id: '2', name: 'sql' },
//     ],
//     author: {
//       _id: '101',
//       name: 'John Doe',
//       picture: 'john-doe.jpg',
//     },
//     upvotes: 10,
//     views: 99,
//     answers: [
//       {
//         /* An example answer object */
//       },
//       {
//         /* Another example answer object */
//       },
//     ],
//     createdAt: new Date('2021-09-01T12:00:00.000Z'),
//   },
// ];

export default async function Home() {
  const result = await getQuestions({});

  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[48px] px-4 py-3 !text-light-900'>
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col'>
        <LocalSearchBar
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherClasses='flex-1'
        />
        <Filter
          filters={HomePageFilters}
          containerClasses='hidden max-md:flex'
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>
      <HomeFIlters />
      <div className='mt-10 flex w-full flex-col gap-6'>
        {result && result.questions.length > 0 ? (
          result.questions?.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description='Be the first to breatk the silence! 🚀 Ask a Question and kickstart the
        discussion. Your query could be the next big thing others learn from. Get involved!💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
    </>
  );
}
