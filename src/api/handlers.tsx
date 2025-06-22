import apiCaller from './index';

export const User = {
  UPLOADS_IMAGE: '/api/user/upload',
  SEND_MSG_TO_CHAT_BOT: '/chat',
  DRESS_UPLOAD: '/wardrobe/upload',
  GET_DRESSES: '/wardrobe/',
};


const UploadImage = async () => {
  return await apiCaller('get', User.UPLOADS_IMAGE);
};

const SendMessagetoChatBot = async (body: any) => {
  return await apiCaller('post', User.SEND_MSG_TO_CHAT_BOT, body, undefined, true);
};

const DressUpload = async (body: any) => {
  return await apiCaller('post', User.DRESS_UPLOAD, body, undefined, true);
};

const GetDresses = async () => {
  return await apiCaller('get', User.GET_DRESSES);
};

export { UploadImage, SendMessagetoChatBot, DressUpload, GetDresses };