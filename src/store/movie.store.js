import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useMovieStore = create(
  persist(
    (set, get) => ({
      movies: [],
      setMovies: (movies) => set({ movies }),
      fetchMovies: async () => {
        try {
          const res = await fetch('/movies.json')
          const data = await res.json()
          const favorites = get().favorites || {}

          const uniqueMovies = Array.from(
            new Map(
              data.map((movie) => {
                const uniqueKey = movie.original_title || movie.title
                return [uniqueKey, movie]
              })
            ).values()
          )

          const sortedMovies = uniqueMovies.sort((a, b) => {
            const imdbRatingA =
              a.ratings.find((rating) => rating.id === 'imdb')?.rating || 0
            const imdbRatingB =
              b.ratings.find((rating) => rating.id === 'imdb')?.rating || 0
            return imdbRatingB - imdbRatingA
          })

          const moviesWithFavorites = sortedMovies.map((movie) => ({
            ...movie,
            isFavorite: !!favorites[movie.id]
          }))

          set({ movies: moviesWithFavorites })
        } catch (error) {
          console.error('Error fetching movies:', error)
          return { success: false, message: error.message }
        }
      },
      favorites: {},
      toggleFavorite: (id) => {
        try {
          set((state) => {
            const updatedMovies = state.movies.map((movie) =>
              movie.id === id
                ? { ...movie, isFavorite: !movie.isFavorite }
                : movie
            )

            const updatedFavorites = { ...state.favorites }
            if (updatedFavorites[id]) {
              delete updatedFavorites[id]
            } else {
              updatedFavorites[id] = true
            }

            return {
              movies: updatedMovies,
              favorites: updatedFavorites
            }
          })

          return { success: true }
        } catch (error) {
          console.error('Error toggling favorite:', error)
          return { success: false, message: error.message }
        }
      }
    }),
    {
      name: 'movie-storage',
      partialize: (state) => ({ favorites: state.favorites })
    }
  )
)
