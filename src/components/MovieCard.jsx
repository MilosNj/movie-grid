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
import { forwardRef } from 'react'
import { CiStar } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'

import { useMovieStore } from '../store/movie.store'

const MovieCard = forwardRef(({ movie, onSelect }, ref) => {
  const base_url = 'https://image.tmdb.org/t/p/'
  const file_size = 'w200'
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')
  const toast = useToast()
  const { toggleFavorite } = useMovieStore()

  const formatDate = (dateString) => {
    if (!dateString) return ''
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
        description: `Movie ${
          !movie.isFavorite ? 'added to' : 'removed from'
        } favorites`,
        status: 'success',
        duration: 2000
      })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleToggleFavorite(movie.id)
    }
  }

  return (
    <Box
      ref={ref}
      bg={bg}
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      tabIndex={0}
      transition='all 0.3s'
      _hover={{ transform: 'scale(1.1)', zIndex: 10, shadow: 'xl' }}
      onKeyDown={handleKeyDown}
      onFocus={onSelect}
    >
      <Image
        src={`${base_url}${file_size}${movie.poster_path}`}
        alt={movie.title || movie.original_title}
        h={60}
        w='full'
        objectFit='fill'
      />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2} isTruncated>
          {movie.title || movie.original_title}
        </Heading>
        <HStack justifyContent='space-between'>
          <Text color={textColor}>{formatDate(movie.release_date)}</Text>
          <Button
            onClick={() => handleToggleFavorite(movie.id)}
            variant='ghost'
            bg='transparent'
            _hover={{ bg: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
          >
            {movie.isFavorite ? (
              <FaStar fontSize={25} />
            ) : (
              <CiStar fontSize={25} />
            )}
          </Button>
        </HStack>
      </Box>
    </Box>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard
