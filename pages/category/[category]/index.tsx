import GridCard from "../../../components/gridCard";
import getDocIdDataArray from "../../../utils/getDocIdDataArray";
import Row from "react-bootstrap/Row";
import _ from "lodash"
import { getCategoryArray } from "../../../utils/getCategoryArray";
import { DocIdData } from "../../../utils/getDocIdDataArray";
import { db } from "../../../firebase-config";
import { NextResponse } from "next/server";
import { DocumentData, query, collection, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

type StaticProps = {
  restaurantIdDataArray: DocIdData[],
  avgRatingScoreArray: number[]
}

export function getStaticPaths() {
  const categoryArray = getCategoryArray();
  const paths = categoryArray.map((category) => {
    return {
      params: {
        category: _.lowerCase(category.name)
      }
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const q1 = query(
    collection(db, "restaurants"),
    where("category", "==", `${params.category}`)
  );
  let restaurantIdDataArray: DocIdData[], avgRatingScoreArray: number[];

  restaurantIdDataArray = await getDocIdDataArray(q1);
  const avgRatingScorePromiseArray = restaurantIdDataArray.map(async (docIdData) => {
    const q2 = query(collection(db, `restaurants/${docIdData.data.name}/reviews`));
    const reviewIdDataArray = await getDocIdDataArray(q2);
    let sumRatingScore = 0;
    reviewIdDataArray.map((docIdData) => {
      sumRatingScore += docIdData.data.ratingScore;
    });

    return Number((sumRatingScore / reviewIdDataArray.length).toFixed(1));
  });
  avgRatingScoreArray = await Promise.all(avgRatingScorePromiseArray);

  return {
    props: {
      restaurantIdDataArray,
      avgRatingScoreArray,
    },
  };
}

export default function RestaurantList({ restaurantIdDataArray, avgRatingScoreArray }: StaticProps) {
  return (
    <Row className="g-2" xs={1} sm={2} md={3} lg={4}>
      {restaurantIdDataArray.map((docIdData, index) => {
        return (
          <GridCard
            key={index}
            imgSrc={docIdData.data.brandImg}
            title={docIdData.data.name}
            subTitle={avgRatingScoreArray[index].toString()}
            linkHref={`/category/${_.lowerCase(docIdData.data.category)}/${docIdData.data.name}`}
          />
        );
      })}
    </Row>
  );
}
