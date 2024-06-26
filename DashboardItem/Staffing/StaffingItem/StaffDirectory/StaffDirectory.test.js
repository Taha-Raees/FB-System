import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StaffDirectory from './StaffDirectory';

const mockStaffMembers = [
  { id: 1, name: 'John Doe', position: 'Manager', contact: 'john.doe@example.com', salary: '50000', startDate: '2022-01-01', contractEnd: '2023-01-01' },
  { id: 2, name: 'Jane Smith', position: 'Chef', contact: 'jane.smith@example.com', salary: '40000', startDate: '2022-06-01', contractEnd: '2023-06-01' },
];

describe('StaffDirectory', () => {
  let setStaffMembers;

  beforeEach(() => {
    setStaffMembers = jest.fn();
    render(<StaffDirectory staffMembers={mockStaffMembers} setStaffMembers={setStaffMembers} onBack={jest.fn()} />);
  });

  test('renders Staff Directory title', () => {
    expect(screen.getByText(/staff directory/i)).toBeInTheDocument();
  });

  test('renders search input and add member button', () => {
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/add member/i)).toBeInTheDocument();
  });

  test('renders staff members', () => {
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
  });

  test('filters staff members based on search query', () => {
    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: 'john' } });
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.queryByText(/jane smith/i)).not.toBeInTheDocument();
  });

  test('opens modal to add new member', () => {
    fireEvent.click(screen.getByText(/add member/i));
    expect(screen.getByText(/add member/i)).toBeInTheDocument();
  });

  test('adds a new member', async () => {
    fireEvent.click(screen.getByText(/add member/i));
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Member' } });
    fireEvent.change(screen.getByLabelText(/position/i), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText(/contact/i), { target: { value: 'new.member@example.com' } });
    fireEvent.change(screen.getByLabelText(/salary/i), { target: { value: '60000' } });
    fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText(/contract end/i), { target: { value: '2024-01-01' } });
    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(setStaffMembers).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ name: 'New Member' }),
      ]));
    });
  });

  test('opens modal to edit member', () => {
    fireEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]);
    expect(screen.getByText(/edit member/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/john doe/i)).toBeInTheDocument();
  });

  test('edits an existing member', async () => {
    fireEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Johnathan Doe' } });
    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(setStaffMembers).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ id: 1, name: 'Johnathan Doe' }),
      ]));
    });
  });

  test('deletes a member', () => {
    fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    expect(setStaffMembers).toHaveBeenCalledWith(expect.arrayContaining([
      expect.not.objectContaining({ id: 1 }),
    ]));
  });
});
