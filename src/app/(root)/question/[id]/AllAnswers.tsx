import Filter from '@/components/shared/Filters/Filter';
import ParseHTML from '@/components/shared/ParseHTML/ParseHTML';
import Votes from '@/components/shared/Votes/Votes';
import { AnswerFilters } from '@/constants/filters';
import { getAnswers } from '@/lib/actions/answer.action';
import { getTimestamp } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  if (!result) return;
  return (
    <div className='card-wrapper mb-4 mt-11 rounded-md p-8 '>
      <div className='flex items-center justify-between'>
        <h3 className='primary-text-gradient'>{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result.answers.map((answer: any) => (
          <article key={answer._id} className='light-border border-b py-10'>
            <div className='flex items-center justify-between'>
              <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className='flex flex-1 items-start  gap-1 sm:items-center'
                >
                  <Image
                    src={answer.author.picture}
                    alt={answer.author.name}
                    width={22}
                    height={22}
                    className='rounded-full object-cover max-sm:mt-0.5'
                  />
                  <div className='flex flex-col sm:flex-row sm:items-center'>
                    <p className='body-semibold text-dark300_light700'>
                      {answer.author.name}
                    </p>
                    <p className='small-regular text-light400_light500 line-clmap-1 ml-0.5 mt-0.5'>
                      <span className='max-sm:hidden'>-</span> answered{' '}
                      {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <Votes
                    type='Answer'
                    userId={JSON.stringify(userId)}
                    itemId={JSON.stringify(answer._id)}
                    upvotes={answer.upvotes.length}
                    hasUpvoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasDownvoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
