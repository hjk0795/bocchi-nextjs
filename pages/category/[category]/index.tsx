import GridCard from "../../../components/gridCard";
import Row from "react-bootstrap/Row";
import _ from "lodash"
import { getCategoryList } from "../../../utils/getCategoryList";
import { getDocumentArray } from "../../../utils/getDocumentArray";
import { db } from "../../../firebase-config";
import { DocumentData, query, collection, where } from "firebase/firestore";

type StaticProps = {
  restaurantDocs: DocumentData[],
  avgRatingScoreArray: number[]
}

export function getStaticPaths() {
  const categoryList = getCategoryList();
  const paths = categoryList.map((category) => {
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
  const restaurantDocs = await getDocumentArray(q1);
  const avgRatingScorePromiseArray = restaurantDocs.map(async (doc) => {
    const q2 = query(collection(db, `restaurants/${doc.name}/reviews`));
    const reviewDocs = await getDocumentArray(q2);
    let sumRatingScore = 0;
    reviewDocs.map((doc) => {
      sumRatingScore += doc.ratingScore;
    });

    return sumRatingScore / reviewDocs.length;
  });
  const avgRatingScoreArray = await Promise.all(avgRatingScorePromiseArray);

  return {
    props: {
      restaurantDocs,
      avgRatingScoreArray,
    },
  };
}

export default function RestaurantList({ restaurantDocs, avgRatingScoreArray }: StaticProps) {
  return (
    <Row className="g-2" xs={1} sm={2} md={3} lg={4}>
      {restaurantDocs.map((doc, index) => {
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
