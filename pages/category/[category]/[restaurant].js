import connectMongo from "../../../utils/connectionCheck";
import Restaurant from "../../../models/restaurantModel";
import RestaurantCard from "../../../components/restaurantCard";
import Row from "react-bootstrap/Row";
import DetailCard from "../../../components/detailCard";

export async function getStaticPaths() {
  await connectMongo();

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
  await connectMongo();

  const restaurantDetail = await Restaurant.findOne({
    name: params.restaurant,
  }).exec();

  const restaurantDetailSanitized = JSON.parse(
    JSON.stringify(restaurantDetail)
  );

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
