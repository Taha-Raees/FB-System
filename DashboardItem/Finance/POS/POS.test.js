import { fireEvent, render, screen } from '@testing-library/react';
import POS from './POS'; // Adjust import path according to your project structure

test('adds an item to the current order', () => {
  render(<POS />);
  
  // Assume you have a button for adding an item in your component
  const addItemButton = screen.getByRole('button', { name: /add bratwurst/i });
  fireEvent.click(addItemButton);

  // Assume you display the item name in the order list
  const itemName = screen.getByText(/bratwurst/i);
  expect(itemName).toBeInTheDocument();
});