import styles from "./review.module.css";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { doc, deleteDoc, where, setDoc } from "firebase/firestore";
import {db} from "../firebase-config";
import { useState } from "react";

export default function Review(props) {
  const [editStatement, setEditStatement] = useState("");

  function numToStar(num) {
    var star = "";

    for (let i = 0; i < num; i++) {
      star = star + "★";
    }

    return star;
  }

  async function deleteReview() {

    await deleteDoc(
      doc(db, `restaurants/${props.name}/reviews`, `${props.id}`)
    );

    alert("Deleted");
    props.deleteReview(props.id);
  }

  function editReview() {
    props.editReview(props.id);
  }

  async function saveReview() {

    await setDoc(
      doc(db, `restaurants/${props.name}/reviews`, `${props.id}`),
      {
        statement: editStatement,
      },
      { merge: true }
    );

    props.saveReview(props.id, editStatement);
  }

  function handleChange(e) {
    setEditStatement(e.target.value);
  }

  return (
    <>
      <div className="row g-3" style={{ paddingTop: "16px" }}>
        <div className="col-3">
          <div className="card-text">
            <div className="row row-cols-1 g-3">
              <div className="col">
                <div className="d-flex justify-content-between align-items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/84/84042.png"
                    width="100%"
                    height="100%"
                    alt="table image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{numToStar(props.star)}</small>
                {props.isAuthenticated === "authenticated" &&
                  props.userName === props.sessionUserName && (
                    <small>
                      {props.isEditing ? (
                        <AiOutlineCheckSquare
                          className={styles.AiEdit}
                          style={{ marginRight: "5px", cursor: "pointer" }}
                          onClick={saveReview}
                        />
                      ) : (
                        <BiEdit
                          className={styles.BiEdit}
                          style={{ marginRight: "5px", cursor: "pointer" }}
                          onClick={editReview}
                        />
                      )}

                      <BsTrash
                        className={styles.BsTrash}
                        style={{ cursor: "pointer" }}
                        onClick={deleteReview}
                      />
                    </small>
                  )}
              </div>

              {props.isEditing ? (
                <input
                  type="text"
                  defaultValue={props.statement}
                  onChange={handleChange}
                  value={editStatement}
                />
              ) : (
                <p className={`card-text ${styles.cardText}`}>{props.statement}</p>
              )}

              <div className="d-flex justify-content-end align-items-center">
                <small className="text-muted">{props.userName}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
