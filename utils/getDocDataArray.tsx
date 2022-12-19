//Apply change (id)

import { Query, DocumentData, getDocs } from "firebase/firestore";

export const getDocDataArray = async (query: Query<DocumentData>) => {
    const querySnapshot = await getDocs(query);
    const querySnapshotDocs = querySnapshot.docs;
    const docDataArray = querySnapshotDocs.map((doc) => {
        return (
            {
                id: doc.id,
                data: doc.data()
            }
        );
    });

    return docDataArray;
};