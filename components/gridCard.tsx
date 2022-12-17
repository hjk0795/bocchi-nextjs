import styles from "../styles/gridCard.module.css"
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import _ from "lodash";
import { useRouter } from "next/router";

type GridCardProps = {
  imgSrc: string,
  imgAlt?: string,
  title?: string,
  subTitle?: string
  linkHref?: string,
}

export default function GridCard({ imgSrc, imgAlt = null, title = null, subTitle = null, linkHref = null }: GridCardProps) {
  const router = useRouter();

  return (
    <>
      <Col>
        <Card className={styles.card}>
          <button className={styles.cardButton} onClick={() => { linkHref && router.push(linkHref) }} style={{ cursor: linkHref ? "pointer" : "default" }}>
            <Card.Img
              className={styles.cardImg}
              variant="top"
              src={imgSrc}
              alt={imgAlt ? imgAlt : title ? title : "Image"}
            />
            <Card.Body>
              <Card.Title className={subTitle && styles.cardTitle}>
                <span>{title}</span>
                <span>{subTitle}</span>
              </Card.Title>
            </Card.Body>
          </button>
        </Card>
      </Col>
    </>
  );
}