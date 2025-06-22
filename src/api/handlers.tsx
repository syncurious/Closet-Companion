import apiCaller from './index';

export const User = {
  UPLOADS_IMAGE: '/api/user/upload',
  SEND_MSG_TO_CHAT_BOT: '/chat',
  DRESS_UPLOAD: '/dresses/upload',
  GET_DRESSES: '/dresses/',
  CREATE_OUTFIT_PLAN_BY_AI: "/recommendations/ai"
};


const UploadImage = async () => {
  return await apiCaller('get', User.UPLOADS_IMAGE);
};

const SendMessagetoChatBot = async (body: any) => {
  return await apiCaller('post', User.SEND_MSG_TO_CHAT_BOT, body, undefined, false);
};

const DressUpload = async (body: any) => {
  return await apiCaller('post', User.DRESS_UPLOAD, body, undefined, true);
};

const GetDresses = async (userId: string) => {
  return await apiCaller('get', User.GET_DRESSES + userId);
};

const CreateOutfitPlanByAi = async (body: any) => {
  return await apiCaller('post', User.CREATE_OUTFIT_PLAN_BY_AI, body);
};

export { UploadImage, SendMessagetoChatBot, DressUpload, GetDresses, CreateOutfitPlanByAi };