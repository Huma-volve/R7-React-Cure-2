import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { CancelledNotification, CompletedNotification, EmptyNotification, UpcomingNotification } from '@/components/Doctor/icons';

interface NotificationsPage {
  id: string;
  type: 'upcoming' | 'completed' | 'cancelled';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  bgColor: string;
}

const NotificationsPage: React.FC = () => {
  const [hasNotifications, setHasNotifications] = useState(true);

  const notifications: { id: string, type: 'upcoming' | 'completed' | 'cancelled', title: string, description: string, time: string, icon: React.ReactNode, bgColor: string }[] = [
    {
      id: '1',
      type: 'upcoming',
      title: 'Upcoming Appointment',
      description: 'Reminder: You have an appointment with...',
      time: '1h',
      icon: <UpcomingNotification className='text-[#145DB8]' />,
      bgColor: 'bg-[#E8EFF8]'
    },
    {
      id: '2',
      type: 'completed',
      title: 'Appointment completed',
      description: 'You have successfully booked your appointment with Dr. Emily Walker.',
      time: '3h',
      icon: <CompletedNotification className="w-5 h-5 text-[#4CAF50] " />,
      bgColor: 'bg-[#EDF7EE]'
    },
    {
      id: '3',
      type: 'cancelled',
      title: 'Appointment Cancelled',
      description: 'You have successfully cancelled your appointment with Dr. David Patel.',
      time: '4h',
      icon: <CancelledNotification className="w-5 h-5 text-[#B33537]" />,
      bgColor: 'bg-[#FFEDED]'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10">
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
      <div className="max-w-2xl w-full  py-6 md:flex md:flex-col md:justify-center mx-auto md:px-4">
        {hasNotifications ? (
          <>
            {/* Today Section */}
            <h2 className="text-sm font-semibold text-blue-600 mb-4 ml-3">Today</h2>

            {/* Notifications List */}
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className=" rounded-xl px-6 py-2  cursor-pointer my-0 hover:bg-[#F5F6F7] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`${notification.bgColor} rounded-full p-[18px] shrink-0`}>
                      {notification.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-400 shrink-0">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle Button (for demo) */}
            <button
              onClick={() => setHasNotifications(false)}
              className="mt-8 w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear all notifications (demo)
            </button>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
            <div className="relative mb-6">
              {/* Bell Icon */}
              <EmptyNotification />
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8 mb-2">
              Nothing to display here!
            </h2>
            <p className="text-sm sm:text-base text-gray-500 text-center max-w-sm">
              We'll notify you once we have new notifications.
            </p>

            {/* Toggle Button (for demo) */}
            <button
              onClick={() => setHasNotifications(true)}
              className="mt-8 px-6 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Show notifications (demo)
            </button>
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