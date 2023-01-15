import styles from "../../styles/category.module.css";
import GridCard from "../../components/gridCard";
import FlaticonAttribution from "../../components/flaticonAttribution";
import Row from "react-bootstrap/Row";
import _ from "lodash";
import { getCategoryArray } from "../../utils/getCategoryArray";
import { NextPage } from "next/types";

const Category: NextPage = () => {
  const categoryArray = getCategoryArray();

  return (
    <>
      <Row xs={1} sm={2} md={3} lg={4} className="g-2">
        {categoryArray.map((category, index) => {
          return (
            <GridCard
              key={index}
              imgSrc={category.src}
              title={category.name}
              linkHref={`/category/${_.lowerCase(category.name)}`}
            />
          );
        })}
      </Row>

      <footer className={styles.attribution}>
        Icons are created by Freepik - Flaticon. <br /> Links:
        {categoryArray.map((category, index) => {
          return (
            <FlaticonAttribution key={"flaticon" + index} name={category.name === "?" ? "question-mark" : _.lowerCase(category.name)} alias={category.alias} />
          );
        })}
      </footer>
    </>
  );
}

export default Category;