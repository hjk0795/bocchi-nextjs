import styles from "../styles/loadingModal.module.css";
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

type Props = {
    show: boolean,
    onHide: () => void,
    elapsedSeconds: number
};

export default function LoadingModal({ show, onHide, elapsedSeconds }: Props) {
    return (
        <Modal
            show={show}
            onHide={onHide}
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