import connectionCheck from "../../../utils/connectionCheck";
import Restaurant from "../../../models/restaurantModel";
import RestaurantCard from "../../../components/restaurantCard";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import _ from "lodash";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import { collection, query, where, getDocs } from "firebase/firestore";

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
  await connectionCheck();

  const restaurantData = await Restaurant.find({
    category: params.category,
  }).exec();

  const restaurantDataSanitized = JSON.parse(JSON.stringify(restaurantData));

  

  

  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // const db = getFirestore(app);

  // const q1 = query(collection(db, "restaurants"), where("category", "==", `${params.category}`));


  // const querySnapshot1 = await getDocs(q1);
  // querySnapshot1.forEach((test) => {
  //   console.log(test.data().category);
  // });


  //  return {
  //   props: {
  //     querySnapshot1
  //   },
  // };

  return {
    props: {
      restaurantDataSanitized,
    },
  };
}

export default function RestaurantList({ restaurantDataSanitized }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-2">
      {restaurantDataSanitized.forEach((foundItem, index) => {
        return (
          <RestaurantCard
            key={index}
            name={foundItem.name}
            category={foundItem.category}
            brandImg={foundItem.brandImg}
          />
        );
      })}
    </Row>
  );
}
