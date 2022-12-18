import styles from "../styles/gridCard.module.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import _ from "lodash";

type GridCardCarouselProps = {
    imgURLArray: string[],
    imgAlt?: string
}

export default function GridCardCarousel({ imgURLArray, imgAlt = null }: GridCardCarouselProps) {
    return (
        <>
            <Col>
                <Card className={styles.card}>
                    <Carousel style={{ filter: "invert(100%)" }}>
                        {imgURLArray.map((imgURL, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <Card.Img
                                        className={`${styles.cardImg} d-block w-100`}
                                        style={{ filter: "invert(100%)" }}
                                        variant="top"
                                        src={imgURL}
                                        alt={imgAlt + " image " + (index+1)}
                                    />
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </Card>
            </Col>
        </>
    );
}