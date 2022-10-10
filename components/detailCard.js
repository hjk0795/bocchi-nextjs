import Image from "next/image";
import Review from "./review";
import Carousel from 'react-bootstrap/Carousel';

export default function DetailCard(props) {
    const parsed = JSON.parse(props.review);


  return (
    <>
      <h1>{props.name}</h1>
      <main>
        <section class="py-5 text-center container">
          <Image
            src="https://img.freepik.com/free-vector/hot-dog-restaurant-menu-template-with-illustrations_1361-1507.jpg?w=1480&t=st=1665352005~exp=1665352605~hmac=5add2beab207bb6a6c8be2fc5ece529e4a1ef6d3ecafa9689855333b79379595"
            width="900px"
            height="500px"
            layout="intrinsic"
            alt="banner"
          />
          <br></br>
          <span>
            <Link href="https://www.freepik.com/free-vector/hot-dog-restaurant-menu-template-with-illustrations_5059593.htm#query=food%20menu&position=1&from_view=keyword" passHref={true}>
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
                    <Carousel style={{filter: "invert(100%)"}}>
                      <Carousel.Item>
                        <img style={{filter: "invert(100%)"}}
                          className="d-block w-100"
                          src="https://cdn-icons-png.flaticon.com/512/84/84042.png"
                          alt="First slide"
                        />
                       
                      </Carousel.Item>
                      <Carousel.Item>
                        <img style={{filter: "invert(100%)"}}
                          className="d-block w-100"
                          src="https://cdn-icons-png.flaticon.com/512/84/84042.png"
                          alt="Second slide"
                        />

                        
                      </Carousel.Item>
                      <Carousel.Item>
                        <img style={{filter: "invert(100%)"}}
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
            {parsed.map((foundItem)=> {
                return <Review star={foundItem.star} statement={foundItem.statement} />
            })}
            
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
