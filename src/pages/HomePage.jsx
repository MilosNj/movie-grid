import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'

import { useMovieStore } from '../store/movie.store'

const HomePage = () => {
  const { movies, fetchMovies } = useMovieStore()

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize='30'
          fontWeight='bold'
          bgGradient='linear(to-r, cyan.400, blue.500)'
          bgClip='text'
          textAlign='center'
        >
          Current Movies
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 6 }} spacing={2} w='full'>
          {/* {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))} */}
        </SimpleGrid>
        {movies.length === 0 && (
          <Text
            fontSize='xl'
            textAlign='center'
            fontWeight='bold'
            color='gray.500'
          >
            No movies found
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage
