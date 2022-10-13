import Image from "next/image";
import Review from "./review";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import MyImage from "../utils/imageLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import axios from "axios";


export default function DetailCard(props) {
  const [reviews, setReviews] = useState(props.review);

  

  var data = JSON.stringify({
    "collection": "restaurants",
    "database": "bocchiDB",
    "dataSource": "Cluster0",
    "filter": { name: props.name},
    "projection": {
      "_id": 0,
      "category": 0,
        "brandImg": 0,
        "name": 0,
        "foodImg": 0,
        "menuImg": 0,
        "openingHours": 0,
        "location": 0,
      "review": {$slice: [reviews.length,2]}
  }
});


  var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-ycggt/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.API_KEY_MONGO,
    },
    data: data
};

axios(config)
.then(function (response) {
  var parsed = JSON.parse(JSON.stringify(response.data)).document.review;
  var parsedSanitized = JSON.parse(JSON.stringify(parsed));


  // console.log(parsedSanitized);
  // const newReviews = parsedSanitized.json();

  setReviews((reviews) => {
          [...reviews, ...parsedSanitized];
        });
})
.catch(function (error) {
    console.log(error);
});


  // function getMoreReviews() {
 
  //   };

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

            {/* Review */}
            {/* <InfiniteScroll
              dataLength={reviews.length}
              next={getMoreReviews}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={<p>You have seen it all</p>}
            > */}
              {reviews.map((foundItem, index) => {
                return (
                  <Review
                    key={index}
                    star={foundItem.star}
                    statement={foundItem.statement}
                  />
                );
              })}
            {/* </InfiniteScroll> */}
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
