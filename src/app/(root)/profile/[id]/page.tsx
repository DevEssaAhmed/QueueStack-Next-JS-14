import Link from 'next/link';
import Image from 'next/image';

import { SignedIn, auth } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getUserInfo, getUserById } from '@/lib/actions/user.action';

import type { URLProps } from '@/types';
import type { Metadata } from 'next';
import ProfileLink from '@/components/shared/ProfileLink/ProfileLink';
import { getFormattedJoinedDate } from '@/lib/utils';
import Stats from '@/components/shared/Stats/Stats';
import AnswersTab from '@/components/shared/AnswersTab/AnswersTab';
import QuestionsTab from '@/components/shared/QuestionsTab/QuestionsTab';

export async function generateMetadata({
  params,
}: Omit<URLProps, 'searchParams'>): Promise<Metadata> {
  const user = await getUserById({ userId: params.id });

  return {
    title: `${user.username}'s Profile — DevOverflow`,
  };
}

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });
  console.log(userInfo);
  return (
    <>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
        <div className='flex flex-col items-start gap-4 lg:flex-row'>
          <Image
            src={userInfo?.user.picture}
            alt='profile picture'
            width={140}
            height={140}
            className='rounded-full object-cover'
          />

          <div className='mt-3'>
            <h2 className='h2-bold text-dark100_light900'>
              {userInfo.user.name}
            </h2>
            <p className='paragraph-regular text-dark200_light800'>
              @{userInfo.user.username}
            </p>

            <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl='/assets/icons/link.svg'
                  href={userInfo.user.portfolioWebsite}
                  title='Portfolio'
                />
              )}

              {userInfo.user.location && (
                <ProfileLink
                  imgUrl='/assets/icons/location.svg'
                  title={userInfo.user.location}
                />
              )}

              <ProfileLink
                imgUrl='/assets/icons/calendar.svg'
                title={getFormattedJoinedDate(userInfo.user.joinedAt)}
              />
            </div>

            {userInfo.user.bio && (
              <p className='paragraph-regular text-dark400_light800 mt-8'>
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href='/profile/edit'>
                <Button className='paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3'>
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
        badges={userInfo.user.badgeCounts}
        reputation={userInfo.user.reputation}
      />

      <div className='mt-10 flex gap-10'>
        <Tabs defaultValue='top-posts' className='flex-1'>
          <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
            <TabsTrigger value='top-posts' className='tab'>
              Top Posts
            </TabsTrigger>
            <TabsTrigger value='answers' className='tab'>
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='top-posts'
            className='mt-5 flex w-full flex-col gap-6'
          >
            <QuestionsTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value='answers' className='flex w-full flex-col gap-6'>
            <AnswersTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;