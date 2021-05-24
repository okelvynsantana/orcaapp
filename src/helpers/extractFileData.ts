/* eslint-disable array-callback-return */

import excelTOJSON from 'convert-excel-to-json'
import { v4 as uuidv4 } from 'uuid'

export interface Iitem {
  compositionCode: string
  compositionDescription: string
  und: string
  itemCode: string
  itemDescription: string
  coef: string
  price: string
}

function groupItems(items: Iitem[]) {
  const newItems = []

  items.map(item => {
    const itemExistsInArray = newItems.findIndex(
      i => item.compositionCode === i.compositionCode
    )
    if (itemExistsInArray < 0) {
      if (item.itemDescription.length > 1) {
        newItems.push({
          compositionCode: item.compositionCode,
          compositionDescription: item.compositionDescription,
          _id: uuidv4(),
          items: [
            {
              itemCode: item.itemCode,
              itemDescription: item.itemDescription,
              und: item.und,
              coef: parseFloat(item.coef.replace(',', '.')),
              price: parseFloat(item.price.replace(',', '.')),
              _id: uuidv4(),
            },
          ],
        })
      }
    } else {
      if (item.itemDescription.length > 1) {
        newItems[itemExistsInArray].items.push({
          itemCode: item.itemCode,
          itemDescription: item.itemDescription,
          und: item.und,
          coef: parseFloat(item.coef.replace(',', '.')),
          price: parseFloat(item.price.replace(',', '.')),
          _id: uuidv4(),
        })
      }
    }
  })

  return newItems as Iitem[]
}

export async function extractSinapiData(filePath: string) {
  const result = excelTOJSON({
    sourceFile: filePath,
    header: {
      rows: 8,
    },
    sheets: [
      {
        name: 'Rel. Analítico',
        columnToKey: {
          G: 'compositionCode',
          H: 'compositionDescription',
          I: 'und',
          M: 'itemCode',
          N: 'itemDescription',
          Q: 'coef',
          R: 'price',
        },
      },
    ],
  })
  const orderedResult = groupItems(result['Rel. Analítico'])

  return orderedResult
}
