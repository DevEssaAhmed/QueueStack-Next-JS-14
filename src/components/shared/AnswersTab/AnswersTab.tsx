import Pagination from '../Pagination/Pagination';

import { getUserAnswers } from '@/lib/actions/user.action';

import type { UserId } from '@/lib/actions/shared.types';
import type { SearchParamsProps } from '@/types';
import AnswerCard from '../AnswerCard/AnswerCard';

interface Props extends SearchParamsProps, UserId {
  clerkId?: string | null;
}
const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.answers.map((answer: any) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}

      <div className='mt-8'>
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default AnswersTab;
