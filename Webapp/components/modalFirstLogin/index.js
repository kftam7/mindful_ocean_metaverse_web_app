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
        <Modal.Header style={{ padding: '30px 30px 0 30px', border: 0 }}>
          <Modal.Title>{t('main.text.termsAndConditions')}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#F2F2F2', maxHeight: '400px', padding: '20px', margin: '30px', borderRadius: '10px', overflow: 'auto' }}>
          <p><b>Terms of Use</b></p>
          These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com.<br /><br />
          These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.<br /><br />
          Minors or people below 18 years old are not allowed to use this Website.<br /><br />
          You are specifically restricted from all of the following:<br /><br />
          publishing any Website material in any other media;<br />
          selling, sublicensing and/or otherwise commercializing any Website material;<br />
          publicly performing and/or showing any Website material;<br />
          using this Website in any way that is or may be damaging to this Website;<br />
          using this Website in any way that impacts user access to this Website;<br />
          using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;<br />
          engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;<br />
          using this Website to engage in any advertising or marketing.<br />
          Minors or people below 18 years old are not allowed to use this Website.
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center', paddingBottom: '30px', border: 0 }}>
          <Button onClick={handleClose}>{t('button.accept')}</Button>
          <Button variant="outline-primary" onClick={onCancel}>{t('button.declineAndLogOut')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalFirstLogin;