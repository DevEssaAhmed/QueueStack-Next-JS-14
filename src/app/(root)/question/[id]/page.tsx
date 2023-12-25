import AnswerForm from '@/components/forms/AnswerForm';
import Metric from '@/components/shared/Metric/Metric';
import ParseHTML from '@/components/shared/ParseHTML/ParseHTML';
import Tags from '@/components/shared/Tags/Tags';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import { SignedIn, auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import AllAnswers from './AllAnswers';
import Votes from '@/components/shared/Votes/Votes';

const QuestionDetailsPage = async ({ params, searchParams }: any) => {
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  } else {
    // return redirect('/sign-in');
  }

  const result = await getQuestionById({ questionId: params.id });
  if (!result) return null;

  // const showActionButtons = clerkId && clerkId === result?.author.clerkId;

  return (
    <>
      <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
          <Link
            href={`/profile/${result.author.clearkId}`}
            className='flex items-center justify-start gap-1'
          >
            <Image
              src={result.author.picture}
              alt={result.author.title}
              width={22}
              height={22}
              className='rounded-full'
            />
            <p className='paragraph-semibold text-dark300_light700'>
              {result.author.name}
            </p>
          </Link>
          <div className='flex justify-end'>
            <Votes
              type='Question'
              userId={JSON.stringify(mongoUser?._id)}
              itemId={JSON.stringify(result._id)}
              upvotes={result.upvotes.length}
              hasUpvoted={result.upvotes.includes(mongoUser?._id)}
              downvotes={result.downvotes.length}
              hasDownvoted={result.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.savedQuestions.includes(result._id)}
            />
          </div>
        </div>
        <h2 className='h2-semibold text-dark200_light900 mt-3.5 w-full text-left'>
          {result.title}
        </h2>
      </div>

      <div className='mh-8 mt-5 flex flex-wrap gap-4 '>
        <Metric
          imgSrc='/assets/icons/clock.svg'
          alt='asked'
          value={`asked ${getTimestamp(result.createdAt)}`}
          title=''
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgSrc='/assets/icons/message.svg'
          alt='message'
          value={formatAndDivideNumber(result.answers.length)}
          title=' Answers'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgSrc='/assets/icons/eye.svg'
          alt='views'
          value={formatAndDivideNumber(result.views)}
          title=' Views'
          textStyles='small-medium text-dark400_light800'
        />
      </div>
      <ParseHTML data={result.content} />
      <div className='mt-4 flex flex-row items-center justify-between'>
        <div className='flex flex-wrap gap-2'>
          {result.tags.map((tag: any) => (
            <Tags key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>
      </div>

      {/* <SignedIn>
          {showActionButtons && (
            <EditDeleteAction
              type='Question'
              itemId={JSON.stringify(result._id)}
            />
          )}
        </SignedIn> */}
      <AllAnswers
        questionId={result._id}
        userId={mongoUser?._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />
      {mongoUser ? (
        <>
          <SignedIn>
            <AnswerForm
              type='Create'
              question={result.content}
              questionId={JSON.stringify(result._id)}
              authorId={JSON.stringify(mongoUser._id)}
            />
          </SignedIn>
        </>
      ) : (
        <h1 className='text-center text-lg font-semibold'>
          You need to
          <Link href='/sign-in' className='text-primary-500 underline'>
            {' '}
            sign in{' '}
          </Link>
          to answer this question
        </h1>
      )}
    </>
  );
};

export default QuestionDetailsPage;
