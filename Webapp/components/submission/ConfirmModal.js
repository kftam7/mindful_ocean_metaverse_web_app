import { Row, Button, Modal } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/SubmitPage.module.css';
import { useTranslation } from '../../i18n';
import Router from 'next/router';
import { useDispatch } from "react-redux";
import { UPDATE_ARTWORKID } from "../../store/actions/types";

const ConfirmModal = ({confirmShow, setConfirmShow, artworkId }) => {
    const { t, locale } = useTranslation();
    const dispatch = useDispatch();
    const handleConfirmClose = () => setConfirmShow(false);

    const confirm = () => {
      dispatch({
        type: UPDATE_ARTWORKID,
        payload: artworkId,
      });
      Router.push({
        pathname: `/mintpass`,
      });
    };

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
          <Button onClick={confirm} className={`${homeStyles.btn} ${styles.confirmBtn}`} style={{fontWeight: '800'}}>{t('button.confirm')}</Button>
        </Row>
        </Modal.Body>
      </Modal>
    )
}

export default ConfirmModal;