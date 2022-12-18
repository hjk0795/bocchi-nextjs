import { Query, DocumentData, getDocs } from "firebase/firestore";

export const getDocumentArray = async (query: Query<DocumentData>) => {
    const querySnapshot = await getDocs(query);
    const querySnapshotDocs = querySnapshot.docs;
    const docDataArray = querySnapshotDocs.map((doc) => {
        return doc.data();
    });

    return docDataArray;
};