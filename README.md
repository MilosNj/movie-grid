# React Movie Grid App

This React application displays a grid of movies that users can navigate using keyboard controls. It allows users to browse through a list of movies and add their favorites with a simple keystroke.

## Features

- Loads and displays a list of movies in a grid layout
- Keyboard navigation for moving around the grid
- Press Enter to add a movie to favorites
- Virtualized rendering for efficient performance with large lists

## Technologies Used

- React 18
- Chakra UI for styling and component library
- Zustand for state management
- React Window and React Virtualized Auto Sizer for efficient list rendering
- React Icons for UI icons
- Vite as the build tool and development server
- ESLint for code linting

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/MilosNj/movie-grid.git
   ```

2. Navigate to the project directory:
   ```
   cd movie-grid
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory.

## Usage

- Use arrow keys to navigate the movie grid
- Press Enter to add the selected movie to favorites
- Use the mouse to click on the Light/Dark mode button in the Nav Bar (if you do this you'll have to click on the grid again to use the keyboard to navigate (the edge of the grid, not a grid item))
- The best experience is if you set the resolution to 1280 x 720 (in Chrome Dev Tools)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
