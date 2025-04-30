import Toast from 'react-native-toast-message';

/**
 * Show a toast message
 * @param type 'success' | 'error' | 'info'
 * @param title Title text
 * @param message Optional message/body
 */
export const showNotification = (
  type: 'success' | 'error' | 'info',
  title: string,
  message?: string,
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 20,
  });
};
