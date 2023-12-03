import QuestionForm from '@/components/forms/QuestionForm';
import { getUserById } from '@/lib/actions/user.action';
// import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const AskQuestion = async () => {
  // const { userId } = auth();
  const userId = '123456';
  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>
      <div className='mt-9'>
        <QuestionForm mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
