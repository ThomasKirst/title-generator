import clientPromise from '../../lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

import type { WithId, Document } from 'mongodb';

import Title from '../../types/Title';

interface DbTitle extends WithId<Document> {}
interface DbTitle extends Title {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DbTitle | DbTitle[] | { message: string }>
) {
  const dbClient = await clientPromise;
  const db = dbClient.db('title-generator');

  switch (req.method) {
    case 'POST': {
      const title = {
        _id: req.body.id,
        ...req.body,
      };
      const result = await db.collection('titles').insertOne(title);
      const newDocument = (await db
        .collection('titles')
        .findOne({ _id: result.insertedId })) as DbTitle;
      res.status(201).json(newDocument);
      break;
    }
    case 'GET': {
      // TODO: make this user dependent
      /*
      let titles = (await db
        .collection('titles')
        .find()
        .toArray()) as DbTitle[];
      res.status(200).json(titles);
      */
      res.status(404).json({ message: 'Nothing to see here' });
    }
  }
}
