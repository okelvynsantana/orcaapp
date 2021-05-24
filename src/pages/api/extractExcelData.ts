/* eslint-disable node/handle-callback-err
 */
/* eslint-disable @typescript-eslint/no-unused-vars
 */
import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { extractSinapiData } from '../../helpers/extractFileData'
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
    console.log('deu ruim', err)
  })

  form.parse(req, async (error, fields, files) => {
    const response = await extractSinapiData(filePath)
    res.status(200).json(response)
  })
}
