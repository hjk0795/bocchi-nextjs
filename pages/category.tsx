import styles from "../styles/category.module.css";
import GridCards from "../components/gridCards";
import Head from "next/head";
import Link from "next/link";
import Row from "react-bootstrap/Row";
import FlaticonAttribution from "../components/flaticonAttribution";

export default function Category() {
  var categoryList = [
    {
      title: "Sushi",
      src: "https://cdn-icons-png.flaticon.com/512/1539/1539701.png",
    },
    {
      title: "Donburi",
      src: "https://cdn-icons-png.flaticon.com/512/3978/3978700.png",
    },
    {
      title: "Ramen",
      src: "https://cdn-icons-png.flaticon.com/512/1046/1046850.png",
    },
    {
      title: "Burger",
      src: "https://cdn-icons-png.flaticon.com/512/3075/3075935.png",
    },
    {
      title: "?",
      src: "https://cdn-icons-png.flaticon.com/512/84/84042.png",
    },
  ];

  return (
    <>
      <Head>
        <title>bocchi</title>
      </Head>

      <Row xs={1} md={2} lg={4} className="g-2">
        {categoryList.map((category, index) => {
          return (
            <GridCards key={index} title={category.title} src={category.src} />
          );
        })}
      </Row>

      <footer className={styles.attribution}>
      Icons are created by Freepik - Flaticon. Links:
        <FlaticonAttribution
        name="sushi"
        />
        <FlaticonAttribution
        name="food-and-restaurant"
        alias="donburi"
        />
        <FlaticonAttribution
        name="ramen"
        />
        <FlaticonAttribution
        name="burger"
        />
        <FlaticonAttribution
        name="question-mark"
        />
      </footer>
    </>
  );
}
