import { NowRequest, NowResponse } from '@vercel/node'
import ExcelJS from 'exceljs'
import { Writable } from 'stream'

export default async (req: NowRequest, res: NowResponse) => {
  const { basicData, constructionSteps } = req.body
  if (!basicData || !constructionSteps) {
    return res.status(400).json({
      error: true,
      statusCode: 400,
      message: 'Invalid arguments',
    })
  }

  const workbook = new ExcelJS.Workbook()

  workbook.created = new Date()
  workbook.creator = 'OrçaFacil'

  const sheet = workbook.addWorksheet('Planilha Orçamentária')
  sheet.columns = [
    { width: 25, style: { alignment: { horizontal: 'left' } } },
    { width: 60, style: { alignment: { horizontal: 'left' } } },
    { width: 25, style: { alignment: { horizontal: 'left' } } },
    { width: 25, style: { alignment: { horizontal: 'left' } } },
    { width: 25, style: { alignment: { horizontal: 'left' } } },
    { width: 25, style: { alignment: { horizontal: 'left' } } },
    { width: 25, style: { alignment: { horizontal: 'left' } } },
    { width: 25, style: { alignment: { horizontal: 'left' } } },
    { width: 25, style: { alignment: { horizontal: 'left' } } },
    // { width: 40, style: { alignment: { horizontal: 'center' } } },
    // { width: 40, style: { alignment: { horizontal: 'center' } } },
    // { width: 40, style: { alignment: { horizontal: 'center' } } },
    // { width: 40, style: { alignment: { horizontal: 'center' } } },
    // { width: 40, style: { alignment: { horizontal: 'center' } } },
  ]
  /*
   * Cabeçalho da planilha com infos básicas
   */
  sheet.getCell('A1').value = 'Orçamento'
  sheet.getCell('A1').font = { bold: true }
  sheet.getCell('B1').value = basicData.constructionName || ' '

  sheet.getCell('D1').value = 'Responsável Técnico'
  sheet.getCell('D1').font = { bold: true }
  sheet.getCell('E1').value = basicData.technicalManager || ' '

  sheet.getCell('A2').value = 'BDI Médio'
  sheet.getCell('A2').font = { bold: true }
  sheet.getCell('B2').value = `${basicData.bdi} %` || '0%'

  sheet.getCell('A3').value = 'Endereço'
  sheet.getCell('A3').font = { bold: true }
  sheet.getCell('B3').value = basicData.address || ' '

  sheet.getCell('A4').value = 'Proprietário'
  sheet.getCell('A4').font = { bold: true }
  sheet.getCell('B4').value = basicData.proprietary || ' '

  /**
   * Dados
   */

  sheet.getCell('A6').value = 'CÓDIGO SINAPI'
  sheet.getCell('A6').font = { bold: true }
  sheet.getCell('B6').value = 'DESCRIÇÃO'
  sheet.getCell('B6').font = { bold: true }
  sheet.getCell('C6').value = 'UND'
  sheet.getCell('C6').font = { bold: true }
  sheet.getCell('D6').value = 'QTD'
  sheet.getCell('D6').font = { bold: true }
  sheet.getCell('E6').value = 'COEF.'
  sheet.getCell('E6').font = { bold: true }
  sheet.getCell('F6').value = 'PREÇO UNITÁRIO'
  sheet.getCell('F6').font = { bold: true }
  sheet.getCell('G6').value = 'CUSTO UNITÁRIO'
  sheet.getCell('G6').font = { bold: true }
  sheet.getCell('H6').value = 'CUSTO DIRETO'
  sheet.getCell('H6').font = { bold: true }
  sheet.getCell('I6').value = 'PREÇO DE VENDA'
  sheet.getCell('I6').font = { bold: true }

  let rowNumber = 7
  for (const step of constructionSteps) {
    const row = sheet.getRow(rowNumber++)

    row.getCell(2).value = step.stepName.toUpperCase()
    row.getCell(2).font = { bold: true }
    row.fill = {
      pattern: 'solid',
      fgColor: {
        argb: 'cccccc',
      },
      type: 'pattern',
    }

    for (const composition of step.services) {
      const compositionRow = sheet.getRow(rowNumber++)
      compositionRow.font = { bold: true }
      compositionRow.getCell(1).value = composition.compositionCode
      compositionRow.getCell(2).value = composition.compositionDescription
      compositionRow.getCell(3).value = composition.und
      compositionRow.getCell(4).value = composition.qtd
      compositionRow.getCell(5).value = composition.coef
      compositionRow.getCell(6).value = composition.price.toLocaleString(
        'pt-BR',
        {
          currency: 'BRL',
          style: 'currency',
        }
      )
      compositionRow.getCell(7).value = composition.unitCoast.toLocaleString(
        'pt-BR',
        {
          currency: 'BRL',
          style: 'currency',
        }
      )
      compositionRow.getCell(8).value = composition.directCoast.toLocaleString(
        'pt-BR',
        {
          currency: 'BRL',
          style: 'currency',
        }
      )
      compositionRow.getCell(9).value = composition.finalPrice.toLocaleString(
        'pt-BR',
        {
          currency: 'BRL',
          style: 'currency',
        }
      )
      for (const item of composition.items) {
        const itemRow = sheet.getRow(rowNumber++)
        itemRow.getCell(1).value = item.itemCode
        itemRow.getCell(2).value = item.itemDescription
        itemRow.getCell(3).value = item.und
        itemRow.getCell(4).value = item.qtd
        itemRow.getCell(5).value = item.coef
        itemRow.getCell(6).value = item.price.toLocaleString('pt-BR', {
          currency: 'BRL',
          style: 'currency',
        })
        itemRow.getCell(7).value = item.unitCoast.toLocaleString('pt-BR', {
          currency: 'BRL',
          style: 'currency',
        })
        itemRow.getCell(8).value = item.directCoast.toLocaleString('pt-BR', {
          currency: 'BRL',
          style: 'currency',
        })
        itemRow.getCell(9).value = item.finalPrice.toLocaleString('pt-BR', {
          currency: 'BRL',
          style: 'currency',
        })
      }
    }
  }

  const chunks: Buffer[] = []
  const file = await workbook.xlsx
    .write(
      new Writable({
        write: (chunk, encoding, cb) => {
          chunks.push(chunk as Buffer)
          cb()
        },
      })
    )
    .then(() => Buffer.concat(chunks))

  return res.status(200).json({
    file: file,
  })
}
