import { Box, useColorModeValue } from '@chakra-ui/react'

import Header from './components/Header'

const App = () => (
  <Box minHeight='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
    <Header />
  </Box>
)

export default App
