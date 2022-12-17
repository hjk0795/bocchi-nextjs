import styles from "../styles/category.module.css";
import GridCard from "../components/gridCard";
import FlaticonAttribution from "../components/flaticonAttribution";
import Row from "react-bootstrap/Row";
import _ from "lodash";
import { getCategoryList } from "../utils/getCategoryList";

export type CategoryObject = {
  name: string,
  src: string,
  alias?: string
}

export default function Category() {
  const categoryList = getCategoryList();

  return (
    <>
      <Row xs={1} sm={2} md={3} lg={4} className="g-2">
        {categoryList.map((category, index) => {
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
        {categoryList.map((category, index) => {
          return (
            <FlaticonAttribution key={"flaticon" + index} name={_.lowerCase(category.name)} alias={category.alias} />
          );
        })}
      </footer>
    </>
  );
}
