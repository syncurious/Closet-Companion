import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

const firestore = getFirestore();

export const getDataByKey = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {success: true, data: docSnap.data()};
    } else {
      return {success: false, message: 'Document does not exist'};
    }
  } catch (error: any) {
    console.error('❌ Error fetching document:', error.message);
    return {success: false, message: error.message};
  }
};

export const createDataByKey = async (
  collectionName: string,
  docId: string,
  data: Record<string, any>,
) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
    });

    return {success: true, message: `${collectionName} Create Succesfully`};
  } catch (error: any) {
    console.error('❌ Error writing document:', error.message);
    return {success: false, message: error.message};
  }
};

export const updateDataByKey = async (
  collectionName: string,
  docId: string,
  fieldsToUpdate: Record<string, any>,
) => {
  try {
    const docRef = doc(firestore, collectionName, docId);
    await updateDoc(docRef, fieldsToUpdate);
    return {success: true, message: `${collectionName} updated`};
  } catch (error: any) {
    console.error('❌ Error updating document:', error.message);
    return {success: false, message: error.message};
  }
};
