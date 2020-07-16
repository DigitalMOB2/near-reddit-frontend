import {notification} from 'antd';

export function showSuccessNotification(message: string, description: string) {
    notification.success({
        message,
        description
    });
}
