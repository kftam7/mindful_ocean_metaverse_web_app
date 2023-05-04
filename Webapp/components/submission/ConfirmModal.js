import { Row, Button, Modal } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/SubmitPage.module.css';
import { useTranslation } from '../../i18n';

const ConfirmModal = ({confirmShow,setConfirmShow }) => {
    const { t, locale } = useTranslation();
    const handleConfirmClose = () => setConfirmShow(false);

    return (
        <Modal show={confirmShow} onHide={handleConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('page.mintpass.submission.confirmSubmission')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className='mb-3'>
          <p>{t('page.mintpass.submission.submittedDesign')}</p>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Button href='/mintpass' className={`${homeStyles.btn} ${styles.confirmBtn}`} style={{fontWeight: '800'}}>{t('button.confirm')}</Button>
        </Row>
        </Modal.Body>
      </Modal>
    )
}

export default ConfirmModal;