import connectionCheck from "../../../utils/connectionCheck";
import Restaurant from "../../../models/restaurantModel";
import RestaurantCard from "../../../components/restaurantCard";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import _ from "lodash";

export async function getStaticPaths() {
  const categoryNames = ["sushi", "donburi", "ramen", "burger"];

  const paths = categoryNames.map((categoryName) => {
    return {
      params: {
        category: categoryName,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  await connectionCheck();

  const restaurantData = await Restaurant.find({
    category: params.category,
  }).exec();

  const restaurantDataSanitized = JSON.parse(JSON.stringify(restaurantData));

  return {
    props: {
      restaurantDataSanitized,
    },
  };
}

export default function RestaurantList({ restaurantDataSanitized }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-2">
      {restaurantDataSanitized.map((foundItem, index) => {
        return <RestaurantCard key={index} name={foundItem.name} category={foundItem.category} review={foundItem.review} brandImg={foundItem.brandImg}/>;
      })}
    </Row>
  );
}
