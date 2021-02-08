// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import url from 'url'

let cachedDb: Db = null

const connectToDatabase = async (uri: string) => {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const dbName = url.parse(uri).pathname.substr(1)

  const db = client.db(dbName)

  cachedDb = db

  return db
}

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  const { searchTerm } = req.query
  let term
  if (Array.isArray(searchTerm)) {
    term = searchTerm.join(' ')
  } else {
    term = searchTerm
  }

  const db = await connectToDatabase(process.env.MONGO_URI)
  const collection = db.collection('sinapi-mg')
  collection.createIndex({ compositionDescription: 'text' })

  const compositions = await collection
    .find({ $text: { $search: term } })
    .toArray()
  return res.json(compositions)
}
