import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    scripture: {
      blue: '#2B6CB0',
      gold: '#D69E2E',
      light: '#EDF2F7',
    }
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease-in-out',
        }
      }
    },
    Accordion: {
      baseStyle: {
        container: {
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          mb: 2,
        },
        button: {
          borderRadius: '16px',
          _hover: {
            bg: 'gray.50'
          }
        },
        panel: {
          backgroundColor: 'scripture.light',
          borderBottomRadius: '16px',
          px: { base: 3, md: 6 },
          py: { base: 4, md: 5 },
        }
      }
    }
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      }
    }
  }
})

export default theme
