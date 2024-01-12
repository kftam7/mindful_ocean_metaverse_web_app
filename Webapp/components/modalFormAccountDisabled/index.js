
import { Button, Modal, Image } from 'react-bootstrap';
import { ToastContainer } from "react-toastify";

const ModalFormAccountDisabled = props => {
  const { t, show, onOk, onCancel } = props;

  return (
    <>
      <ToastContainer />
      <Modal
        size="md"
        scrollable
        backdrop="static"
        show={show}
        onHide={onCancel}
      >
        <Modal.Header style={{ padding: '30px 30px 0 30px', border: 0 }}>
          <Modal.Title>{t('main.text.accountDisabled')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}>
            <Image src='/accountdisabled.png' />
            <div className="modal_text1" dangerouslySetInnerHTML={{ __html: (t('main.text.youraccountDisabled')) }} />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ flexDirection: 'column', justifyContent: 'center', paddingBottom: '30px', border: 0 }}>
          <Button onClick={() => onOk()}>{t('button.close')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalFormAccountDisabled;