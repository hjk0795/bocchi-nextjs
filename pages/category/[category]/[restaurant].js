import connectionCheck from "../../../utils/connectionCheck";
import Restaurant from "../../../models/restaurantModel";
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
  const url = process.env.STRAPI_URL;
  const res = await fetch(
    `${url}/reviews?filters[name][$eq]=${params.restaurant}&fields[0]=review&fields[1]=userName&pagination[start]=0&pagination[limit]=2&pagination[withCount]=true`
  );
  const data = await res.json();
  const reviewArray = data.data;
  const totalCount = data.meta.pagination.total;
  const restaurantDetailSanitized = JSON.parse(
    JSON.stringify(restaurantDetail)
  );


  return {
    props: {
      restaurantDetailSanitized,
      reviewArray,
      totalCount,
    },
  };
}



export default function RestaurantList({
  restaurantDetailSanitized,
  reviewArray,
  totalCount,
}) {
  return (
    <>
      <DetailCard
        name={restaurantDetailSanitized.name}
        review={reviewArray}
        totalCount={totalCount}
      />
    </>
  );
}
