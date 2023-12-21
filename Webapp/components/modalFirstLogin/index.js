import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { getHeaders } from '../../utils/utils';

const ModalFirstLogin = props => {
  const { t, show, setShow, onCancel } = props;
  const apiPort = process.env.APIBaseUrl || '/';

  const handleAccept = async () => {
    const appleId = sessionStorage.getItem("appleId");
    await axios.post(`${apiPort}/mindfulapi/app/tandc/${appleId}`, {}, { headers: getHeaders() })
      .then(res => {
        if (res.status === 200) {
          toast.success(res.data, {
            autoClose: 3000,
            position: 'top-center',
            className: 'custom-toast-success',
            hideProgressBar: true,
          });
        }
        setShow(false);
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      <ToastContainer />
      <Modal
        size="lg"
        scrollable
        backdrop="static"
        show={show}
      >
        <Modal.Header style={{ padding: '30px 30px 0 30px', border: 0 }}>
          <Modal.Title>{t('main.text.termsAndConditions')}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#F2F2F2', height: '500px', padding: '20px', margin: '30px', borderRadius: '10px', overflow: 'hidden' }}>
          <iframe
            style={{ width: '100%', height: '100%' }}
            src={'https://www.iubenda.com/privacy-policy/43680858'}
          />
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center', paddingBottom: '30px', border: 0 }}>
          <Button onClick={handleAccept}>{t('button.accept')}</Button>
          <Button variant="outline-primary" onClick={onCancel}>{t('button.declineAndLogOut')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalFirstLogin;