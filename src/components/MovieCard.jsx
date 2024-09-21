import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { CiStar } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'

import { useMovieStore } from '../store/movie.store'

const MovieCard = ({ movie }) => {
  const base_url = 'https://image.tmdb.org/t/p/'
  const file_size = 'w500'
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')
  const toast = useToast()
  const { toggleFavorite } = useMovieStore()

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-')
    return `${day}.${month}.${year}.`
  }

  const handleToggleFavorite = (id) => {
    const { success, message } = toggleFavorite(id)

    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 2000
      })
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 2000
      })
    }
  }

  return (
    <Box
      bg={bg}
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'scale(1.1)', zIndex: 10, shadow: 'xl' }}
    >
      <Image
        src={`${base_url}${file_size}${movie.poster_path}`}
        alt={movie.title || movie.original_title}
        h={48}
        w='full'
        objectFit='cover'
      />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {movie.title || movie.original_title}
        </Heading>
        <HStack justifyContent='space-between'>
          <Text color={textColor} mb={4}>
            {formatDate(movie.release_date)}
          </Text>
          <Button onClick={() => handleToggleFavorite(movie.id)}>
            {movie.isFavorite ? (
              <FaStar fontSize={30} />
            ) : (
              <CiStar fontSize={30} />
            )}
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}

export default MovieCard
