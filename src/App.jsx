import { Box, useColorModeValue } from '@chakra-ui/react'

const App = () => (
  <Box minHeight={'100vh'} bg={useColorModeValue('gray.100', 'gray.900')}>
    {/* <Navbar /> */}
  </Box>
)

export default App
