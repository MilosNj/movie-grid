import { Box, useColorModeValue } from '@chakra-ui/react'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

const App = () => (
  <Box minHeight='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
    <Navbar />
    <HomePage />
  </Box>
)

export default App
