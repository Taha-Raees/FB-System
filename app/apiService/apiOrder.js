// Base URL for your API - adjust accordingly if your API is hosted
const BASE_URL = 'http://68.221.25.209:3001/orders';

// Function to fetch all orders
export const fetchOrders = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Function to fetch a single order by ID
export const fetchOrderById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching order ${id}:`, error);
        throw error;
    }
};

// Function to create a new order
export const createOrder = async (orderData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            throw new Error('Failed to create order');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Function to update an existing order
export const updateOrder = async (id, orderData) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            throw new Error('Failed to update order');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error updating order ${id}:`, error);
        throw error;
    }
};

// Function to delete an order
export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
        return true; // Return true on successful deletion
    } catch (error) {
        console.error(`Error deleting order ${id}:`, error);
        throw error;
    }
};
