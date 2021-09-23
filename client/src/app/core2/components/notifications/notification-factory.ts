import { Notification } from "./notification";
import { NotificationOptions } from "./notification-options";

export class NotificationFactory {
    generateNotification(message: string, options: NotificationOptions): Notification {
        return new Notification(message, options)
    }
}
