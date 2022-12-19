import Review from "./review";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import MyImage from "../utils/imageLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styles from "./detailCard.module.css";
import Rating from "@mui/material/Rating";
// import { getAnalytics } from "firebase/analytics";
import { db, auth, storage } from "../firebase-config";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getCountFromServer,
  doc,
  setDoc,
  addDoc,
  DocumentData,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GridCard from "./gridCard";
import GridCardCarousel from "./gridCardCarousel";
import { getDownloadURL, listAll, ref, StorageReference } from "firebase/storage";
import { fill } from "lodash";
import FlaticonAttribution from "./flaticonAttribution";
import { getDocDataArray } from "../utils/getDocDataArray";

type DetailCardProps = {
  restaurantName: string,
  reviewDataArray: DocumentData[],
  reviewTotalCount: number,
  imgURLArray: string[]
}

type Review = {
  id: number,
  ratingScore: number,
  statement: string,
  userName: string,
}

export default function DetailCard({ restaurantName, reviewDataArray, reviewTotalCount, imgURLArray }: DetailCardProps) {
  let [totalCount, setTotalCount] = useState(reviewTotalCount);
  const [hasMore, setHasMore] = useState(true);
  let [reviewArray, setReviewArray] = useState<Review[]>(reviewDataArray as Review[]);
  const [reviewWrite, setReviewWrite] = useState<Review>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [editingID, setEditingID] = useState(-1);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getMoreReviews() {
    const next = query(
      collection(db, `restaurants/${restaurantName}/reviews`),
      orderBy("id"),
      startAfter(reviewArray.length),
      limit(1)
    );
    const nextReviewDataArray = await getDocDataArray(next);
    const nextReviewData = nextReviewDataArray[0];

    console.log(nextReviewDataArray);

    reviewArray = [
      ...reviewArray,
      {
        id: nextReviewData.id,
        ratingScore: nextReviewData.ratingScore,
        statement: nextReviewData.statement,
        userName: nextReviewData.userName,
      },
    ];

    setReviewArray(reviewArray);
    setHasMore(reviewArray.length < totalCount ? true : false);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setReviewWrite((prevReviewWrite) => {
      if (name === "ratingScore") {
        return {
          id: prevReviewWrite.id,
          ratingScore: value,
          statement: prevReviewWrite.statement,
          userName: prevReviewWrite.userName,
        };
      } else {
        return {
          id: prevReviewWrite.id,
          ratingScore: prevReviewWrite.ratingScore,
          statement: value,
          userName: prevReviewWrite.userName,
        };
      }
    });
  }

  function toggleHidden() {
    setIsChecked(!isChecked);
  }

  const addReview = async (reviewWrite) => {

    if (currentUser !== null) {
      const docRef = await setDoc(
        doc(db, `restaurants/${restaurantName}/reviews`, `${reviewArray.length + 1}`),
        {
          id: reviewArray.length + 1,
          ratingScore: `${reviewWrite.ratingScore}`,
          statement: `${reviewWrite.statement}`,
          userName: `${currentUser.displayName}`,
        }
      );
    } else if (currentUser === null) {
      const docRef = await setDoc(
        doc(db, `restaurants/${restaurantName}/reviews`, `${reviewArray.length + 1}`),
        {
          id: reviewArray.length + 1,
          ratingScore: `${reviewWrite.ratingScore}`,
          statement: `${reviewWrite.statement}`,
          userName: "anonymous",
        }
      );
    }

    console.log("created!");
    totalCount = totalCount + 1;
    setHasMore(true);
  };

  function deleteReview(id) {
    setReviewArray(
      reviewArray.filter((review) => {
        return review.id !== id;
      })
    );
  }

  function editReview(id) {
    setEditingID(id);
  }

  function saveReview(id, editStatement) {
    for (let i = 0; i < reviewArray.length; i++) {
      if (reviewArray[i].id === id) {
        reviewArray[i].statement = editStatement;
      }
    }

    setEditingID(-1);
  }

  return (
    <>
      <h1>{restaurantName}</h1>
      <main>
        <Row>
          <div className={styles.menuImgContainer}>
            <Image
              src="https://img.freepik.com/free-vector/hot-dog-restaurant-menu-template-with-illustrations_1361-1507.jpg?w=1480&t=st=1671398684~exp=1671399284~hmac=67377dd8c8074bd5e6dd02824786e9fadc19604b59c03a942685b80e75937af4"
              alt="banner"
              fill
              objectFit="contain"
            />
          </div>
        </Row>

        <Row className="g-2" lg={2}>
          <GridCard
            imgSrc='https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F3.png?alt=media&token=53b00c6d-e9aa-4179-85b4-6bbabb43ba07'
            isBigSize={true}
          />
          <GridCardCarousel
            imgURLArray={imgURLArray}
            imgAlt="table"
            isBigSize={true}
          />
          {/* <iframe
                      width="100%"
                      height="100%"
                      style={{ border: "0" }}
                      loading="lazy"
                      allowfullscreen
                      src={`https://www.google.com/maps/embed/v1/view?zoom=17&center=-36.8451%2C174.7675&key=${process.env.API_KEY_GOOGLE}`}
                    ></iframe> */}
        </Row>

        <Row>
          <Col className="d-flex justify-content-center align-items-center" xs={2}>
            <Rating
              className={styles.rating}
              name="ratingScore"
              value={reviewWrite?.ratingScore}
              size="small"
              onChange={handleChange}
            />
          </Col>


          <Col>
            <div className="mt-3">
              <div className={styles.textareaContainer}>
                <textarea
                  className="form-control"
                  rows={isChecked ? 3 : 1}
                  name="reviewText"
                  placeholder="Write a review"
                  onChange={handleChange}
                  value={reviewWrite?.statement}
                  onClick={toggleHidden}
                ></textarea>
                <Button
                  variant="outlined"
                  size="small"
                  style={{ display: isChecked ? "block" : "none" }}
                  onClick={() => {
                    return addReview(reviewWrite);
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
          endMessage={<p>You have seen it all</p>}
        >
          {reviewArray.map((foundItem, index) => {
            return (
              <Review
                id={foundItem.id}
                key={index}
                star={foundItem.ratingScore}
                statement={foundItem.statement}
                userName={foundItem.userName}
                isAuthenticated={currentUser !== null ? "true" : "false"}
                sessionUserName={
                  currentUser !== null
                    ? currentUser.displayName
                    : "anonymous"
                }
                name={restaurantName}
                deleteReview={deleteReview}
                editReview={editReview}
                isEditing={foundItem.id === editingID ? true : false}
                saveReview={saveReview}
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
