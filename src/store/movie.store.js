import { create } from 'zustand'

export const useMovieStore = create((set) => ({
  movies: [],
  setMovies: (movies) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {}

    const uniqueMovies = Array.from(
      new Map(
        movies.map((movie) => {
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
  },
  fetchMovies: async () => {
    try {
      const res = await fetch('../assets/movies.json')
      const data = await res.json()
      set({ movies: data })
    } catch (error) {
      console.error('Error fetching the movie data:', error)
    }
  },
  toggleFavorite: (id) =>
    set((state) => {
      const updatedMovies = state.movies.map((movie) =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
      )

      const favorites = JSON.parse(localStorage.getItem('favorites')) || {}
      updatedMovies.forEach((movie) => {
        if (movie.isFavorite) {
          favorites[movie.id] = true
        } else {
          delete favorites[movie.id]
        }
      })
      localStorage.setItem('favorites', JSON.stringify(favorites))

      return { movies: updatedMovies }
    })
}))
