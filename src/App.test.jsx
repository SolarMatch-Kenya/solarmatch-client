import { render, screen } from '@testing-library/react'
import App from './App'

test('renders SolarMatch Web App', () => {
  render(<App />)
  expect(screen.getByText(/SolarMatch Web App/i)).toBeInTheDocument()
})


// for tests just run npm test for frontend test