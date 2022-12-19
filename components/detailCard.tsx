import Review from "./review";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "@mui/material/Button";
import styles from "./detailCard.module.css";
import Rating from "@mui/material/Rating";
import Image from "next/legacy/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GridCard from "./gridCard";
import GridCardCarousel from "./gridCardCarousel";
import { ChangeEvent, useEffect, useState } from "react";
import { getDocDataArray } from "../utils/getDocDataArray";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase-config";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  doc,
  setDoc,
  DocumentData,
  addDoc,
} from "firebase/firestore";

type DetailCardProps = {
  restaurantName: string,
  reviewDataArray: DocumentData[],
  reviewCountFecthed: number,
  imgURLArray: string[]
}

type Review = {
  ratingScore: number,
  statement: string,
  userName: string,
  timestamp: number
}

export default function DetailCard({ restaurantName, reviewDataArray, reviewCountFecthed, imgURLArray }: DetailCardProps) {
  const [reviewCount, setReviewCount] = useState(reviewCountFecthed);
  const [hasMore, setHasMore] = useState(true);
  const [reviewArray, setReviewArray] = useState<Review[]>(reviewDataArray as Review[]);
  const [reviewToBePosted, setReviewToBePosted] = useState<Review>(null);
  const [isWritingReview, setIsWritingReview] = useState(false);
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
      startAfter(reviewArray.length - 1),
      limit(1)
    );
    const nextReviewDataArray = await getDocDataArray(next);
    const nextReviewData = nextReviewDataArray[0];

    setReviewArray([
      ...reviewArray,
      {
        ratingScore: nextReviewData.ratingScore,
        statement: nextReviewData.statement,
        userName: nextReviewData.userName,
        timestamp: nextReviewData.timestamp
      },
    ]);
    setHasMore((reviewArray.length + 1) < reviewCount ? true : false);
  }

  function syncReviewToBePosted(event: ChangeEvent) {
    const { name, value } = event.target as HTMLInputElement;

    setReviewToBePosted((prevReviewToBePosted) => {
      return {
        ratingScore: (name === "reviewRatingScore" ? Number(value) : prevReviewToBePosted?.ratingScore),
        statement: (name === "reviewTextArea" ? value : prevReviewToBePosted?.statement),
        userName: prevReviewToBePosted?.userName,
        timestamp: prevReviewToBePosted?.timestamp
      };
    })
  }

  async function addReview(reviewToBePosted: Review) {
    const docRef = await addDoc(collection(db, `restaurants/${restaurantName}/reviews`), {
      ratingScore: reviewToBePosted.ratingScore,
      statement: reviewToBePosted.statement,
      userName: currentUser ? currentUser.displayName : "anonymous",
      timestamp: Date.now()
    });
    console.log("Document written with ID: ", docRef.id);

    setReviewCount(reviewCount + 1);
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
              layout="fill"
              objectFit="contain"
              priority
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
              name="reviewRatingScore"
              value={reviewToBePosted ? reviewToBePosted.ratingScore : 0}
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
                  value={reviewToBePosted?.statement}
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
          endMessage={<p>You have seen it all</p>}
        >
          {reviewArray.map((review, index) => {
            return (
              <Review
                id={review.id}
                key={index}
                star={review.ratingScore}
                statement={review.statement}
                userName={review.userName}
                isAuthenticated={currentUser !== null ? "true" : "false"}
                sessionUserName={
                  currentUser !== null
                    ? currentUser.displayName
                    : "anonymous"
                }
                name={restaurantName}
                deleteReview={deleteReview}
                editReview={editReview}
                isEditing={review.id === editingID ? true : false}
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
