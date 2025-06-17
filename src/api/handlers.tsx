import apiCaller from './index';

const User = {
  UPLOADS_IMAGE: '/api/user/upload',
};


export const UploadImage = async (body: any) => {
  return await apiCaller('post', User.UPLOADS_IMAGE, body, undefined, true);
};
