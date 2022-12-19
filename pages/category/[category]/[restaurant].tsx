import DetailCard from "../../../components/detailCard";
import { getDocDataArray } from "../../../utils/getDocDataArray";
import { db, storage } from "../../../firebase-config";
import {
  DocumentData,
  query,
  collection,
  where,
  orderBy,
  limit,
  getCountFromServer,
} from "firebase/firestore";
import { StorageReference, ref, listAll, getDownloadURL } from "firebase/storage";

type StaticProps = {
  restaurantData: DocumentData,
  reviewDataArray: DocumentData[],
  reviewTotalCount: number,
  imgURLArray: string[]
}

export async function getStaticPaths() {
  const q = query(collection(db, "restaurants"));
  const restaurantDataArray = await getDocDataArray(q);
  const paths = [];

  for (const doc of restaurantDataArray) {
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
  const q1 = query(
    collection(db, "restaurants"),
    where("name", "==", `${params.restaurant}`)
  );
  const q2Collection = collection(db, `restaurants/${params.restaurant}/reviews`);
  const q2 = query(
    q2Collection,
    orderBy("id"),
    limit(1)
  );

  const restaurantDataArray = await getDocDataArray(q1);
  const restaurantData = restaurantDataArray[0];
  const reviewDataArray = await getDocDataArray(q2);
  const q2CountSnapshot = await getCountFromServer(q2Collection);
  const reviewTotalCount = q2CountSnapshot.data().count;

  const imgURLArray = [];
  const tableImgListRef = ref(storage, 'images/sushi1/table');
  const listResult = await listAll(tableImgListRef);

  await Promise.all(listResult.items.map(async (item) => {
    const url = await getDownloadURL(ref(storage, 'images/sushi1/table/' + item.name));
    imgURLArray.push(url);
  }));

  return {
    props: {
      restaurantData,
      reviewDataArray,
      reviewTotalCount,
      imgURLArray
    }
  };
}

export default function RestaurantList({
  restaurantData,
  reviewDataArray,
  reviewTotalCount,
  imgURLArray
}: StaticProps) {
  return (
    <>
      <DetailCard
        restaurantName={restaurantData.name}
        reviewDataArray={reviewDataArray}
        reviewTotalCount={reviewTotalCount}
        imgURLArray={imgURLArray}
      />
    </>
  );
}
