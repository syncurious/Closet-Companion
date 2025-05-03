import {EditProfileIcon, userFilledIcon} from '@/assets';
import Button from '@/components/button';
import Container from '@/components/container';
import Header from '@/components/header';
import Heading from '@/components/heading';
import Input from '@/components/input';
import {getDataByKey, updateDataByKey} from '@/service/firestoreHelper';
import {S3Helper} from '@/service/aws';
import {Colors} from '@/utitlity/colors';
import {pickImageFromGallery} from '@/utitlity/imagePicker';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialPayload = {
  name: '',
  email: '',
  height: '',
  weight: '',
  age: '',
  gender: '',
  skinColor: '',
  profileImage: '',
};

const ProfileField = ({
  label,
  fieldKey,
  value,
  editable = true,
  type = 'default',
  onChange,
}: any) => (
  <View style={styles.inputGroup}>
    <Heading level={6} style={styles.inputLabel} children={label} />
    <Input
      label={label}
      disabled={!editable}
      type={type}
      variant="contained"
      color="subHeading"
      value={value}
      onChangeText={e => onChange(fieldKey, e)}
    />
  </View>
);

const Profile = ({route}: any) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [payload, setPayload] = useState(initialPayload);
  const [userId, setUserId] = useState<string>();
  const [profileImage, setProfileImage] = useState<any>(null);

  const handleFieldChange = (key: string, value: string) => {
    setPayload(prev => ({...prev, [key]: value}));
  };

  const handleUpdate = async () => {
    setIsEdit(!isEdit);
  };

  const selectPhoto = async () => {
    const image = await pickImageFromGallery();
    console.log(image?.path);
    setProfileImage(image);
  };

  const handleGet = async () => {
    const id = await AsyncStorage.getItem('userId');
    if (id) setUserId(id);
  };

  const handleUpdateProfile = async () => {
    const body = {...payload};
    if (profileImage) {
      try {
        const uploadedUrl = await S3Helper.uploadFileToS3(
          profileImage?.path,
          profileImage?.filename,
        );
        console.log('Uploaded file URL:', uploadedUrl);
        body.profileImage = uploadedUrl;
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
    try {
      const response = await updateDataByKey('users', userId ?? '', body);
      handleUpdate();
      console.log('Update Profile Response', response);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleGetProfile = async () => {
    if (userId) {
      const userDoc = await getDataByKey('users', userId);
      if (!userDoc?.success) {
        console.log({
          success: false,
          user: null,
          message: userDoc?.message,
        });
      }
      if (userDoc?.success) {
        setPayload((prev: any) => ({...prev, ...userDoc?.data}));
      }
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, [userId]);
  useEffect(() => {
    handleGet();
  }, []);

  return (
    <React.Fragment>
      <Header route={route} />
      <Container fullScreen scrollEnabled style={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <View>
              <View style={styles.imageWrapper}>
                {profileImage || payload?.profileImage ? (
                  <Image
                    source={{uri: profileImage?.path || payload?.profileImage}}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={userFilledIcon}
                    style={styles.profileImage}
                    resizeMode="cover"
                    tintColor="white"
                  />
                )}
              </View>
              <TouchableOpacity
                style={styles.editIcon}
                onPress={isEdit ? selectPhoto : () => {}}>
                <Image
                  source={EditProfileIcon}
                  style={styles.editIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Heading
              level={6}
              style={styles.heading}
              children={'Tap to change profile picture'}
            />
          </View>
          <View style={styles.formSection}>
            <ProfileField
              label="Full Name"
              fieldKey="name"
              value={payload.name}
              onChange={handleFieldChange}
              editable={isEdit}
            />
            <ProfileField
              label="Email"
              fieldKey="email"
              value={payload.email}
              editable={false}
              onChange={handleFieldChange}
            />
            <ProfileField
              label="Height (cm)"
              fieldKey="height"
              value={payload.height}
              type="numeric"
              onChange={handleFieldChange}
              editable={isEdit}
            />
            <ProfileField
              label="Weight (kg)"
              fieldKey="weight"
              value={payload.weight}
              type="numeric"
              onChange={handleFieldChange}
              editable={isEdit}
            />
            <ProfileField
              label="Age"
              fieldKey="age"
              value={payload.age}
              type="numeric"
              onChange={handleFieldChange}
              editable={isEdit}
            />
            <ProfileField
              label="Skin Color"
              fieldKey="skinColor"
              value={payload.skinColor}
              onChange={handleFieldChange}
              editable={isEdit}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              variant="contained"
              children={isEdit ? 'Save Profile' : 'Edit Profile'}
              onPress={isEdit ? handleUpdateProfile : handleUpdate}
            />
          </View>
        </View>
      </Container>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  profileSection: {
    paddingVertical: 20,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
  },
  imageWrapper: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 100,
  },
  profileImage: {
    height: 100,
    width: 100,

    position: 'relative',
  },
  editIcon: {
    backgroundColor: Colors.primary,
    padding: 3,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  editIconImage: {
    height: 20,
    width: 20,
  },
  heading: {
    color: Colors.subHeading,
  },
  formSection: {
    rowGap: 15,
    marginVertical: 20,
  },
  inputGroup: {
    rowGap: 8,
  },
  inputLabel: {
    color: Colors.subHeading,
    paddingLeft: 3,
  },
  buttonWrapper: {
    marginVertical: 20,
  },
});

export default Profile;
