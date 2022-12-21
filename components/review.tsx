import styles from "../styles/review.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/legacy/image";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "firebase/auth";

type ReviewProps = {
  id: string;
  ratingScore: number;
  statement: string;
  timestamp: number;
  userName: string;
  currentUser: User;
  isEditing: boolean;
  setEditingID: Dispatch<SetStateAction<string>>;
  deleteReview: (id: string) => void;
  saveReview: (id: string, newStatement: string) => Promise<void>;
}

export default function Review({ id, ratingScore, statement, timestamp, userName, currentUser, isEditing, setEditingID, deleteReview, saveReview }: ReviewProps) {
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
      <Row className={`${styles.container} g-3`} >
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
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{numToStar(ratingScore)}</small>
                {(currentUser?.displayName === userName) && (
                  <small>
                    {isEditing ? (
                      <AiOutlineCheckSquare
                        className={styles.icon}
                        onClick={() => {
                          saveReview(id, newStatement);
                        }}
                      />
                    ) : (
                      <BiEdit
                        className={styles.icon}
                        onClick={() => {
                          setEditingID(id);
                        }}
                      />
                    )}

                    <BsTrash
                      className={styles.icon}
                      onClick={() => {
                        deleteReview(id);
                      }}
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
                />
              ) : (
                <p className={`card-text ${styles.cardText}`}>
                  {statement}
                </p>
              )}

              <div className="d-flex justify-content-end align-items-center">
                <small className="text-muted">{userName}</small>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
