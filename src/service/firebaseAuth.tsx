import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from '@react-native-firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from '@react-native-firebase/firestore';

const auth = getAuth();
const firestore = getFirestore();

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

    await setDoc(doc(firestore, 'users', user.uid), {
      name,
      email,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      user,
      message: 'Signup successful',
    };
  } catch (error: any) {
    return {
      success: false,
      user: null,
      message: error.message || 'Signup failed',
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

    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (!userDoc.exists()) {
      return {
        success: false,
        user: null,
        message: 'User data not found in Firestore',
      };
    }
    return {
      success: true,
      user,
      userData: userDoc.data(),
      message: 'Login successful',
    };
  } catch (error: any) {
    return {
      success: false,
      user: null,
      message: error.message || 'Login failed',
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
