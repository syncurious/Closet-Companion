import {dress, EditProfileIcon} from '@/assets';
import Button from '@/components/button';
import Container from '@/components/container';
import Header from '@/components/header';
import Heading from '@/components/heading';
import Input from '@/components/input';
import {Colors} from '@/utitlity/colors';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

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
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [payload, setPayload] = useState({
    fullName: 'Aqib',
    email: 'aaqib@gmail.com',
    height: '5.8',
    weight: '62',
    age: '10',
    skinColor: 'Natural',
  });

  const handleFieldChange = (key: string, value: string) => {
    setPayload(prev => ({...prev, [key]: value}));
  };

  const handleUpdate = async () => {
    setIsEdit(!isEdit);
  };

  return (
    <React.Fragment>
      <Header route={route} />
      <Container fullScreen scrollEnabled style={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={dress}
              style={styles.profileImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.editIcon}>
              <Image
                source={EditProfileIcon}
                style={styles.editIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Heading
              level={6}
              style={styles.heading}
              children={'Tap to change profile picture'}
            />
          </View>
          <View style={styles.formSection}>
            <ProfileField
              label="Full Name"
              fieldKey="fullName"
              value={payload.fullName}
              onChange={handleFieldChange}
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
            />
            <ProfileField
              label="Weight (kg)"
              fieldKey="weight"
              value={payload.weight}
              type="numeric"
              onChange={handleFieldChange}
            />
            <ProfileField
              label="Age"
              fieldKey="age"
              value={payload.age}
              type="numeric"
              onChange={handleFieldChange}
            />
            <ProfileField
              label="Skin Color"
              fieldKey="skinColor"
              value={payload.skinColor}
              onChange={handleFieldChange}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              variant="contained"
              children={isEdit ? 'Save Profile' : 'Edit Profile'}
              onPress={handleUpdate}
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
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 100,
    position: 'relative',
  },
  editIcon: {
    backgroundColor: Colors.primary,
    padding: 3,
    position: 'absolute',
    top: 0,
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
