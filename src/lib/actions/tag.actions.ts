'use server';

import { connectToDatabase } from '@/database/mongoose';
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.types';
import User from '@/database/user.model';
import Tag from '@/database/tag.model';
import Question from '@/database/question.model';

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
