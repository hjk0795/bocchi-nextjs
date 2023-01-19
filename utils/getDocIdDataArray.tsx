import { Query, DocumentData, getDocs } from "firebase/firestore";

export type DocIdData = {
    id: string,
    data: DocumentData
}

export const getDocIdDataArray = async(query: Query<DocumentData>) => {
    const querySnapshot = await getDocs(query);
    const querySnapshotDocs = querySnapshot.docs;
    const docIdDataArray = querySnapshotDocs.map((doc) => {
        return (
            {
                id: doc.id,
                data: doc.data()
            }
        );
    });

    return docIdDataArray;
};