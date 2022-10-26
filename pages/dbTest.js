import Restaurant from "../models/restaurantModel";
import connectionCheck from "../utils/connectFirestore";

export default async function DBTest(req, res)  {
await connectionCheck();

  const restaurant = new Restaurant({
    category: "sushi",
    brandImg: "https://stpierres.co.nz/images/20180406142932.jpeg",
    name: "Test",
    foodImg:
      "https://images.freeimages.com/images/large-previews/609/rainbow-roll-1329728.jpg",
    location:
      "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJL0iBq4dJDW0RadyRVf53vhc&key=",
    menuImg: "https://picsum.photos/200/300",
    openingHours: "9am to 6pm (today)",
    review: [
      {
        star: "5",
        statement: "test1",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },{
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
      {
        star: "2",
        statement: "test2",
      },
    ],
  });

  restaurant.save();
  res.send("test");
}
