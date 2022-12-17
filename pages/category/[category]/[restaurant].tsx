import { db } from "../../../firebase-config";
import DetailCard from "../../../components/detailCard";
import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
  limit,
  orderBy,
} from "firebase/firestore";
import { getDocumentArray } from "../../../utils/getDocumentArray";

export async function getStaticPaths() {
  const q = query(collection(db, "restaurants"));
  const restaurantDocs = await getDocumentArray(q);
  const paths = [];

  for (const doc of restaurantDocs) {
    paths.push({
      params: {
        category: doc.category,
        restaurant: doc.name,
      },
    });
  }

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
