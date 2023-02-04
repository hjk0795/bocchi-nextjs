import styles from "../styles/restaurantMain.module.css";
import GridCard from "./gridCard";
import GridCardCarousel from "./gridCardCarousel";
import Review from "./review";
import Image from "next/legacy/image";
import Link from "next/link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import { DocIdData } from "../utils/getDocIdDataArray";
import { getDocIdDataArray } from "../utils/getDocIdDataArray";
import { ChangeEvent, useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { db, auth } from "../firebase-config";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  query,
  collection,
  orderBy,
  where,
  limit,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

type RestaurantMainProps = {
  restaurantName: string;
  favoriteEmailArray: string[];
  reviewIdDataArray: DocIdData[];
  reviewCountFecthed: number;
  imgURLArray: string[];
}

type ReviewIdData = {
  id: string;
  data: {
    ratingScore: number;
    statement: string;
    userName: string;
    timestamp: number;
  }
}

const RestaurantMain: React.FC<RestaurantMainProps> = ({ restaurantName, favoriteEmailArray, reviewIdDataArray, reviewCountFecthed, imgURLArray }) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [reviewCount, setReviewCount] = useState(reviewCountFecthed);
  const [hasMore, setHasMore] = useState(true);
  const [reviewArray, setReviewArray] = useState<ReviewIdData[]>(reviewIdDataArray as ReviewIdData[]);
  const [reviewToBePosted, setReviewToBePosted] = useState<ReviewIdData>(null);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [editingID, setEditingID] = useState<string>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        if (favoriteEmailArray.includes(user.email)) {
          setIsToggled(true);
        }
      } else {
        setCurrentUser(null);
      }
    });

    setIsToggled(checkSavedFavorite());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkSavedFavorite() {
    const savedFavoriteList = document.cookie
      .split('; ')
      .find((row) => row.startsWith('favoriteList'))
      ?.split('=')[1];

    if (savedFavoriteList) {
      if (savedFavoriteList.includes(restaurantName)) {
        return true;
      }
    }

    return false;
  }

  function toggleFavorite() {
    if (currentUser) {
      if (isToggled) {

      } else {

      }
    } else {
      const savedFavoriteList = document.cookie
        .split('; ')
        .find((row) => row.startsWith('favoriteList'))
        ?.split('=')[1];

      if (isToggled) {
        const savedFavoriteListArray = savedFavoriteList.split('&');

        savedFavoriteListArray.splice(savedFavoriteListArray.indexOf(restaurantName), 1);
        const updatedFavoriteList = savedFavoriteListArray.join('&');

        if (updatedFavoriteList) {
          document.cookie = `favoriteList=${updatedFavoriteList};`;
        } else {
          document.cookie = `favoriteList=${updatedFavoriteList};max-age=0`;
        }

        setIsToggled(false);
      } else {
        if (savedFavoriteList) {
          const favoriteList = savedFavoriteList + `&${restaurantName}`;

          document.cookie = `favoriteList=${favoriteList};`;
        } else {
          document.cookie = `favoriteList=${restaurantName};`;
        }

        setIsToggled(true);
      }
    }
  }

  async function getMoreReviews() {
    if (reviewArray.length === reviewCount) {
      return setHasMore(false);
    } else {
      const next = query(
        collection(db, `restaurants/${restaurantName}/reviews`),
        orderBy("timestamp", "desc"),
        where("timestamp", "<", reviewArray[reviewArray.length - 1].data.timestamp),
        limit(1)
      );
      const nextReviewIdDataArray = await getDocIdDataArray(next);
      const nextReviewIdData = nextReviewIdDataArray[0];

      setReviewArray([
        ...reviewArray,
        {
          id: nextReviewIdData.id,
          data: {
            ratingScore: nextReviewIdData.data.ratingScore,
            statement: nextReviewIdData.data.statement,
            userName: nextReviewIdData.data.userName,
            timestamp: nextReviewIdData.data.timestamp
          }
        },
      ]);
      setHasMore((reviewArray.length + 1) < reviewCount ? true : false);
    }
  }

  function syncReviewToBePosted(event: ChangeEvent) {
    const { name, value } = event.target as HTMLInputElement;

    setReviewToBePosted((prevReviewToBePosted) => {
      return {
        id: prevReviewToBePosted?.id,
        data: {
          ratingScore: (name === "reviewRatingScore" ? Number(value) : prevReviewToBePosted?.data.ratingScore),
          statement: (name === "reviewTextArea" ? value : prevReviewToBePosted?.data.statement),
          userName: prevReviewToBePosted?.data.userName,
          timestamp: prevReviewToBePosted?.data.timestamp
        }
      };
    })
  }

  async function addReview(reviewToBePosted: ReviewIdData) {
    const docData = {
      ratingScore: reviewToBePosted.data.ratingScore,
      statement: reviewToBePosted.data.statement,
      userName: currentUser ? currentUser.displayName : "anonymous",
      timestamp: Date.now()
    };
    const docRef = await addDoc(collection(db, `restaurants/${restaurantName}/reviews`), docData);
    console.log("Document written with ID: ", docRef.id);

    setReviewArray([
      {
        id: docRef.id,
        data: docData
      }, ...reviewArray,
    ]);
  };

  async function deleteReview(id: string) {
    await deleteDoc(
      doc(db, `restaurants/${restaurantName}/reviews`, id)
    );

    console.log("Deleted");

    const reviewArrayFiltered = reviewArray.filter((review) => {
      return review.id !== id;
    })

    setReviewArray(
      reviewArrayFiltered
    );
  }

  async function saveReview(id: string, newStatement: string) {
    await setDoc(
      doc(db, `restaurants/${restaurantName}/reviews`, id),
      {
        statement: newStatement,
      },
      { merge: true }
    );

    setEditingID(null);

    for (let i = 0; i < reviewArray.length; i++) {
      if (reviewArray[i].id === id) {
        reviewArray[i].data.statement = newStatement;
      }
    }

    setReviewArray(reviewArray);
  }

  return (
    <>
      <div className="d-flex justify-content-around align-items-center">
        <h1>{restaurantName}</h1>
        {isToggled ? <MdFavorite size={25} onClick={toggleFavorite} style={{ cursor: 'pointer' }} /> : <MdFavoriteBorder size={25} onClick={toggleFavorite} style={{ cursor: 'pointer' }} />}
      </div>
      <main>
        <Row>
          <div className={styles.menuImgContainer}>
            <Image
              src="https://img.freepik.com/free-vector/hot-dog-restaurant-menu-template-with-illustrations_1361-1507.jpg?w=1480&t=st=1671398684~exp=1671399284~hmac=67377dd8c8074bd5e6dd02824786e9fadc19604b59c03a942685b80e75937af4"
              alt="banner"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </Row>

        <Row className={`${styles.gridCardContainer} g-2`} lg={2}>
          <GridCard
            imgSrc='https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F3.png?alt=media&token=53b00c6d-e9aa-4179-85b4-6bbabb43ba07'
            isBigSize={true}
          />
          <GridCardCarousel
            imgURLArray={imgURLArray}
            imgAlt="table"
            isBigSize={true}
          />
        </Row>

        <Row>
          <Col className="d-flex justify-content-center align-items-center" xs={2}>
            <Rating
              className={styles.rating}
              name="reviewRatingScore"
              value={reviewToBePosted ? reviewToBePosted.data.ratingScore : 0}
              size="small"
              onChange={syncReviewToBePosted}
            />
          </Col>

          <Col>
            <div className="mt-3">
              <div className={styles.textareaContainer}>
                <textarea
                  className="form-control"
                  rows={isWritingReview ? 3 : 1}
                  name="reviewTextArea"
                  placeholder="Write a review"
                  onChange={syncReviewToBePosted}
                  value={reviewToBePosted?.data.statement}
                  onClick={() => {
                    setIsWritingReview(!isWritingReview);
                  }}
                ></textarea>
                <Button
                  variant="outlined"
                  size="small"
                  style={{ display: isWritingReview ? "block" : "none" }}
                  onClick={() => {
                    return addReview(reviewToBePosted);
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <InfiniteScroll
          dataLength={reviewArray.length}
          next={getMoreReviews}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={reviewCount ? <p>You have seen it all</p> : <p>Please be the first reviewer!</p>}
        >
          {reviewArray.map((review, index) => {
            return (
              <Review
                key={index}
                id={review.id}
                ratingScore={review.data.ratingScore}
                statement={review.data.statement}
                timestamp={review.data.timestamp}
                userName={review.data.userName}
                currentUser={currentUser}
                deleteReview={deleteReview}
                saveReview={saveReview}
                isEditing={review.id === editingID ? true : false}
                setEditingID={setEditingID}
              />
            );
          })}
        </InfiniteScroll>
      </main>

      <footer className="text-muted py-5">
        <div className={styles.attribution}>
          <Link href="https://www.freepik.com/free-vector/hot-dog-restaurant-menu-template-with-illustrations_5059593.htm#query=menu&position=5&from_view=search&track=sph">Image by BiZkettE1 on Freepik</Link><br />
          <Link href="https://www.flaticon.com/free-icons/question-mark" title="question mark icons">Question mark icons created by Freepik - Flaticon</Link>
        </div>

        <div className="container">
          <p className="float-end mb-1">
            <a href="#">Back to top</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default RestaurantMain;