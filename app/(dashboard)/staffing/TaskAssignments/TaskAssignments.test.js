import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskAssignments from './TaskAssignments.test.js';

const mockStaffMembers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

const mockTasks = [
  { id: 1, name: 'Task 1', date: '2023-01-01', startTime: '09:00', endTime: '11:00', assignedTo: 1 },
  { id: 2, name: 'Task 2', date: '2023-01-02', startTime: '10:00', endTime: '12:00', assignedTo: 2 },
];

let mockSetTasks;

beforeEach(() => {
  mockSetTasks = jest.fn();
  render(<TaskAssignments staffMembers={mockStaffMembers} tasks={mockTasks} setTasks={mockSetTasks} onBack={jest.fn()} />);
});

test('renders Task Assignments title', () => {
  expect(screen.getByText('Task Assignments')).toBeInTheDocument();
});

test('renders search input and add task button', () => {
  expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  expect(screen.getByText(/add task/i)).toBeInTheDocument();
});

test('renders tasks', () => {
  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();
});

test('filters tasks based on search query', () => {
  fireEvent.change(screen.getByLabelText(/search/i), { target: { value: 'Task 1' } });
  expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  expect(screen.getByText('Task 1')).toBeInTheDocument();
});

test('opens modal to add new task', () => {
  fireEvent.click(screen.getByText(/add task/i));
  expect(screen.getByText(/add task/i)).toBeInTheDocument();
});

test('adds a new task', async () => {
  fireEvent.click(screen.getByText(/add task/i));
  fireEvent.change(screen.getByLabelText('Task'), { target: { value: 'Task 3' } });
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2023-01-03' } });
  fireEvent.change(screen.getByLabelText('Start Time'), { target: { value: '08:00' } });
  fireEvent.change(screen.getByLabelText('End Time'), { target: { value: '10:00' } });
  fireEvent.change(screen.getByLabelText('Assign To'), { target: { value: 1 } });
  fireEvent.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(mockSetTasks).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ name: 'Task 3' }),
    ]));
  });
});

test('shows validation errors when required fields are missing', async () => {
  fireEvent.click(screen.getByText(/add task/i));
  fireEvent.change(screen.getByLabelText('Task'), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText('Start Time'), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText('End Time'), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText('Assign To'), { target: { value: '' } });
  fireEvent.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(screen.getByText('Task is required')).toBeInTheDocument();
    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.getByText('Start Time is required')).toBeInTheDocument();
    expect(screen.getByText('End Time is required')).toBeInTheDocument();
    expect(screen.getByText('Assign To is required')).toBeInTheDocument();
  });

  expect(mockSetTasks).not.toHaveBeenCalled();
});

test('opens modal to edit task', () => {
  fireEvent.click(screen.getAllByLabelText(/edit/i)[0]);
  expect(screen.getByText(/edit task/i)).toBeInTheDocument();
  expect(screen.getByLabelText('Task')).toHaveValue('Task 1');
});

test('edits an existing task', async () => {
  fireEvent.click(screen.getAllByLabelText(/edit/i)[0]);
  fireEvent.change(screen.getByLabelText('Task'), { target: { value: 'Updated Task 1' } });
  fireEvent.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(mockSetTasks).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ name: 'Updated Task 1' }),
    ]));
  });
});

test('deletes a task', () => {
  fireEvent.click(screen.getAllByLabelText(/delete/i)[0]);
  expect(mockSetTasks).toHaveBeenCalledWith(expect.arrayContaining([
    expect.not.objectContaining({ id: 1 }),
  ]));
});
