import connectMongo from "../../utils/connectMongo";
import Restaurant from "../../models/restaurantModel";

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
  console.log("test");
  await connectMongo();

  const restaurantData = await Restaurant.findOne({
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
  return <h1>{restaurantDataSanitized.name}</h1>;
}
