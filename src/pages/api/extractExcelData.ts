/* eslint-disable node/handle-callback-err
 */
/* eslint-disable @typescript-eslint/no-unused-vars
 */
import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { extractSinapiData } from '../../helpers/extractFileData'
import { Db, MongoClient } from 'mongodb'
import url from 'url'
import { uuid } from 'uuidv4'

export const config = {
  api: {
    bodyParser: false,
  },
}
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const form = new formidable.IncomingForm({
      uploadDir: './public/uploads',
      keepExtensions: true,
      allowEmptyFiles: false,
      multiples: false,
    })

    let filePath
    form.on('file', async function (field, file) {
      filePath = file.path
    })
    form.on('error', err => {
      console.error('Erro ao fazer upload do arquivo', err)
    })

    form.parse(req, async (error, fields, files) => {
      const db = await connectToDatabase(process.env.MONGO_URI)
      const response = await extractSinapiData(filePath)

      const collectionName = `sinapi-mg-${uuid()}`
      const collection = db.collection(collectionName)

      collection.insertMany(response)
      res.status(200).json({ collectionName })
    })
  } catch (err) {
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}
