# Quiz Challenge App

A modern, responsive quiz application built with React and Vite that tests your knowledge with questions from the Open Trivia Database.

## Features

### Core Features
- **Interactive Quiz Interface**: Clean, responsive design that works on desktop and mobile
- **Multiple Choice Questions**: 5 questions per quiz with 4 options each
- **Progress Tracking**: Visual progress bar and question counter
- **Score Calculation**: Real-time scoring with percentage display
- **Results Review**: Detailed review of all questions with correct/incorrect answers
- **Navigation**: Previous/Next buttons for easy question navigation

### Bonus Features
- **Timer**: 30-second countdown per question with auto-advance
- **Difficulty Levels**: Easy, Medium, and Hard question difficulties
- **High Score Tracking**: Persistent high score storage using localStorage
- **Error Handling**: Comprehensive error handling for API failures and edge cases
- **Responsive Design**: Mobile-first design with smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation, and focus states
- **Animations**: Subtle hover effects and smooth transitions

## Technical Implementation

### Architecture
- **React 19**: Latest React with functional components and hooks
- **React Router**: Client-side routing for navigation
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **Open Trivia DB API**: External API for quiz questions

### State Management
- `useState` for local component state
- `useEffect` for side effects and API calls
- React Router for navigation state
- localStorage for persistent high scores

### Component Structure
```
src/
├── components/
│   ├── ProgressBar.jsx    # Progress indicator component
│   └── Question.jsx       # Question display component
├── pages/
│   ├── Quiz.jsx          # Main quiz interface
│   └── Results.jsx       # Results and review page
├── utils/
│   └── helpers.js        # Utility functions
└── App.jsx               # Main app with routing
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Start Quiz**: Navigate to the home page to begin
2. **Select Difficulty**: Choose from Easy, Medium, or Hard (if API fails)
3. **Answer Questions**: Click on your chosen answer for each question
4. **Navigate**: Use Previous/Next buttons or wait for timer to auto-advance
5. **View Results**: See your score and review all questions
6. **Retry**: Click "Take Another Quiz" to start over

## API Integration

The app uses the Open Trivia Database API:
- **Endpoint**: `https://opentdb.com/api.php`
- **Parameters**: 
  - `amount=5` (number of questions)
  - `difficulty=easy|medium|hard`
  - `type=multiple` (multiple choice)

## Error Handling

The app handles various error scenarios:
- Network connectivity issues
- API rate limiting
- Invalid responses
- Empty question sets
- Browser compatibility

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading of components
- Efficient re-renders with proper dependency arrays
- Optimized API calls with error boundaries
- Responsive images and assets

## Accessibility Features

- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- High contrast color schemes
- Semantic HTML structure

## Future Enhancements

- User authentication and profiles
- Question categories selection
- Custom quiz creation
- Social sharing of scores
- Offline mode with cached questions
- Multiplayer quiz modes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source.

## Contact

For questions or support.

- [LinkedIn: Vikram Aditya](https://www.linkedin.com/in/vikramaditya04/)