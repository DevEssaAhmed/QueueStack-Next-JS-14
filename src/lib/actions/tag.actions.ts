'use server';

import { connectToDatabase } from '@/database/mongoose';
import {
  GetAllTagsParams,
  GetQuestionByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared.types';
import User from '@/database/user.model';
import Tag from '@/database/tag.model';
import Question from '@/database/question.model';
import { FilterQuery } from 'mongoose';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    // find interactions for the user and groups by tags
    const interactions = await Question.aggregate([
      { $match: { author: userId } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    // find the tags from the interactions
    const tags = await Tag.find({
      _id: { $in: interactions.map((i) => i._id) },
    });

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionsByTagId(params: GetQuestionByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    // Calculate the number of questions to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<typeof Tag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ],
    });

    if (!tag) {
      throw new Error('Tag not found');
    }

    const questions = tag.questions;

    const isNext = tag.questions.length > pageSize;

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
