import styles from "../styles/review.module.css";
import Image from "next/legacy/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { millisecondsToDate } from "../utils/millisecondsToDate";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "firebase/auth";
import { BiEdit } from "react-icons/bi";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

type ReviewProps = {
  id: string;
  ratingScore: number;
  statement: string;
  timestamp: number;
  userName: string;
  currentUser: User;
  isEditing: boolean;
  setEditingID: Dispatch<SetStateAction<string>>;
  saveReview: (id: string, newStatement: string) => Promise<void>;
  deleteReview: (id: string) => void;
}

const Review: React.FC<ReviewProps> = ({ id, ratingScore, statement, timestamp, userName, currentUser, isEditing, setEditingID, saveReview, deleteReview }) => {
  const [newStatement, setNewStatement] = useState(statement);

  function numToStar(num: number) {
    let star = "";

    for (let i = 0; i < num; i++) {
      star += "★";
    }

    return star;
  }

  return (
    <>
      <Row className={`${styles.container} g-3`} data-cy="reviewContainer">
        <Col xs={3}>
          <div className={styles.imgContainer}>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/84/84042.png"
              alt="review image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted" data-cy="ratingScore">{numToStar(ratingScore)}</small>
                {(currentUser?.displayName === userName) && (
                  <small>
                    {isEditing ? (
                      <AiOutlineCheckSquare
                        className={styles.icon}
                        onClick={() => {
                          saveReview(id, newStatement);
                        }}
                        data-cy="AiOutlineCheckSquare"
                      />
                    ) : (
                      <BiEdit
                        className={styles.icon}
                        onClick={() => {
                          setEditingID(id);
                        }}
                        data-cy="BiEdit"
                      />
                    )}

                    <BsTrash
                      className={styles.icon}
                      onClick={() => {
                        deleteReview(id);
                      }}
                      data-cy="BsTrash"
                    />
                  </small>
                )}
              </div>

              {isEditing ? (
                <input
                  type="text"
                  onChange={(e) => {
                    setNewStatement(e.target.value);
                  }}
                  value={newStatement ? newStatement : statement}
                  data-cy="newStatement"
                />
              ) : (
                <p className={`card-text ${styles.cardText}`} data-cy="statement">
                  {statement}
                </p>
              )}

              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted" data-cy="toDateString">{millisecondsToDate(timestamp).full}</small>
                <small className="text-muted" data-cy="userName">{userName}</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Review;