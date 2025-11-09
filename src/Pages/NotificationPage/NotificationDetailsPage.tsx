import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, Calendar, Clock } from 'lucide-react';
import { CancelledNotification, CompletedNotification, UpcomingNotification } from '@/components/Doctor/icons';
import { fetchNotifications, markAsRead } from '@/store/notificationsSlice';
import type { RootState, AppDispatch } from '@/store/Store';

const NotificationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, loading } = useSelector((state: RootState) => state.notifications);

  const notification = notifications.find(n => n.Id === Number(id));

  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, notifications.length]);

  useEffect(() => {
    if (notification && !notification.IsRead) {
      dispatch(markAsRead(notification.Id));
    }
  }, [notification, dispatch]);

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'upcoming':
        return <UpcomingNotification className='text-[#145DB8] w-6 h-6' />;
      case 'completed':
        return <CompletedNotification className="w-6 h-6 text-[#4CAF50]" />;
      case 'cancelled':
        return <CancelledNotification className="w-6 h-6 text-[#B33537]" />;
      default:
        return <UpcomingNotification className='text-[#145DB8] w-6 h-6' />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'upcoming':
        return 'bg-[#E8EFF8]';
      case 'completed':
        return 'bg-[#EDF7EE]';
      case 'cancelled':
        return 'bg-[#FFEDED]';
      default:
        return 'bg-[#E8EFF8]';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
            <button 
              onClick={() => navigate('/notifications')}
              className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold flex-1 text-center mr-10">Notification Details</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <p className="text-gray-500">Notification not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('/notifications')}
            className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold flex-1 text-center mr-10">Notification Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Icon and Type */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className={`${getNotificationBgColor(notification.Types)} rounded-full p-4`}>
              {getNotificationIcon(notification.Types)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{notification.Types}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(notification.CreatedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(notification.CreatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {notification.Content}
            </p>
          </div>

          {/* Additional Info (if needed) */}
          {notification.AppointmentId && (
            <>
              <div className="border-t border-gray-200 my-6"></div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Appointment Information</h3>
                <p className="text-sm text-gray-600">Appointment ID: #{notification.AppointmentId}</p>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons (optional) */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/notifications')}
            className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Notifications
          </button>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <div className="w-32 h-1 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
};

export default NotificationDetailsPage;