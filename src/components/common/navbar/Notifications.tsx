import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface NotificationsType {
    id: number;
    title: string;
    message: string;
    image: string;
    time: string;
}

const NotificationsList: NotificationsType[] = [
    {
        id: 1,
        title: 'Upcoming Appointment',
        message: 'Your appointment with Dr. Smith is confirmed for tomorrow at 10 AM.',
        image: '/icons/time-quarter.svg',
        time: '1h'
    },
    {
        id: 2,
        title: 'Appointment completed',
        message: 'You have successfully booked your appointment with Dr. Emily Walker.',
        image: '/icons/solar_check-circle-linear.svg',
        time: '2h'
    },
    {
        id: 3,
        title: 'Appointment Cancelled',
        message: 'You have successfully cancelled your appointment with Dr. David Patel.',
        image: '/icons/calendar-remove.svg',
        time: '3h'
    }
];

const Notifications = () => {
    const [existNotification, setExistNotification] = useState(false);

    useEffect(() => {
        if (NotificationsList.length > 0) {
            setExistNotification(true);
        } else {
            setExistNotification(false);
        }
    }, [NotificationsList]);

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
                {existNotification ? (
                    <>
                        <DropdownMenuLabel className="bg-[#F5F6F7] font-medium text-center p-4">
                            <Link to="/notificationpage">Your Notification</Link>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {NotificationsList.map((notification) => (
                                <Link
                                    to={`/notifications/${notification.id}`}
                                    key={notification.id}
                                >
                                    <DropdownMenuItem className="mb-2 p- cursor-pointer hover:bg-gray-300! transition-colors justify-between">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={notification.image}
                                                alt={notification.title}
                                            />
                                            <div className="flex justify-center flex-col gap-1">
                                                <p
                                                    style={{ fontFamily: 'var(--font-secondary)' }}
                                                    className="sm:text-[16px] text-[14px]"
                                                >
                                                    {notification.title}
                                                </p>
                                                <p className="text-[14px] text-(--color-text) truncate max-w-[150px] sm:max-w-[250px]">
                                                    {notification.message}
                                                </p>
                                            </div>
                                        </div>
                                        <p>{notification.time}</p>
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
                        <p className="text-(--color-text) text-[14px]">
                            We’ll notify you once we have new notifications.
                        </p>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notifications;
