import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAsRead } from '@/store/notificationsSlice';
import type { RootState, AppDispatch } from '@/store/Store';
import { CancelledNotification, CompletedNotification, UpcomingNotification } from '@/components/Doctor/icons';

const Notifications = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { notifications, loading } = useSelector((state: RootState) => state.notifications);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const handleNotificationClick = (notificationId: number, isRead: boolean) => {
        if (!isRead) {
            dispatch(markAsRead(notificationId));
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'upcoming':
            case 'upcoming appointment':
                return <UpcomingNotification className='text-[#145DB8]' />;
            case 'completed':
            case 'appointment completed':
                return <CompletedNotification className="w-5 h-5 text-[#4CAF50]" />;
            case 'cancelled':
            case 'appointment cancelled':
                return <CancelledNotification className="w-5 h-5 text-[#B33537]" />;
            default:
                return <UpcomingNotification className='text-[#145DB8]' />;
        }
    };

    const getNotificationBgColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'upcoming':
            case 'upcoming appointment':
                return 'bg-[#E8EFF8]';
            case 'completed':
            case 'appointment completed':
                return 'bg-[#EDF7EE]';
            case 'cancelled':
            case 'appointment cancelled':
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-12 cursor-pointer bg-[#F5F6F7] border-0 shadow-none outline-none
                        focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none
                        hover:bg-[#E9EAEB] transition-colors duration-200"
                >
                    <img src="/icons/Notifications.svg" alt="" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-75 sm:w-100 bg-white relative z-9999 rounded-xl border-0 mt-2 mr-3 p-0"
                align="center"
                side="bottom"
                sideOffset={10}
            >
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-500 text-sm">Loading...</p>
                    </div>
                ) : notifications.length > 0 ? (
                    <>
                        <DropdownMenuLabel className="bg-[#F5F6F7] font-medium text-center p-4">
                            <Link to="/notificationpage">Your Notification</Link>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {notifications.map((notification) => (
                                <Link
                                    to={`/notifications/${notification.Id}`}
                                    key={notification.Id}
                                    onClick={() => handleNotificationClick(notification.Id, notification.IsRead)}
                                >
                                    <DropdownMenuItem 
                                        className={`mb-2 p-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                                            !notification.IsRead ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-start gap-3 w-full">
                                            {/* Icon */}
                                            <div className={`${getNotificationBgColor(notification.Types)} rounded-full p-3 shrink-0`}>
                                                {getNotificationIcon(notification.Types)}
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <p
                                                        style={{ fontFamily: 'var(--font-secondary)' }}
                                                        className={`sm:text-[16px] text-[14px] ${
                                                            !notification.IsRead ? 'font-bold' : 'font-medium'
                                                        }`}
                                                    >
                                                        {notification.Types}
                                                    </p>
                                                    <span className="text-xs text-gray-400 shrink-0">
                                                        {getTimeAgo(notification.CreatedAt)}
                                                    </span>
                                                </div>
                                                <p className="text-[14px] text-gray-500 truncate max-w-[150px] sm:max-w-[250px] mt-1">
                                                    {notification.Content}
                                                </p>
                                                {!notification.IsRead && (
                                                    <span className="inline-block mt-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                                                )}
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                        </DropdownMenuGroup>
                    </>
                ) : (
                    <div className="flex items-center justify-center p-5 flex-col">
                        <img
                            src="/image/Notifications-Empty.png"
                            alt="notifications Empty"
                            className="mb-3"
                        />
                        <p
                            className="text-2xl text-black mb-1"
                            style={{ fontFamily: 'var(--font-secondary)' }}
                        >
                            Nothing to display here!
                        </p>
                        <p className="text-gray-500 text-[14px]">
                            We'll notify you once we have new notifications.
                        </p>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notifications;