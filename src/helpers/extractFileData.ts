/* eslint-disable array-callback-return */

import excelTOJSON from 'convert-excel-to-json'
export interface Iitem {
  compositionCode: string
  compositionDescription: string
  und: string
  itemCode: string
  itemDescription: string
  itemUnd: string
  coef: string
  price: string
}
function groupItems(items: Iitem[]) {
  const newItems = []

  function sumAllItemsPrice(compositionCode: string) {
    const composition = newItems.find(
      c => c.compositionCode === compositionCode
    )
    const prices = composition.items.map(i => i.price)
    const totalPrice = prices.reduce((a, b) => a + b)
    return totalPrice
  }

  items.map(item => {
    const itemExistsInArray = newItems.findIndex(
      i => item.compositionCode === i.compositionCode
    )
    if (itemExistsInArray < 0) {
      if (item.itemDescription.length > 1) {
        newItems.push({
          compositionCode: item.compositionCode,
          compositionDescription: item.compositionDescription,
          coef: 1,
          price: null,
          und: item.und,
          items: [],
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
        })
        newItems[itemExistsInArray].price = sumAllItemsPrice(
          item.compositionCode
        )
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
          O: 'itemUnd',
          Q: 'coef',
          R: 'price',
        },
      },
    ],
  })
  const orderedResult = groupItems(result['Rel. Analítico'])

  return orderedResult
}
