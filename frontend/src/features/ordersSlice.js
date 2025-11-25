import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  userProfile: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Springfield, IL 62701',
    memberSince: new Date().toLocaleDateString(),
  },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: `ORD-${Date.now()}`,
        items: action.payload.items,
        total: action.payload.total,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
        status: 'Confirmed',
        deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      };
      state.orders.unshift(newOrder);
    },
    updateUserProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
      }
    },
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter(o => o.id !== orderId);
    },
  },
});

export const { addOrder, updateUserProfile, updateOrderStatus, cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
