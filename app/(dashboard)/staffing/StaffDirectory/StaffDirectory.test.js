import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StaffDirectory from './StaffDirectory';

const mockStaffMembers = [
  { id: 1, name: 'John Doe', position: 'Manager', contact: 'john.doe@example.com', salary: '50000', startDate: '2022-01-01', contractEnd: '2023-01-01' },
  { id: 2, name: 'Jane Smith', position: 'Chef', contact: 'jane.smith@example.com', salary: '40000', startDate: '2022-06-01', contractEnd: '2023-06-01' },
];

let mockSetStaffMembers;

beforeEach(() => {
  mockSetStaffMembers = jest.fn();
  render(<StaffDirectory staffMembers={mockStaffMembers} setStaffMembers={mockSetStaffMembers} onBack={jest.fn()} />);
});

test('renders Staff Directory title', () => {
  expect(screen.getByText('Staff Directory')).toBeInTheDocument();
});

test('renders search input and add member button', () => {
  expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  expect(screen.getByText(/add member/i)).toBeInTheDocument();
});

test('renders staff members', () => {
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
});

test('filters staff members based on search query', () => {
  fireEvent.change(screen.getByLabelText(/search/i), { target: { value: 'Jane' } });
  expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
});

test('opens modal to add new member', () => {
  fireEvent.click(screen.getByText(/add member/i));
  expect(screen.getByText(/add member/i)).toBeInTheDocument();
});

test('adds a new member', async () => {
  fireEvent.click(screen.getByText(/add member/i));
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice Johnson' } });
  fireEvent.change(screen.getByLabelText(/position/i), { target: { value: 'Waitress' } });
  fireEvent.change(screen.getByLabelText(/contact/i), { target: { value: 'alice.johnson@example.com' } });
  fireEvent.change(screen.getByLabelText(/salary/i), { target: { value: '30000' } });
  fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: '2023-01-01' } });
  fireEvent.change(screen.getByLabelText(/contract end/i), { target: { value: '2024-01-01' } });
  fireEvent.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(mockSetStaffMembers).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ name: 'Alice Johnson' }),
    ]));
  });
});

test('shows validation errors when required fields are missing', async () => {
  fireEvent.click(screen.getByText(/add member/i));
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/position/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/contact/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/salary/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/contract end/i), { target: { value: '' } });
  fireEvent.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Position is required')).toBeInTheDocument();
    expect(screen.getByText('Contact is required')).toBeInTheDocument();
    expect(screen.getByText('Salary is required')).toBeInTheDocument();
    expect(screen.getByText('Start Date is required')).toBeInTheDocument();
    expect(screen.getByText('Contract End is required')).toBeInTheDocument();
  });

  expect(mockSetStaffMembers).not.toHaveBeenCalled();
});

test('opens modal to edit member', () => {
  fireEvent.click(screen.getAllByLabelText(/edit/i)[0]);
  expect(screen.getByText(/edit member/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
});

test('edits an existing member', async () => {
  fireEvent.click(screen.getAllByLabelText(/edit/i)[0]);
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Johnathan Doe' } });
  fireEvent.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(mockSetStaffMembers).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ name: 'Johnathan Doe' }),
    ]));
  });
});

test('deletes a member', () => {
  fireEvent.click(screen.getAllByLabelText(/delete/i)[0]);
  expect(mockSetStaffMembers).toHaveBeenCalledWith(expect.arrayContaining([
    expect.not.objectContaining({ id: 1 }),
  ]));
});
