// notificationsSlice.tsx
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import * as signalR from '@microsoft/signalr';

const API_BASE_URL = 'https://cure-doctor-booking.runasp.net';

// Types
export interface Notification {
  createdAt: string;
  types: string;
  id: number;
  content: string;
  AppointmentId: any;
  Types: string;
  isRead: boolean;
}

interface NotificationsState {
  notifications: Notification[];   // <-- تأكد إنها array دائماً
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
};

// SignalR connection holder
let connection: signalR.HubConnection | null = null;

// Async Thunks
export const fetchNotifications = createAsyncThunk<
  Notification[], 
  void,          
  { rejectValue: string } 
>(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('accessToken');
      if (!token) throw new Error('No access token found');

      const response = await fetch(`${API_BASE_URL}/api/Customer/Notifications/GetNotificationsByUser`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const text = await response.text();
        return rejectWithValue(`Error ${response.status}: ${text}`);
      }

      const data = await response.json();

      console.log(data.data)
      // Ensure the returned value is an array
      return Array.isArray(data) ? (data as Notification[]) : (data.data ?? []) as Notification[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch notifications');
    }
  }
);

export const markAsRead = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      const token = Cookies.get('accessToken');
      if (!token) throw new Error('No access token found');

      const response = await fetch(`${API_BASE_URL}/api/Customer/Notifications/MarkAsRead/${notificationId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }), // اختياري حسب الـ API
      });

      if (!response.ok) {
        const text = await response.text();
        return rejectWithValue(`Error ${response.status}: ${text}`);
      }

      return notificationId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark as read');
    }
  }
);

// Thunk to init SignalR Hub
export const initNotificationHub = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>(
  'notifications/initHub',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = Cookies.get('accessToken');
      if (!token) throw new Error('No token found');

      connection = new signalR.HubConnectionBuilder()
        .withUrl('https://cure-doctor-booking.runasp.net/notificationHub', {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      await connection.start();
      console.log(' Connected to SignalR Hub');

      connection.on('ReceiveNotification', (newNotification: Notification) => {
        console.log('New Notification:', newNotification);
        dispatch(addNotification(newNotification));
      });

      return true;
    } catch (error: any) {
      console.error('SignalR Connection Error:', error);
      return rejectWithValue(error.message || 'Failed to connect to SignalR');
    }
  }
);

// Slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    // <-- هنا ضفنا addNotification مع تايب صارم
    addNotification: (state, action: PayloadAction<Notification>) => {
      // تأكد أن notifications موجودة كـ array قبل unshift
      if (!Array.isArray(state.notifications)) state.notifications = [];
      // استخدم unshift (مسموح مع Redux Toolkit / Immer) أو أنشئ مصفوفة جديدة:
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    // fetchNotifications
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.loading = false;
        state.notifications = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        // action.payload ممكن يكون string (rejectWithValue) أو undefined
        state.error = (action.payload as string) ?? action.error?.message ?? 'Failed to fetch notifications';
      });

    // markAsRead
    builder
      .addCase(markAsRead.fulfilled, (state, action: PayloadAction<number>) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification) {
          notification.isRead = true;
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.error = (action.payload as string) ?? action.error?.message ?? 'Failed to mark as read';
      });

    // initNotificationHub (اختياري التعامل مع حالات pending/rejected)
    builder
      .addCase(initNotificationHub.rejected, (state, action) => {
        state.error = (action.payload as string) ?? action.error?.message ?? 'SignalR init failed';
      });
  },
});

export const { clearError, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
