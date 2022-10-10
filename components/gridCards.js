import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import styles from "./gridCards.module.css";
import Link from "next/link";
import _ from "lodash";

export default function GridCards(props) {
  return (
    <>
      <Col>
        <Link href={`/category/${_.lowerCase(props.title)}`}>
          <Card style={{ width: "14rem" }}>
            <Card.Img
              variant="top"
              src={props.src}
              style={{ height: "200px", padding: "1rem" }}
              alt="category"
            />
            <Card.Body>
              <Card.Title className={styles.cardTitle}>
                {props.title}
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
}
