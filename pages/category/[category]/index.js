import RestaurantCard from "../../../components/restaurantCard";
import Row from "react-bootstrap/Row";
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

  const averageStarArray = docArray.map(async (foundItem, index) => {
    const q = query(collection(db, `restaurants/${foundItem.name}/reviews`));
    const querySnapshot = await getDocs(q);
    const querySnapshotDocs = querySnapshot.docs;
    const docArray = querySnapshotDocs.map((doc, index) => {
      return doc.data().star;
    });
    const docArrayNumber = docArray.map((i) => {
      Number(i);
    });
    var sum = 0;
    docArrayNumber.map((i) => {
      return (sum = sum + i);
    });

    return sum / docArrayNumber.length;
  });

  return {
    props: {
      docArray,
      averageStarArray
    },
  };
}

export default function RestaurantList({ docArray, averageStarArray }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-2">
      {docArray.map((foundItem, index) => {
        return (
          <RestaurantCard
            key={index}
            name={foundItem.name}
            category={foundItem.category}
            brandImg={foundItem.brandImg}
            averageStar={averageStarArray[index]}
          />
        );
      })}
    </Row>
  );
}
