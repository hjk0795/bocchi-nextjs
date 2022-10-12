import connectionCheck from "../../../utils/connectionCheck";
import Restaurant from "../../../models/restaurantModel";
import RestaurantCard from "../../../components/restaurantCard";
import Row from "react-bootstrap/Row";
import DetailCard from "../../../components/detailCard";

export async function getStaticPaths() {
    await connectionCheck();

  const categoryNames = ["sushi", "donburi", "ramen", "burger"];

  const RestAllInfo = await Restaurant.find({}).exec();
  const RestAllInfoSanitized = JSON.parse(JSON.stringify(RestAllInfo));

  var temp = [];
  categoryNames.map((categoryName) => {
    for (const element of RestAllInfoSanitized) {
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
    await connectionCheck();

  const restaurantDetail = await Restaurant.findOne({
    name: params.restaurant,
  }).exec();

  const reviewProjected = await Restaurant.find({
    name: params.restaurant,
  }).select({ 
    "_id": 0,
    "category": 0,
    "brandImg": 0,
    "name": 0,
    "foodImg": 0,
    "menuImg": 0,
    "openingHours": 0,
    "location": 0,
    "review": { "$slice": 1 } 
  }).exec()


  const restaurantDetailSanitized = JSON.parse(
    JSON.stringify(restaurantDetail)
  );

  console.log(reviewProjected);

  return {
    props: {
      restaurantDetailSanitized,
    },
  };
}

export default function RestaurantList({ restaurantDetailSanitized }) {
  return (
    <>
      <DetailCard name={restaurantDetailSanitized.name} review={restaurantDetailSanitized.review} />
    </>
  );
}
