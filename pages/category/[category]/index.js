import RestaurantCard from "../../../components/restaurantCard";
import Row from "react-bootstrap/Row";
import _ from "lodash";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";

export async function getStaticPaths() {
  const categoryNames = ["sushi", "donburi", "ramen", "burger"];

  const paths = categoryNames.map((categoryName) => {
    return {
      params: {
        category: categoryName,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const q = query(
    collection(db, "restaurants"),
    where("category", "==", `${params.category}`)
  );

  const querySnapshot = await getDocs(q);
  const querySnapshotDocs = querySnapshot.docs;

  const docArray = querySnapshotDocs.map((doc, index) => {
    return doc.data();
  });

  const q2 = query(
    collection(db, `restaurants/${params.category}/reviews`),
  );

  const querySnapshotReviews = await getDocs(q2);
  const querySnapshotReviewsDocs = querySnapshotReviews.docs;

  const reviewArray = querySnapshotReviewsDocs.map((doc, index) => {
    return doc.data();
  });


  return {
    props: {
      docArray,
      reviewArray
    },
  };
}

export default function RestaurantList({ docArray, reviewArray }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-2">
      {docArray.map((foundItem, index) => {
        return (
          <RestaurantCard
            key={index}
            name={foundItem.name}
            category={foundItem.category}
            brandImg={foundItem.brandImg}
            review={reviewArray}
          />
        );
      })}
    </Row>
  );
}
