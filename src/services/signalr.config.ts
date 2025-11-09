// config/signalr.config.ts

/**
 * SignalR Hub Configuration
 * 
 * IMPORTANT: Update the HUB_URL with the correct endpoint from your backend.
 * Common SignalR hub endpoints:
 * - /notificationHub
 * - /hubs/notifications
 * - /api/notifications/hub
 * - /signalr/notifications
 * 
 * Ask your backend team for the exact endpoint URL.
 */

export const SIGNALR_CONFIG = {
  // Base URL of your API
  BASE_URL: 'https://cure-doctor-booking.runasp.net',
  
  // SignalR Hub endpoint - UPDATE THIS!
  // Try these common patterns:
  HUB_ENDPOINTS: [
    '/notificationHub',           // Most common
    '/hubs/notifications',        // ASP.NET Core default pattern
    '/api/notifications/hub',     // API namespaced
    '/signalr/notifications',     // Alternative pattern
    '/hub/notifications',         // Another common pattern
  ],
  
  // Current hub endpoint to use (change this to match your backend)
  CURRENT_HUB: '/notificationHub', // ⚠️ UPDATE THIS BASED ON YOUR BACKEND
  
  // SignalR event names (methods that the server will call)
  EVENTS: {
    RECEIVE_NOTIFICATION: 'ReceiveNotification',
    NOTIFICATION_UPDATED: 'NotificationUpdated',
    NOTIFICATION_DELETED: 'NotificationDeleted',
  },
  
  // Retry configuration
  RETRY_DELAYS: [0, 2000, 10000, 30000], // 0s, 2s, 10s, 30s
  
  // Logging level
  LOG_LEVEL: 'Information', // 'Trace' | 'Debug' | 'Information' | 'Warning' | 'Error' | 'Critical' | 'None'
  
  // Enable/disable SignalR (useful for debugging)
  ENABLED: true,
};

/**
 * Get the full SignalR Hub URL
 */
export const getHubUrl = () => {
  return `${SIGNALR_CONFIG.BASE_URL}${SIGNALR_CONFIG.CURRENT_HUB}`;
};

/**
 * How to find your SignalR endpoint:
 * 
 * 1. Check your backend documentation
 * 2. Look for [HubName] attribute in your C# Hub class
 * 3. Check your backend's Startup.cs or Program.cs for:
 *    app.MapHub<NotificationHub>("/your-endpoint-here");
 * 4. Test endpoints manually:
 *    GET https://your-api.com/your-endpoint/negotiate
 *    Should return SignalR negotiation response
 */