import GridCard from "../../../components/gridCard";
import Row from "react-bootstrap/Row";
import _ from "lodash"
import { getCategoryArray } from "../../../utils/getCategoryArray";
import { DocIdData } from "../../../utils/getDocIdDataArray";
import {getDocIdDataArray} from "../../../utils/getDocIdDataArray";
import { GetStaticProps, GetStaticPaths } from 'next'
import { db } from "../../../firebase-config";
import { query, collection, where } from "firebase/firestore";

type RestaurantListProps = {
  restaurantIdDataArray: DocIdData[];
  avgRatingScoreArray: number[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryArray = getCategoryArray();
  const paths = categoryArray.map((category) => {
    return {
      params: {
        category: category.name === '?' ? "question-mark" : _.lowerCase(category.name)
      }
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const q1 = query(
    collection(db, "restaurants"),
    where("category", "==", `${params.category}`)
  );
  let restaurantIdDataArray: DocIdData[], avgRatingScoreArray: number[];

  restaurantIdDataArray = await getDocIdDataArray(q1);
  const avgRatingScorePromiseArray = restaurantIdDataArray.map(async (docIdData) => {
    const q2 = query(collection(db, `restaurants/${docIdData.data.name}/reviews`));
    const reviewIdDataArray = await getDocIdDataArray(q2);
    const hasNoReviews = Object.keys(reviewIdDataArray).length === 0;

    if (hasNoReviews) {
      return null;
    } else {
      let sumRatingScore = 0;
      reviewIdDataArray.map((docIdData) => {
        sumRatingScore += docIdData.data.ratingScore;
      });

      return Number((sumRatingScore / reviewIdDataArray.length).toFixed(1));
    }
  });

  avgRatingScoreArray = await Promise.all(avgRatingScorePromiseArray);

  return {
    props: {
      restaurantIdDataArray,
      avgRatingScoreArray,
    },
  };
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurantIdDataArray, avgRatingScoreArray }) => {
  const hasNoReviews = avgRatingScoreArray[0] === null;

  return (
    <Row className="g-2" xs={1} sm={2} md={3} lg={4}>
      {restaurantIdDataArray.map((docIdData, index) => {
        return (
          <GridCard
            key={index}
            imgSrc={docIdData.data.brandImg}
            title={docIdData.data.name}
            subTitle={hasNoReviews ? "No Review" : avgRatingScoreArray[index]?.toString()}
            linkHref={`/category/${_.lowerCase(docIdData.data.category)}/${docIdData.data.name}`}
          />
        );
      })}
    </Row>
  );
}

export default RestaurantList;
