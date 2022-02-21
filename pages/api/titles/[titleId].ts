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

  switch (method) {
    case 'GET':
      const title = (await db
        .collection('titles')
        .findOne({ _id: titleId })) as DbTitle;
      res.status(200).json(title);
      break;
    case 'PUT':
      const updatedTitle = await db
        .collection('titles')
        .updateOne({ _id: titleId }, req.body);
      res.status(200).json({ message: 'Updated title' });
      break;
    case 'DELETE':
      const result = await db.collection('title').deleteOne({ _id: titleId });
      res.status(200).json({ message: 'Deleted title' });
  }
}
