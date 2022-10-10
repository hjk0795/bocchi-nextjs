import GridCards from "../components/gridCards";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Head from "next/head";
import styles from "../styles/category.module.css";
import Link from "next/link";
import Row from "react-bootstrap/Row";

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

      <Link href="https://www.flaticon.com/free-icons/sushi" title="sushi icons" passHref={true}>Sushi icons created by Freepik - Flaticon</Link>
      <Link href="https://www.flaticon.com/free-icons/food-and-restaurant" title="food and restaurant icons" passHref={true}>Food and restaurant icons created by Freepik - Flaticon</Link>
      <Link href="https://www.flaticon.com/free-icons/ramen" title="ramen icons" passHref={true}>Ramen icons created by Freepik - Flaticon</Link>
      <Link href="https://www.flaticon.com/free-icons/burger" title="burger icons" passHref={true}>Burger icons created by Freepik - Flaticon</Link>
      <Link href="https://www.flaticon.com/free-icons/question-mark" title="question mark icons" passHref={true}>Question mark icons created by Freepik - Flaticon</Link>
    </>
  );
}