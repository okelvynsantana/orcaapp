import { NowRequest, NowResponse } from '@vercel/node'
import ExcelJS from 'exceljs'

export default async (req: NowRequest, res: NowResponse) => {
  const { basicData, constructionSteps } = req.body

  const workbook = new ExcelJS.Workbook()

  workbook.created = new Date()
  workbook.creator = 'OrçaFacil'

  const sheet = workbook.addWorksheet('Planilha Orçamentária')

  /*
   * Cabeçalho da planilha com infos básicas
   */
  sheet.getCell('C1').value = 'Orçamento'
  sheet.getCell('D1').value = basicData.constructionName
  sheet.getCell('I1').value = 'Responsável Técnico'
  sheet.getCell('J1').value = basicData.technicalManager
  sheet.getCell('C2').value = 'BDI Médio'
  sheet.getCell('D2').value = `${basicData.bdi} %`
  sheet.getCell('C3').value = 'Endereço'
  sheet.getCell('D3').value = basicData.address
  sheet.getCell('C4').value = 'Proprietário'
  sheet.getCell('D4').value = basicData.proprietary

  // sheet.columns = [
  //   { width: 25, style: { alignment: { horizontal: 'center' } } },
  //   { width: 25, style: { alignment: { horizontal: 'center' } } },
  //   { width: 25, style: { alignment: { horizontal: 'center' } } },
  //   { width: 25, style: { alignment: { horizontal: 'center' } } },
  //   { width: 20, style: { alignment: { horizontal: 'center' } } },
  //   { width: 20, style: { alignment: { horizontal: 'center' } } },
  //   { width: 20, style: { alignment: { horizontal: 'center' } } },
  //   { width: 20, style: { alignment: { horizontal: 'center' } } },
  //   { width: 20, style: { alignment: { horizontal: 'center' } } },
  //   { width: 25, style: { alignment: { horizontal: 'center' } } },
  //   { width: 25, style: { alignment: { horizontal: 'center' } } },
  //   { width: 20, style: { alignment: { horizontal: 'center' } } },
  // ]
}
