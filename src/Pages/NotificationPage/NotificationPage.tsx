import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // إضافة useNavigate
import { ChevronLeft } from 'lucide-react';
import { CancelledNotification, CompletedNotification, EmptyNotification, UpcomingNotification } from '@/components/Doctor/icons';
import { fetchNotifications, markAsRead } from '@/store/notificationsSlice';
import type { RootState, AppDispatch } from '@/store/Store';
<<<<<<< HEAD
// import SuccessBookingPopup from '@/components/Doctor/SuccessBookingPopup';
=======
>>>>>>> 66fba782a7a57737730a4c5b96eae1d48272119a

const NotificationsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // إضافة navigate
  const { notifications, loading } = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleNotificationClick = (notificationId: number, isRead: boolean) => {
    if (!isRead) {
      dispatch(markAsRead(notificationId));
    }
    // الانتقال لصفحة التفاصيل
    navigate(`/notifications/${notificationId}`);
  };

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'upcoming':
        return <UpcomingNotification className='text-[#145DB8]' />;
      case 'completed':
        return <CompletedNotification className="w-5 h-5 text-[#4CAF50]" />;
      case 'cancelled':
        return <CancelledNotification className="w-5 h-5 text-[#B33537]" />;
      default:
        return <UpcomingNotification className='text-[#145DB8]' />;
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

  const getTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => window.history.back()}
            className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold flex-1 text-center mr-10">Notifications</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl w-full py-6 md:flex md:flex-col md:justify-center mx-auto md:px-4">
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading notifications...</p>
          </div>
        ) : notifications.length > 0 ? (
          <>
            {/* Today Section */}
            <h2 className="text-sm font-semibold text-blue-600 mb-4 ml-3">Today</h2>

            {/* Notifications List */}
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.Id}
                  onClick={() => handleNotificationClick(notification.Id, notification.IsRead)}
                  className={`rounded-xl px-6 py-2 cursor-pointer my-0 hover:bg-[#F5F6F7] transition-colors ${!notification.IsRead ? 'bg-blue-50' : ''
                    }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`${getNotificationBgColor(notification.Types)} rounded-full p-[18px] shrink-0`}>
                      {getNotificationIcon(notification.Types)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-semibold text-gray-900 text-sm sm:text-base ${!notification.IsRead ? 'font-bold' : ''
                          }`}>
                          {notification.Types}
                        </h3>
                        <span className="text-xs text-gray-400 shrink-0">
                          {getTimeAgo(notification.CreatedAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {notification.Content}
                      </p>
                      {!notification.IsRead && (
                        <span className="inline-block mt-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
            <div className="relative mb-6">
              <EmptyNotification />
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8 mb-2">
              Nothing to display here!
            </h2>
            <p className="text-sm sm:text-base text-gray-500 text-center max-w-sm">
              We'll notify you once we have new notifications.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <div className="w-32 h-1 bg-gray-800 rounded-full"></div>
      </div>

















    </div>
  );
};

export default NotificationsPage;