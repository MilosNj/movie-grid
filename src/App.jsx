import { Box, useColorModeValue } from '@chakra-ui/react'

import Header from './components/Header'
import HomePage from './pages/HomePage'

const App = () => (
  <Box minHeight='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
    <Header />
    <HomePage />
  </Box>
)

export default App
