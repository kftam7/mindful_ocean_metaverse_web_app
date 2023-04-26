import { Row, Button, Modal } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/SubmitPage.module.css';

const ConfirmModal = ({confirmShow,setConfirmShow }) => {
    const handleConfirmClose = () => setConfirmShow(false);
    return (
        <Modal show={confirmShow} onHide={handleConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className='mb-3'>
          <p>Submitted design will be removed from theartwork list but you can still view it in your Profile.</p>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Button href='/mintpass' className={`${homeStyles.btn} ${styles.confirmBtn}`} style={{fontWeight: '800'}}>Confirm</Button>
        </Row>
        </Modal.Body>
      </Modal>
    )
}

export default ConfirmModal;