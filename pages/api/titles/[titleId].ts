import clientPromise from '../../../lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';
import { WithId, Document } from 'mongodb';

import Title from '../../../types/Title';

interface DbTitle extends WithId<Document> {}
interface DbTitle extends Title {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DbTitle | { message: string }>
) {
  const {
    query: { titleId },
    method,
  } = req;

  const dbClient = await clientPromise;
  const db = dbClient.db('title-generator');
  const titlesCollection = 'titles';

  switch (method) {
    case 'GET':
      try {
        const title = (await db
          .collection(titlesCollection)
          .findOne({ _id: titleId })) as DbTitle;
        if (!title) {
          throw new Error(`Title with id ${titleId} could not be found`);
        }
        res.status(200).json(title);
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    case 'PUT':
      await db
        .collection(titlesCollection)
        .findOneAndReplace({ _id: titleId }, req.body);
      res.status(200).json({ success: true, message: 'Updated title' });
      break;
    case 'DELETE':
      try {
        const result = await db
          .collection(titlesCollection)
          .deleteOne({ _id: titleId });
        console.log(result);
        res.status(200).json({ success: true, message: 'Deleted title' });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
  }
}
