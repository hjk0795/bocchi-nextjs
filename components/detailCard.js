import Review from "./review";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import MyImage from "../utils/imageLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./detailCard.module.css";
import Rating from "@mui/material/Rating";
import { useSession } from "next-auth/react";

export default function DetailCard(props) {
  const reviewPropArray = props.review.map((foundItem, index) => {
    return {
      star: foundItem.star,
      review: foundItem.statement,
      userName: foundItem.userName,
      id: 99999
    };
  });

  const { data: session, status } = useSession()
  const name = props.name;
  const [totalCount, setTotalCount] = useState(props.totalCount);
  const [hasMore, setHasMore] = useState(true);
  var [reviews, setReviews] = useState(reviewPropArray);
  const [reviewWrite, setReviewWrite] = useState({
    star: null,
    review: "",
    userName: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  async function getMoreReviews() {
    const res = await fetch(
      `http://localhost:1337/api/reviews?filters[name][$eq]=${name}&fields[0]=review&fields[1]=userName&pagination[start]=${reviews.length}&pagination[limit]=1`
    );
    const data = await res.json();

    console.log(data);
    const parsed = data.data;

    reviews = [
      ...reviews,
      {
        star: parsed[0].attributes.review.star,
        review: parsed[0].attributes.review.review,
        userName: parsed[0].attributes.userName,
        id: parsed[0].id
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
          review: prevReviewWrite.text,
        };
      } else {
        return {
          star: prevReviewWrite.star,
          review: value,
        };
      }
    });
  }

  function toggleHidden() {
    setIsChecked(!isChecked);
  }

  const addReview = async (reviewWrite) => {
    if (status === "authenticated") {
    const result = await fetch(`http://localhost:1337/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: props.name,
          review: {
            star: reviewWrite.star,
            review: reviewWrite.review,
          },
          userName: session.user.name,
        },
      }),
    });
  } else if (status === "unauthenticated") {
    const result = await fetch(`http://localhost:1337/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: props.name,
          review: {
            star: reviewWrite.star,
            review: reviewWrite.review,
          },
          userName: "anonymous"
        },
      }),
    });
  }
    console.log("posted!");
    totalCount = totalCount + 1;
    setHasMore(true);
  };

  return (
    <>
      <h1>{name}</h1>
      <main>
        <section class="py-5 text-center container">
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
        </section>

        <div class="album py-5 bg-light">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
              <div class="col">
                <div class="card shadow-sm" style={{ height: "100%" }}>
                  <div class="card-body">
                    Google map
                    {/* <iframe
                      width="100%"
                      height="100%"
                      style={{ border: "0" }}
                      loading="lazy"
                      allowfullscreen
                      src={`https://www.google.com/maps/embed/v1/view?zoom=17&center=-36.8451%2C174.7675&key=${process.env.API_KEY_GOOGLE}`}
                    ></iframe> */}
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm" style={{ height: "100%" }}>
                  <div class="card-body">
                    <Carousel style={{ filter: "invert(100%)" }}>
                      <Carousel.Item>
                        <img
                          style={{ filter: "invert(100%)" }}
                          className="d-block w-100"
                          src="https://cdn-icons-png.flaticon.com/512/84/84042.png"
                          alt="First slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          style={{ filter: "invert(100%)" }}
                          className="d-block w-100"
                          src="https://cdn-icons-png.flaticon.com/512/84/84042.png"
                          alt="Second slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          style={{ filter: "invert(100%)" }}
                          className="d-block w-100"
                          src="https://cdn-icons-png.flaticon.com/512/84/84042.png"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-3 d-flex justify-content-between align-items-center">
                <Rating
                  name="reviewStar"
                  value={reviewWrite.star}
                  size="small"
                  style={{ padding: "7px 0 0 7px" }}
                  onChange={handleChange}
                />
              </div>
              <div class="col-9">
                <div class="mt-3">
                  <div className={styles.textareaContainer}>
                    <textarea
                      class="form-control"
                      rows={isChecked ? "3" : "1"}
                      name="reviewText"
                      placeholder="Write a review"
                      onChange={handleChange}
                      value={reviewWrite.review}
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
                    statement={foundItem.review}
                    userName={foundItem.userName}
                    isAuthenticated={status}
                    sessionUserName={status==="authenticated"?session.user.name:"anonymous"}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </main>

      <footer class="text-muted py-5">
        <div class="container">
          <p class="float-end mb-1">
            <a href="#">Back to top</a>
          </p>
        </div>
      </footer>
    </>
  );
}
