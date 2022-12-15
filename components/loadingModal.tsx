import styles from "../styles/loadingModal.module.css";
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { RedirectionUIProps } from "./redirectionUI";
import { useState, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/router";

export type LoadingModalProps = {
    modalShow?: boolean,
    setModalShow?: Dispatch<SetStateAction<boolean>>
  };

export default function LoadingModal({ modalShow }: LoadingModalProps) {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const router = useRouter();

    if (modalShow === true) {
        if (elapsedSeconds === 10) {
            const redirectionUIProps: RedirectionUIProps = { title: "Request Timeout", message: "API server does not respond", pageToRedirect: "/login", isAutoRedirect: true }
            document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
            router.push("/redirection");
        } else {
            setTimeout(() => {
                setElapsedSeconds(elapsedSeconds + 1);
            }, 1000);
        }
    }

    return (
        <Modal
            show={modalShow}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName={styles.modalDialog}>

            <Modal.Body>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> <br />
                {(elapsedSeconds >= 3) && <small>Taking longer than usual..</small>}
            </Modal.Body>
        </Modal>
    );
}