import GridCards from "../components/gridCards";
import Head from "next/head";
import Link from "next/link";
import Row from "react-bootstrap/Row";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Category() {
 

  // const firebaseConfig = {
  //   apiKey: process.env.API_KEY_FIREBASE,
  //   authDomain: "bocchi-cd32c.firebaseapp.com",
  //   databaseURL:
  //     "https://bocchi-cd32c-default-rtdb.asia-southeast1.firebasedatabase.app",
  //   projectId: "bocchi-cd32c",
  //   storageBucket: "bocchi-cd32c.appspot.com",
  //   messagingSenderId: "429017394127",
  //   appId: "1:429017394127:web:97bf9a991af175637340ba",
  //   measurementId: "G-HW15LB2E2F",
  // };


  // const app = initializeApp(firebaseConfig);
  // // const analytics = getAnalytics(app);
  // const db = getFirestore(app);

  // async function test() {
  //   const q = query(collection(db, "restaurants"), where("category", "==", "sushi"));

  //   const querySnapshot = await getDocs(q);
  
  // }

  // test();

  var categoryList = [
    {
      title: "Sushi",
      src: "https://cdn-icons-png.flaticon.com/512/1539/1539701.png",
    },
    {
      title: "Donburi",
      src: "https://cdn-icons-png.flaticon.com/512/3978/3978700.png",
    },
    {
      title: "Ramen",
      src: "https://cdn-icons-png.flaticon.com/512/1046/1046850.png",
    },
    {
      title: "Burger",
      src: "https://cdn-icons-png.flaticon.com/512/3075/3075935.png",
    },
    {
      title: "?",
      src: "https://cdn-icons-png.flaticon.com/512/84/84042.png",
    },
  ];

  return (
    <>
      <Head>
        <title>bocchi</title>
      </Head>

      <Row xs={1} md={2} lg={4} className="g-2">
        {categoryList.map((category, index) => {
          return (
            <GridCards key={index} title={category.title} src={category.src} />
          );
        })}
      </Row>

      <Link
        href="https://www.flaticon.com/free-icons/sushi"
        title="sushi icons"
        passHref={true}
      >
        Sushi icons created by Freepik - Flaticon
      </Link>
      <Link
        href="https://www.flaticon.com/free-icons/food-and-restaurant"
        title="food and restaurant icons"
        passHref={true}
      >
        Food and restaurant icons created by Freepik - Flaticon
      </Link>
      <Link
        href="https://www.flaticon.com/free-icons/ramen"
        title="ramen icons"
        passHref={true}
      >
        Ramen icons created by Freepik - Flaticon
      </Link>
      <Link
        href="https://www.flaticon.com/free-icons/burger"
        title="burger icons"
        passHref={true}
      >
        Burger icons created by Freepik - Flaticon
      </Link>
      <Link
        href="https://www.flaticon.com/free-icons/question-mark"
        title="question mark icons"
        passHref={true}
      >
        Question mark icons created by Freepik - Flaticon
      </Link>
    </>
  );
}
