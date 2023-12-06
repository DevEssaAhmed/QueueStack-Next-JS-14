import AnswerForm from '@/components/forms/AnswerForm';
import Metric from '@/components/shared/Metric/Metric';
import ParseHTML from '@/components/shared/ParseHTML/ParseHTML';
import Tags from '@/components/shared/Tags/Tags';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const QuestionDetailsPage = async ({ params }: any) => {
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  } else {
    return redirect('/sign-in');
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
              {result.author.title}
            </p>
          </Link>
          <div className='flex justify-end'>Voting</div>
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
          title=' Asked'
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
      <div className='mt-8 flex flex-row items-center justify-between'>
        <div className='flex flex-wrap gap-2'>
          {result.tags.map((tag: any) => (
            <Tags key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>

        {/* <SignedIn>
          {showActionButtons && (
            <EditDeleteAction
              type='Question'
              itemId={JSON.stringify(result._id)}
            />
          )}
        </SignedIn> */}
        <AnswerForm
          type='Create'
          question={result.content}
          questionId={JSON.stringify(result._id)}
          authorId={JSON.stringify(mongoUser._id)}
        />
      </div>
    </>
  );
};

export default QuestionDetailsPage;