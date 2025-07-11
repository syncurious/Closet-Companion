import ImagePicker from 'react-native-image-crop-picker';

type PickerOptions = {
  width?: number;
  height?: number;
  cropping?: boolean;
  multiple?: boolean;
  includeBase64?: boolean;
  mediaType?: 'photo' | 'video' | 'any';
};

export const pickImageFromGallery = async (options?: PickerOptions) => {
  try {
    const result = await ImagePicker.openPicker({
      width: options?.width ?? 300,
      height: options?.height ?? 400,
      cropping: options?.cropping ?? true,
      multiple: options?.multiple ?? false,
      includeBase64: options?.includeBase64 ?? false,
      mediaType: options?.mediaType ?? 'photo',
    });
    return result;
  } catch (error) {
    console.error('Gallery picker error:', error);
    throw error;
  }
};
