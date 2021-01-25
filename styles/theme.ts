import { extendTheme } from "@chakra-ui/react"

const global =  {
  "*": {
    padding: 0,
    marging: 0,
  },
  "body": {
    background: "#EEE",
    font: "Poppins"
  }
}

const fonts = {
  body: "Poppins"
}

export const theme = extendTheme({ styles: {
  global,
} })