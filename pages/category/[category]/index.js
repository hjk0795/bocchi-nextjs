import connectionCheck from "../../../utils/connectionCheck";
import Restaurant from "../../../models/restaurantModel";
import RestaurantCard from "../../../components/restaurantCard";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import _ from "lodash";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { collection, query, where, getDocs } from "firebase/firestore";

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
  // await connectionCheck();

  // const restaurantData = await Restaurant.find({
  //   category: params.category,
  // }).exec();

  // const restaurantDataSanitized = JSON.parse(JSON.stringify(restaurantData));

  const firebaseConfig = {
    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: "bocchi-cd32c.firebaseapp.com",
    databaseURL:
      "https://bocchi-cd32c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bocchi-cd32c",
    storageBucket: "bocchi-cd32c.appspot.com",
    messagingSenderId: "429017394127",
    appId: "1:429017394127:web:97bf9a991af175637340ba",
    measurementId: "G-HW15LB2E2F",
  };


  

  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const db = getFirestore(app);

  const q = query(collection(db, "restaurants"), where("category", "==", `${params.category}`));


  const querySnapshot = await getDocs(q);
  const querySnapshotDocs = querySnapshot.docs;



   return {
    props: {
      querySnapshotDocs
    },
  };


  // console.log(restaurantDataSanitized);
  // return {
  //   props: {
  //     restaurantDataSanitized,
  //   },
  // };
}

export default function RestaurantList({ querySnapshotDocs }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-2">
      {querySnapshotDocs.forEach((foundItem, index) => {
        return (
          <RestaurantCard
            key={index}
            name={foundItem.id}
            category={foundItem.data().category}
            brandImg={foundItem.data().brandImg}
          />
        );
      })}
    </Row>
  );
}
