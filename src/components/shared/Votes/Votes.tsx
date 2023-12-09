'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { toast } from '@/components/ui/use-toast';

import { upvoteAnswer, downvoteAnswer } from '@/lib/actions/answer.action';

import { getFormattedNumber } from '@/lib/utils';
import {
  downVoteQuestion,
  upVoteQuestion,
} from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { viewQuestion } from '@/lib/actions/interaction.action';

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasSaved?: boolean;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [hasUpvotedState, setHasUpVotedState] = useState(hasUpvoted);
  const [hasDownvotedState, setHasDownVotedState] = useState(hasDownvoted);

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });

    toast({
      title: `Question ${
        !hasSaved ? 'saved' : 'removed from your collection'
      } 🎉`,
      variant: !hasSaved ? 'default' : 'destructive',
    });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: 'Not signed in',
        description: 'You need to be signed in to vote ⚠️',
      });
    }

    if (action === 'upvote') {
      if (type === 'Question') {
        setHasUpVotedState(!hasUpvoted);
        setHasDownVotedState(false);

        await upVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === 'Answer') {
        setHasUpVotedState(true);
        setHasDownVotedState(false);

        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }

      toast({
        title: `Upvote ${!hasUpvoted ? 'added' : 'removed'} 🎉`,
        variant: !hasUpvoted ? 'default' : 'destructive',
      });
    }

    if (action === 'downvote') {
      if (type === 'Question') {
        setHasDownVotedState(!hasDownvoted);
        setHasUpVotedState(false);

        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === 'Answer') {
        setHasDownVotedState(!hasDownvoted);
        setHasUpVotedState(false);
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }

      toast({
        title: `Downvote ${!hasDownvoted ? 'added' : 'removed'} 🎉`,
        variant: !hasDownvoted ? 'default' : 'destructive',
      });
    }
  };

  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasUpvotedState
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            alt='upvote'
            className='cursor-pointer'
            onClick={() => handleVote('upvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {getFormattedNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasDownvotedState
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            alt='downvote'
            className='cursor-pointer'
            onClick={() => handleVote('downvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {getFormattedNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === 'Question' && (
        <Image
          src={
            hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt='star'
          className='cursor-pointer'
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
