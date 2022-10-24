// import connectionCheck from "../../../utils/connectionCheck";
// import Restaurant from "../../../models/restaurantModel";
import DetailCard from "../../../components/detailCard";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { collection, query, where, getDocs, getCountFromServer } from "firebase/firestore";

export async function getStaticPaths() {
  // await connectionCheck();

  const categoryNames = ["sushi", "donburi", "ramen", "burger"];
  // const RestAllInfo = await Restaurant.find({}).exec();
  // const RestAllInfoSanitized = JSON.parse(JSON.stringify(RestAllInfo));
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

  const q = query(collection(db, "restaurants"));


  const querySnapshot = await getDocs(q);
  const querySnapshotDocs = querySnapshot.docs;
  const docArray = querySnapshotDocs.map((doc, index)=>{
    return doc.data();
  })

  var temp = [];

  categoryNames.map((categoryName) => {
    for (const element of docArray) {
      if (element.category === categoryName) {
        temp.push({
          params: {
            category: categoryName,
            restaurant: element.name,
          },
        });
      }
    }
  });

  const paths = temp;

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // await connectionCheck();

  // const restaurantDetail = await Restaurant.findOne({
  //   name: params.restaurant,
  // }).exec();
  // const url = process.env.STRAPI_URL;
  // const res = await fetch(
  //   `${url}/reviews?filters[name][$eq]=${params.restaurant}&fields[0]=review&fields[1]=userName&pagination[start]=0&pagination[limit]=2&pagination[withCount]=true`
  // );
  // const data = await res.json();
  // const reviewArray = data.data;

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

  const q = query(collection(db, "restaurants"), where("name", "==", `${params.restaurant}`));
  const reviewQ = query(collection(db, `restaurants/${params.restaurant}/reviews`));


  const querySnapshot = await getDocs(q);
  const reviewSnapshot = await getDocs(reviewQ);
  const querySnapshotDocs = querySnapshot.docs;
  const reviewSnapshotDocs = reviewSnapshot.docs;
  const selectedDoc = querySnapshotDocs[0].data();

  const reviewArray = reviewSnapshotDocs.map((doc, index)=>{
    return doc.data();
  })



  // const restaurantsRef = collection(db, 'restaurants');

  // await Promise.all([
  //     addDoc(collection(restaurantsRef, 'reviews'), {
  //         name: 'Golden Gate Bridge',
  //         type: 'bridge'
  //     })
  // ]);

  const coll = collection(db, `restaurants/${params.restaurant}/reviews`);
  const snapshot = await getCountFromServer(coll);

  
  const totalCount = snapshot.data().count;



  return {
    props: {
      selectedDoc,
      reviewArray,
      totalCount,
    },
  };
}



export default function RestaurantList({
  selectedDoc,
  reviewArray,
  totalCount,
}) {
  return (
    <>
      <DetailCard
        name={selectedDoc.name}
        review={reviewArray}
        totalCount={totalCount}
      />
    </>
  );
}
