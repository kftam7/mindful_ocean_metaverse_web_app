import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { getHeaders } from '../../utils/utils';

const ModalFirstLogin = props => {
  const { t, show, setShow, onCancel } = props;
  const apiPort = process.env.APIBaseUrl || '/';

  const handleClose = async () => {
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
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>{t('main.text.termsAndConditions')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You must read and scroll down to accept it<br /><br />
          Our Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.<br /><br />
          This template is free to download and use for your website or mobile appOur Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.<br /><br />
          This template is free to download and use for your website or mobile appOur Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.<br /><br />
          This template is free to download and use for your website or mobile appOur Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.<br /><br />
          This template is free to download and use for your website or mobile appOur Terms and Conditions template will get you started with creating yourown custom Terms and Conditions agreement.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onCancel}>{t('button.declineAndLogOut')}</Button>
          <Button onClick={handleClose}>{t('button.accept')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalFirstLogin;