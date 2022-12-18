import Review from "./review";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import MyImage from "../utils/imageLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
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
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import GridCard from "./gridCard";
import GridCardCarousel from "./gridCardCarousel";
import { getDownloadURL, listAll, ref, StorageReference } from "firebase/storage";

export default function DetailCard(props) {
  
    const reviewPropArray = props.review.map((foundItem, index) => {
      return {
        star: foundItem.star,
        statement: foundItem.statement,
        userName: foundItem.userName,
        id: foundItem.id,
      };
    });

    const name = props.name;
    var [totalCount, setTotalCount] = useState(props.totalCount);
    const [hasMore, setHasMore] = useState(true);
    var [reviews, setReviews] = useState(reviewPropArray);
    const [reviewWrite, setReviewWrite] = useState({
      star: 0,
      statement: "",
      userName: "",
      id: 0,
    });
    const [isChecked, setIsChecked] = useState(false);
    const [editingID, setEditingID] = useState("-1");
    var [isExecuted, setIsExecuted] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    if (isExecuted === false) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      });
      setIsExecuted(true);
    }


    async function getMoreReviews() {

      const next = query(
        collection(db, `restaurants/${name}/reviews`),
        orderBy("id"),
        startAfter(reviews.length),
        limit(1)
      );

      const querySnapshot = await getDocs(next);

      const nextReview = querySnapshot.docs[0];

      reviews = [
        ...reviews,
        {
          id: nextReview.data().id,
          star: nextReview.data().star,
          statement: nextReview.data().statement,
          userName: nextReview.data().userName,
        },
      ];

      setReviews(reviews);
      setHasMore(reviews.length < totalCount ? true : false);
    }

    function handleChange(event) {
      const { name, value } = event.target;

      setReviewWrite((prevReviewWrite) => {
        if (name === "reviewStar") {
          return {
            star: Number(value),
            statement: String(prevReviewWrite.statement),
            userName: String(prevReviewWrite.userName),
            id: Number(prevReviewWrite.id),
          };
        } else {
          return {
            star: Number(prevReviewWrite.star),
            statement: String(value),
            userName: String(prevReviewWrite.userName),
            id: Number(prevReviewWrite.id),
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
          doc(db, `restaurants/${name}/reviews`, `${reviews.length + 1}`),
          {
            id: reviews.length + 1,
            star: `${reviewWrite.star}`,
            statement: `${reviewWrite.statement}`,
            userName: `${currentUser.displayName}`,
          }
        );
      } else if (currentUser === null) {
        const docRef = await setDoc(
          doc(db, `restaurants/${name}/reviews`, `${reviews.length + 1}`),
          {
            id: reviews.length + 1,
            star: `${reviewWrite.star}`,
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
      setReviews(
        reviews.filter((review) => {
          return review.id !== id;
        })
      );
    }

    function editReview(id) {
      setEditingID(id);
    }

    function saveReview(id, editStatement) {
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].id === id) {
          reviews[i].statement = editStatement;
        }
      }

      setEditingID("-1");
    }

    return (
      <>
        {/* <h1>{name}</h1> */}
        <main>
          {/* <section className="py-5 text-center container">
          {MyImage()}
          <br></br>
          <span>
            <Link
              href="https://www.freepik.com/free-vector/hot-dog-restaurant-menu-template-with-illustrations_5059593.htm#query=food%20menu&position=1&from_view=keyword"
              passHref={true}
            >
              Image by BiZkettE1
            </Link>{" "}
            on Freepik
          </span>
        </section> */}





          {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3"> */}
          <Row className="g-2" lg={2}>
            <GridCard
            imgSrc='https://firebasestorage.googleapis.com/v0/b/bocchi-cd32c.appspot.com/o/images%2Fsushi1%2Ftable%2F3.png?alt=media&token=53b00c6d-e9aa-4179-85b4-6bbabb43ba07' 
            />
            <GridCardCarousel
              imgURLArray={props.imgURLArray}
              imgAlt="table"
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


          <div className="row">
            <div className="col-3 d-flex justify-content-between align-items-center">
              <Rating
                name="reviewStar"
                value={reviewWrite.star}
                size="small"
                style={{ padding: "7px 0 0 7px" }}
                onChange={handleChange}
              />
            </div>
            <div className="col-9">
              <div className="mt-3">
                <div className={styles.textareaContainer}>
                  <textarea
                    className="form-control"
                    rows={isChecked ? 3 : 1}
                    name="reviewText"
                    placeholder="Write a review"
                    onChange={handleChange}
                    value={reviewWrite.statement}
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
            </div>
          </div>

          <InfiniteScroll
            dataLength={reviews.length}
            next={getMoreReviews}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>You have seen it all</p>}
          >
            {reviews.map((foundItem, index) => {
              return (
                <Review
                  id={foundItem.id}
                  key={index}
                  star={foundItem.star}
                  statement={foundItem.statement}
                  userName={foundItem.userName}
                  isAuthenticated={currentUser !== null ? "true" : "false"}
                  sessionUserName={
                    currentUser !== null
                      ? currentUser.displayName
                      : "anonymous"
                  }
                  name={name}
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
          <div className="container">
            <p className="float-end mb-1">
              <a href="#">Back to top</a>
            </p>
          </div>
        </footer>
      </>
    );
  }
