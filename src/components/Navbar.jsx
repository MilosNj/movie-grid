import {
  Button,
  Container,
  Flex,
  Text,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW='1140px' px={4}>
      <Flex
        h={16}
        alignItems='center'
        justifyContent='space-between'
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight='bold'
          textTransform='uppercase'
          textAlign='center'
          bgGradient='linear(to-r, green.400, blue.500)'
          bgClip='text'
        >
          Movie Grid 📽️
        </Text>
        <Button onClick={toggleColorMode} bg={useColorModeValue('gray.300')}>
          {colorMode === 'light' ? (
            <MdDarkMode fontSize={30} />
          ) : (
            <MdOutlineLightMode fontSize={30} />
          )}
        </Button>
      </Flex>
    </Container>
  )
}

export default Navbar
