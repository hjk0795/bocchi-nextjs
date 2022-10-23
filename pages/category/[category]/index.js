// import connectionCheck from "../../../utils/connectionCheck";
// import Restaurant from "../../../models/restaurantModel";
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

// console.log(querySnapshotDocs);


// const sanitized = JSON.parse(JSON.stringify(querySnapshotDocs));
// console.log(JSON.stringify(querySnapshotDocs));
// console.log(sanitized);

// console.log(sanitized);

// console.log(querySnapshotDocs[0].data());

const docArray = querySnapshotDocs.map((doc, index)=>{
  return doc.data();
})

// console.log(docArray);

   return {
    props: {
      docArray
    },
  };


  // return {
  //   props: {
  //     restaurantDataSanitized,
  //   },
  // };
}

export default function RestaurantList({ docArray }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-2">
      {docArray.map((foundItem, index) => {
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
