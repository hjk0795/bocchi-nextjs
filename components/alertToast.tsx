import styles from "../styles/alertToast.module.css";
import Toast from 'react-bootstrap/Toast';
import { SetStateAction, Dispatch } from 'react';
import { BiCommentError } from "react-icons/bi";

type AlertToastProps = {
    title: string,
    message: string,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

export default function AlertToast({ title, message, show, setShow }: AlertToastProps) {
    return (
        <>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <BiCommentError
                        size={20}
                        className={styles.BiCommentError}
                    />
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </>
    );
}