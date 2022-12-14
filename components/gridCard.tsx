import styles from "../styles/gridCard.module.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import _ from "lodash";
import { useRouter } from "next/router";

type GridCardProps = {
  imgSrc?: string;
  imgAlt?: string;
  title?: string;
  subTitle?: string;
  isBigSize?: boolean;
  linkHref?: string;
}

const GridCard: React.FC<GridCardProps> = ({ imgSrc = null, imgAlt = null, title = null, subTitle = null, isBigSize = false, linkHref = null }) => {
  const router = useRouter();

  return (
    <>
      <Col>
        <Card className={styles.card}>
          {imgSrc&&<button className={styles.cardButton} onClick={() => { linkHref && router.push(linkHref) }} style={{ cursor: linkHref ? "pointer" : "default" }}>
            <Card.Img
              className={isBigSize?styles.cardImgBigSize:styles.cardImg}
              variant="top"
              src={imgSrc}
              alt={imgAlt ? imgAlt : title ? title : "Image"}
            />
            {title && <Card.Body>
              <Card.Title className={subTitle ? styles.cardTitleSubTitle : styles.cardTitleOnly} data-cy="cardTitle">
                <span data-cy="title">{title}</span>
                <span data-cy="subTitle">{subTitle}</span>
              </Card.Title>
            </Card.Body>}
          </button>}
        </Card>
      </Col>
    </>
  );
}

export default GridCard;