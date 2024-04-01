// apiService
const baseURL = 'https://fb-be.onrender.com';

// apiService/foodItem

export const fetchFoodItems = async () => {
  try {
    const response = await fetch(`${baseURL}/foodItems`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching foodItems:", error);
    throw error; // Re-throwing the error is important for the caller to handle it
  }
};

// Add a foodItem
export const addFoodItem = async (foodItem) => {
    const response = await fetch(`${baseURL}/foodItems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodItem),
    });
    if (!response.ok) {
      throw new Error('Failed to add foodItem');
    }
    console.log(JSON.stringify(foodItem));
    return response.json();
  };
  
  // Update a foodItem
  export const updateFoodItem = async (id, foodItem) => {
    const response = await fetch(`${baseURL}/foodItems/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodItem),
    });
    if (!response.ok) {
      throw new Error('Failed to update foodItem');
    }
    return response.json();
  };
  
  // Delete a foodItem
  export const deleteFoodItem = async (id) => {
    const response = await fetch(`${baseURL}/foodItems/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete foodItem');
    }
    return true;
  };


// Fetch all suppliers from the API
export const fetchSuppliers = async () => {
  const response = await fetch(`${baseURL}/supplier`);
  if (!response.ok) throw new Error('Failed to fetch suppliers');
  return response.json();
};

// Create a new supplier
export const createSupplier = async (supplierData) => {
  const response = await fetch(`${baseURL}/supplier`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(supplierData),
  });
  if (!response.ok) throw new Error('Failed to create supplier');
  return response.json();
};

// Update a supplier by ID
export const updateSupplier = async (id, supplierData) => {
  const response = await fetch(`${baseURL}/supplier/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(supplierData),
  });
  if (!response.ok) throw new Error('Failed to update supplier');
  return response.json();
};

// Delete a supplier by ID
export const deleteSupplier = async (id) => {
  const response = await fetch(`${baseURL}/supplier/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete supplier');
  return true;
};
// Create a new ItemSupplier relationship
export const createItemSupplierRelation = async (relationData) => {
  const response = await fetch(`${baseURL}/itemSupplier`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(relationData),
  });
  if (!response.ok) throw new Error('Failed to create itemSupplier relationship');
  return response.json();
};

// Fetch all ItemSuppliers relationships
export const fetchItemSuppliers = async () => {
  const response = await fetch(`${baseURL}/itemSupplier`);
  if (!response.ok) throw new Error('Failed to fetch itemSuppliers');
  return response.json();
};
export const fetchItemSuppliersByItemId = async (itemId) => {
  const response = await fetch(`${baseURL}/itemSupplier/byItem/${itemId}`);
  if (!response.ok) throw new Error('Failed to fetch itemSuppliers for the foodItem');
  return response.json();
};

// Update an ItemSupplier relationship by item and supplier IDs
export const updateItemSupplierRelation = async (itemId, supplierId, relationData) => {
  const response = await fetch(`${baseURL}/itemSupplier/${itemId}/${supplierId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(relationData),
  });
  if (!response.ok) throw new Error('Failed to update itemSupplier relationship');
  return response.json();
};

// Delete an ItemSupplier relationship by item and supplier IDs
export const deleteItemSupplierRelation = async (itemId, supplierId) => {
  const response = await fetch(`${baseURL}/itemSupplier/${itemId}/${supplierId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete itemSupplier relationship');
  return true;
};

// Add to order history for a specific itemSupplier
export const addOrderHistory = async (itemSupplierId, quantity) => {
  const response = await fetch(`${baseURL}/itemSupplier/orderHistory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemSupplierId, quantity, addedAt: new Date() }),
  });
  if (!response.ok) {
    throw new Error('Failed to add to order history');
  }
  return response.json();
};

// Fetch itemSuppliers by itemId including order histories
export const fetchItemSuppliersWithOrderHistoryByItemId = async (itemId) => {
  const response = await fetch(`${baseURL}/itemSupplier/byItem/${itemId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch itemSuppliers with order history for the specified item');
  }
  return response.json();
};