import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import MovieCard from '../components/MovieCard'
import { useMovieStore } from '../store/movie.store'

const HomePage = () => {
  const { movies, fetchMovies } = useMovieStore()
  const [focusedIndex, setFocusedIndex] = useState(0)
  const movieRefs = useRef([])

  const handleKeyDown = (e) => {
    let newIndex = focusedIndex
    const columns = 6

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (focusedIndex + 1) % movies.length
        break
      case 'ArrowLeft':
        newIndex = (focusedIndex - 1 + movies.length) % movies.length
        break
      case 'ArrowDown':
        newIndex = (focusedIndex + columns) % movies.length
        break
      case 'ArrowUp':
        newIndex = (focusedIndex - columns + movies.length) % movies.length
        break
      default:
        return
    }

    setFocusedIndex(newIndex)
    e.preventDefault()
  }

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  useEffect(() => {
    if (movieRefs.current[focusedIndex]) movieRefs.current[focusedIndex].focus()
  }, [focusedIndex])

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
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 6 }}
          spacing={2}
          w='full'
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={() => setFocusedIndex(index)}
              isSelected={focusedIndex === index}
              ref={(el) => (movieRefs.current[index] = el)}
            />
          ))}
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
