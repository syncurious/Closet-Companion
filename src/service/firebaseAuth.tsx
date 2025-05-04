import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from '@react-native-firebase/auth';
import {createDataByKey, getDataByKey} from './firestoreHelper';

const auth = getAuth();

const getFirebaseAuthErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'The credential provided is invalid.';
    default:
      return 'Login failed. Please try again.';
  }
};

const getFirebaseSignupErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign-up is not enabled.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    default:
      return 'Sign-up failed. Please try again.';
  }
};

export const signUpWithEmail = async (body: {
  email: string;
  password: string;
  name: string;
}) => {
  const {name, email, password} = body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    await createDataByKey('users', user.uid, {
      ...{id: user.uid},
      name,
      email,
    });
    return {
      success: true,
      user,
      message: 'Signup successful',
    };
  } catch (error: any) {
    const errorCode = error.code || '';
    const dynamicMessage = getFirebaseSignupErrorMessage(errorCode);
    return {
      success: false,
      user: null,
      message: dynamicMessage,
    };
  }
};

export const loginWithEmail = async (body: {
  email: string;
  password: string;
}) => {
  const {email, password} = body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const userDoc = await getDataByKey('users', user.uid);

    if (!userDoc?.success) {
      return {
        success: false,
        user: null,
        message: userDoc?.message,
      };
    }

    return {
      success: true,
      user,
      userData: userDoc.data,
      message: 'Login successful',
    };
  } catch (error: any) {
    const errorCode = error.code || '';
    const dynamicMessage = getFirebaseAuthErrorMessage(errorCode);
    return {
      success: false,
      user: null,
      message: dynamicMessage,
    };
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to send password reset email',
    };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return {success: true, message: 'User signed out successfully'};
  } catch (error: any) {
    console.error('❌ Sign-out error:', error.message);
    return {success: false, message: error.message};
  }
};
