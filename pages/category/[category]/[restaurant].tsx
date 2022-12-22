import RestaurantMain from "../../../components/restaurantMain";
import getDocIdDataArray from "../../../utils/getDocIdDataArray";
import { DocIdData } from "../../../utils/getDocIdDataArray";
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
  restaurantIdData: DocIdData,
  reviewIdDataArray: DocIdData[],
  reviewCountFecthed: number,
  imgURLArray: string[]
}

export async function getStaticPaths() {
  const q = query(collection(db, "restaurants"));
  const restaurantIdDataArray = await getDocIdDataArray(q);
  const paths = [];

  for (const docIdData of restaurantIdDataArray) {
    paths.push({
      params: {
        category: docIdData.data.category,
        restaurant: docIdData.data.name,
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
    orderBy("timestamp", "desc"),
    limit(1)
  );

  const restaurantIdDataArray = await getDocIdDataArray(q1);
  const restaurantIdData = restaurantIdDataArray[0];
  const reviewIdDataArray = await getDocIdDataArray(q2);
  const q2CountSnapshot = await getCountFromServer(q2Collection);
  const reviewCountFecthed = q2CountSnapshot.data().count;

  const imgURLArray = [];
  const tableImgListRef = ref(storage, 'images/sushi1/table');
  const listResult = await listAll(tableImgListRef);

  await Promise.all(listResult.items.map(async (item) => {
    const url = await getDownloadURL(ref(storage, 'images/sushi1/table/' + item.name));
    imgURLArray.push(url);
  }));

  return {
    props: {
      restaurantIdData,
      reviewIdDataArray,
      reviewCountFecthed,
      imgURLArray
    }
  };
}

export default function RestaurantList({
  restaurantIdData,
  reviewIdDataArray,
  reviewCountFecthed,
  imgURLArray
}: StaticProps) {
  return (
    <>
      <RestaurantMain
        restaurantName={restaurantIdData.data.name}
        reviewIdDataArray={reviewIdDataArray}
        reviewCountFecthed={reviewCountFecthed}
        imgURLArray={imgURLArray}
      />
    </>
  );
}
