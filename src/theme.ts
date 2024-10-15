import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e0f2ff',
      100: '#b8dcff',
      200: '#8cc6ff',
      300: '#60b0ff',
      400: '#3499ff',
      500: '#0a83ff',
      600: '#0066cc',
      700: '#004a99',
      800: '#002e66',
      900: '#001233',
    },
  },
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Open Sans", sans-serif',
  },
});

export default theme;