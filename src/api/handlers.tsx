import apiCaller from './index';

export const endpoints = {
  UPLOADS_IMAGE: '/api/user/upload',
  SEND_MSG_TO_CHAT_BOT: '/chat',
};


export const UploadImage = async (body: any) => {
  return await apiCaller('post', endpoints.UPLOADS_IMAGE, body, undefined, true);
};

export const SendMessagetoChatBot = async (body: any) => {
  console.log(body)
  return await apiCaller('post', endpoints.SEND_MSG_TO_CHAT_BOT, body, undefined, true);
};
