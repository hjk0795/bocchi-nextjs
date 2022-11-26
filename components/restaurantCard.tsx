import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import styles from "./restaurantCard.module.css";
import Link from "next/link";
import _ from "lodash";

export default function RestaurantCard(props) {
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
                <span>{props.averageStar}</span>
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
}
