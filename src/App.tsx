import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './styles/theme'
import Home from './pages/Home'
import Admin from './pages/Admin'

const queryClient = new QueryClient()

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
