import Image from "next/image";
import Review from "./review";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import MyImage from "../utils/imageLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styles from "./detailCard.module.css";
import Rating from "@mui/material/Rating";
import axios from "axios";

export default function DetailCard(props) {
  var totalCount = 0;
  const [reviews, setReviews] = useState(props.review);
  const [hasMore, setHasMore] = useState(true);
  const [reviewWrite, setReviewWrite] = useState({
    star: null,
    text: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  async function getMoreReviews() {
    console.log("getMoreReviews triggered");

    const res = await fetch(
      `http://localhost:1337/api/reviews?filters[name][$eq]=${props.name}&fields[0]=review&pagination[start]=${reviews.length}&pagination[limit]=1`
    );
    const data = await res.json();
    const parsed = data.data;

    setReviews((reviews) => [...reviews, ...parsed]);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setReviewWrite((prevReviewWrite) => {
      if (name === "reviewStar") {
        return {
          star: Number(value),
          text: prevReviewWrite.text,
        };
      } else {
        return {
          star: prevReviewWrite.star,
          text: value,
        };
      }
    });
  }

  function toggleHidden() {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    setHasMore(reviews.length < props.totalCount ? true : false);
  }, [reviews]);

  const addReview = async (reviewWrite) => {

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
            review: reviewWrite.text,
          },
        },
      }),
    });

    console.log("posted!")

    const reRender = await fetch(`http://localhost:1337/api/reviews?filters[name][$eq]=${props.name}&fields[0]=review&pagination[start]=0&pagination[limit]=1&pagination[withCount]=true`)
    const data = await reRender.json();
    totalCount = data.meta.pagination.total;


    // setReviews((reviews) => [...reviews, reviewWrite]);
  };

  return (
    <>
      <h1>{props.name}</h1>
      <main>
        <section class="py-5 text-center container">
          {MyImage()}
          {/* <Image
            src="https://img.freepik.com/free-vector/burger-restaurant-menu-template-with-illustrations_1361-1505.jpg?w=1480&t=st=1665436786~exp=1665437386~hmac=9049ebecc677613bebedaa1c91568398f1da22da7c6c61eea2f4b13b8f54e156"
            width="900px"
            height="500px"
            layout="intrinsic"
            alt="banner"
          /> */}
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

                    {/* <Image
                        src="https://cdn-icons-png.flaticon.com/512/84/84042.png"
                        width="300px"
                        height="300px"
                      ></Image> */}
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
                      value={reviewWrite.text}
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

            {/* Review */}
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
                    key={index}
                    star={foundItem.attributes.review.star}
                    statement={foundItem.attributes.review.review}
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
      {/* <script
        src="/docs/5.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        crossorigin="anonymous"
      ></script> */}
    </>
  );
}
