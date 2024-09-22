import { Box, Container, Text, VStack } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeGrid as Grid } from 'react-window'
import MovieCard from '../components/MovieCard'
import { useMovieStore } from '../store/movie.store'

const CELL_WIDTH = 200
const CELL_HEIGHT = 350

const HomePage = () => {
  const { movies, fetchMovies, toggleFavorite } = useMovieStore()
  const [focusedIndex, setFocusedIndex] = useState(0)
  const gridRef = useRef(null)
  const outerRef = useRef(null)

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  useEffect(() => {
    if (outerRef.current) {
      outerRef.current.focus()
    }
  }, [])

  const handleKeyDown = useCallback(
    (e) => {
      if (!gridRef.current) return

      const columns = Math.floor(gridRef.current.props.width / CELL_WIDTH)
      let newIndex = focusedIndex

      switch (e.key) {
        case 'ArrowRight':
          newIndex = Math.min(focusedIndex + 1, movies.length - 1)
          break
        case 'ArrowLeft':
          newIndex = Math.max(focusedIndex - 1, 0)
          break
        case 'ArrowDown':
          newIndex = Math.min(focusedIndex + columns, movies.length - 1)
          break
        case 'ArrowUp':
          newIndex = Math.max(focusedIndex - columns, 0)
          break
        case 'Enter':
          if (focusedIndex >= 0 && focusedIndex < movies.length) {
            toggleFavorite(movies[focusedIndex].id)
          }
          return
        default:
          return
      }

      if (newIndex !== focusedIndex) {
        setFocusedIndex(newIndex)
        gridRef.current.scrollToItem({
          rowIndex: Math.floor(newIndex / columns),
          columnIndex: newIndex % columns
        })
      }
      e.preventDefault()
    },
    [focusedIndex, movies, toggleFavorite]
  )

  const Cell = useCallback(
    ({ columnIndex, rowIndex, style }) => {
      const width = gridRef.current ? gridRef.current.props.width : 0
      const columns = Math.floor(width / CELL_WIDTH)
      const index = rowIndex * columns + columnIndex
      const movie = movies[index]

      if (!movie) return null

      return (
        <Box style={style} padding={2}>
          <MovieCard
            movie={movie}
            isSelected={focusedIndex === index}
            onToggleFavorite={() => toggleFavorite(movie.id)}
            onFocus={() => setFocusedIndex(index)}
          />
        </Box>
      )
    },
    [movies, focusedIndex, toggleFavorite]
  )

  return (
    <Container maxW='container.xl' height='calc(100vh - 100px)'>
      <VStack spacing={8} height='100%'>
        <Text
          fontSize='30'
          fontWeight='bold'
          bgGradient='linear(to-r, cyan.400, blue.500)'
          bgClip='text'
          textAlign='center'
        >
          Current Movies
        </Text>
        <Box
          ref={outerRef}
          flex={1}
          width='100%'
          onKeyDown={handleKeyDown}
          tabIndex={0}
          outline='none'
          paddingLeft={6}
        >
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                ref={gridRef}
                columnCount={Math.floor(width / CELL_WIDTH)}
                columnWidth={CELL_WIDTH}
                height={height}
                rowCount={Math.ceil(
                  movies.length / Math.floor(width / CELL_WIDTH)
                )}
                rowHeight={CELL_HEIGHT}
                width={width}
                outerRef={outerRef}
              >
                {Cell}
              </Grid>
            )}
          </AutoSizer>
        </Box>
      </VStack>
    </Container>
  )
}

export default HomePage
