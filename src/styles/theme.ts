import { extendTheme } from '@chakra-ui/react'

const global = {
  '*': {
    padding: 0,
    marging: 0,
  },
  body: {
    background: '#FFF',
  },
}

const fonts = {
  default: 'Poppins sans-serif',
  body: 'Poppins, Helvetica, sans-serif',
}

const colors = {
  brand: {
    primary: '#5ecce6',
  },
}
const Input = {
  defaultProps: {
    focusBorderColor: colors.brand.primary,
  },
}

export const theme = extendTheme({
  components: { Input },
  fonts,
  colors,

  styles: {
    global,
  },
})
