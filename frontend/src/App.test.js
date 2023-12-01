import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Shopping List/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders total items', () => {
  render(<App />);
  const totalElement = screen.getByText(/Total items :/i);
  expect(totalElement).toBeInTheDocument();
});

test('renders input field', () => {
  render(<App />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

test('renders list of items', () => {
  render(<App />);
  const listElement = screen.getByRole('list');
  expect(listElement).toBeInTheDocument();
});

test('renders notification', () => {
  render(<App />);
  const notificationElement = screen.queryByText(/Please enter an item!/i);
  expect(notificationElement).toBeNull();
});

test('renders add button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /Add/i });
  expect(buttonElement).toBeInTheDocument();
});