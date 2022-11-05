import {db} from "../../../firebase-config";
import DetailCard from "../../../components/detailCard";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
  limit,
  orderBy,
} from "firebase/firestore";

export async function getStaticPaths() {
  const categoryNames = ["sushi", "donburi", "ramen", "burger"];

  const q = query(collection(db, "restaurants"));

  const querySnapshot = await getDocs(q);
  const querySnapshotDocs = querySnapshot.docs;
  const docArray = querySnapshotDocs.map((doc, index) => {
    return doc.data();
  });

  var temp = [];

  categoryNames.map((categoryName) => {
    for (const element of docArray) {
      if (element.category === categoryName) {
        temp.push({
          params: {
            category: categoryName,
            restaurant: element.name,
          },
        });
      }
    }
  });

  const paths = temp;

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {

  const q = query(
    collection(db, "restaurants"),
    where("name", "==", `${params.restaurant}`)
  );
  const reviewQ = query(
    collection(db, `restaurants/${params.restaurant}/reviews`),
    orderBy("id"),
    limit(2)
  );

  const querySnapshot = await getDocs(q);
  const reviewSnapshot = await getDocs(reviewQ);
  const querySnapshotDocs = querySnapshot.docs;
  const reviewSnapshotDocs = reviewSnapshot.docs;
  const selectedDoc = querySnapshotDocs[0].data();

  const reviewArray = reviewSnapshotDocs.map((doc, index) => {
    return doc.data();
  });

  const coll = collection(db, `restaurants/${params.restaurant}/reviews`);
  const snapshot = await getCountFromServer(coll);

  const totalCount = snapshot.data().count;

  return {
    props: {
      selectedDoc,
      reviewArray,
      totalCount,
    },
  };
}

export default function RestaurantList({
  selectedDoc,
  reviewArray,
  totalCount,
}) {
  return (
    <>
      <DetailCard
        name={selectedDoc.name}
        review={reviewArray}
        totalCount={totalCount}
      />
    </>
  );
}
