import GridCards from "../components/gridCards";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Head from "next/head";
import styles from "../styles/category.module.css";
import Link from "next/link";
import Row from "react-bootstrap/Row";
// import CssBaseline from '@mui/material/CssBaseline';

export default function Category() {
  var categoryList = [
    {
      title: "Sushi",
      src: "https://images.freeimages.com/images/large-previews/ac4/sushi-on-a-japanese-plate-9-1324901.jpg",
    },
    {
      title: "Donburi",
      src: "https://images.freeimages.com/images/previews/fb0/donburi-1317504.jpg",
    },
    {
      title: "Ramen",
      src: "https://images.freeimages.com/variants/aLS1Anur3eUVLXz19bEEcX5D/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d",
    },
    {
      title: "Burger",
      src: "https://images.freeimages.com/images/previews/271/big-mac-1256385.jpg",
    },
    {
      title: "?",
      src: "https://images.freeimages.com/images/previews/2c7/question-mark-4-1237384.jpg",
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
    </>
  );
}
