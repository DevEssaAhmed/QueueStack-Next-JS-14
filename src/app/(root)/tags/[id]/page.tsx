import NoResult from '@/components/shared/NoResult/NoResult';
import QuestionCard from '@/components/shared/QuestonCard/QuestionCard';
import LocalSearchBar from '@/components/shared/Search/LocalSearchBar';
import { getQuestionsByTagId } from '@/lib/actions/tag.actions';
import { URLProps } from '@/types';

interface Question {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; picture: string };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const TagDetailsPage = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900 capitalize'>
        {result.tagTitle}
      </h1>

      <div className='mt-11 w-full'>
        <LocalSearchBar
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search question for the tag'
          otherClasses='flex-1'
        />
      </div>

      <div className='mt-10 flex w-full flex-col gap-6'>
        {result && result.questions.length > 0 ? (
          result.questions?.map((question: Question) => (
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
            title="There's no saved questions to show"
            description='Be the first to breatk the silence! 🚀 Ask a Question and kickstart the
        discussion. Your query could be the next big thing others learn from. Get involved!💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
    </>
  );
};

export default TagDetailsPage;
