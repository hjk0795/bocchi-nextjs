import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import styles from "./restaurantCard.module.css";
import Link from "next/link";
import _ from "lodash";

export default function RestaurantCard(props) {

  // var sum = 0;
  // var count = 0;

  // for (const element of props.review) {
  //   sum = sum + parseInt(element.star);
  //   count = count + 1;
  // }

  // const averageStar = sum / count;
  const averageStar = 3;


  return (
    <>
      <Col>
        <Link href={`/category/${_.lowerCase(props.category)}/${props.name}`}>
          <Card style={{ width: "19rem" }}>
            <Card.Img
              variant="top"
              src={props.brandImg}
              style={{ height: "200px" }}
              alt="brand"
            />
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.title}>
                <span>{props.name}</span>
                <span>{averageStar}</span>
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
}
