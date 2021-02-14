import { NowRequest, NowResponse } from '@vercel/node'
import excelJS from 'exceljs'

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  const { basicData, constructionSteps } = req.body

  const workbook = new excelJS.Workbook()
  workbook.created = new Date()
  workbook.creator = basicData.name

  const sheet = workbook.addWorksheet('Planilha orçamentária')

  sheet.columns = []
}
