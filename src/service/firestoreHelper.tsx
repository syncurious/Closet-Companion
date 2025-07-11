import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';

const firestore = getFirestore();

export const getData = async (
  collectionName: string,
  docId?: string, // optional
) => {
  try {
    if (docId) {
      // Get single document by ID
      const docRef = doc(firestore, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {success: true, data: docSnap.data(), id: docSnap.id};
      } else {
        return {success: false, message: 'Document does not exist'};
      }
    } else {
      // Get all documents in the collection
      const querySnapshot = await getDocs(
        collection(firestore, collectionName),
      );
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {success: true, data: documents};
    }
  } catch (error: any) {
    console.error('❌ Error fetching data:', error.message);
    return {success: false, message: error.message};
  }
};

export const createData = async (
  collectionName: string,
  data: Record<string, any>,
  docId?: string, // optional
) => {
  try {
    let docRef;

    if (docId) {
      // Use custom doc ID
      docRef = doc(firestore, collectionName, docId);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
      });
    } else {
      // Auto-generate doc ID
      docRef = await addDoc(collection(firestore, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
      });
    }

    return {
      success: true,
      id: docRef.id,
      message: `${collectionName} document created successfully`,
    };
  } catch (error: any) {
    console.error('❌ Error creating document:', error.message);
    return {
      success: false,
      message: error.message,
    };
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
