import GridCard from "../../../components/gridCard";
import Row from "react-bootstrap/Row";
import _ from "lodash"
import { getCategoryArray } from "../../../utils/getCategoryArray";
import { getDocDataArray } from "../../../utils/getDocDataArray";
import { db } from "../../../firebase-config";
import { NextResponse } from "next/server";
import { DocumentData, query, collection, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

type StaticProps = {
  restaurantDataArray: DocumentData[],
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
  let restaurantDataArray: DocumentData[], avgRatingScoreArray: number[];

  restaurantDataArray = await getDocDataArray(q1);
  const avgRatingScorePromiseArray = restaurantDataArray.map(async (doc) => {
    const q2 = query(collection(db, `restaurants/${doc.name}/reviews`));
    const reviewDataArray = await getDocDataArray(q2);
    let sumRatingScore = 0;
    reviewDataArray.map((doc) => {
      sumRatingScore += doc.ratingScore;
    });

    return sumRatingScore / reviewDataArray.length;
  });
  avgRatingScoreArray = await Promise.all(avgRatingScorePromiseArray);

  return {
    props: {
      restaurantDataArray,
      avgRatingScoreArray,
    },
  };
}

export default function RestaurantList({ restaurantDataArray, avgRatingScoreArray }: StaticProps) {
  return (
    <Row className="g-2" xs={1} sm={2} md={3} lg={4}>
      {restaurantDataArray.map((doc, index) => {
        return (
          <GridCard
            key={index}
            imgSrc={doc.brandImg}
            title={doc.name}
            subTitle={avgRatingScoreArray[index].toString()}
            linkHref={`/category/${_.lowerCase(doc.category)}/${doc.name}`}
          />
        );
      })}
    </Row>
  );
}
