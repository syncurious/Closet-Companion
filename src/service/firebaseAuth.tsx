import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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
    // Save user profile to Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      name: name,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    return {user: userCredential.user, error: null};
  } catch (error: any) {
    console.log('Error', error?.message);
    return {user: null, error: error.message};
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
      return {user: null, error: 'User data not found in database'};
    }
    return {user: user, error: null};
  } catch (error: any) {
    return {user: null, error: error.message};
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {success: true, error: null};
  } catch (error: any) {
    return {success: false, error: error.message};
  }
};
