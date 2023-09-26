import { render, screen } from '@testing-library/react';
import ScrablanagramsApp from './App';

test('renders learn react link', () => {
  render(<ScrablanagramsApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
