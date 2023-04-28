import { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Collapse, Card } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from '../../styles/RedeemStep.module.css';
import TextOverflowTips from "../textOverflowTips/TextOverflowTips";
import { getWalletAddress, getAppleId } from '../../utils/utils';

const AppModal = ({show, setShow}) => {
 const handleClose = () => setShow(false);
 const [walletAddress, setWalletAddress] = useState('');
 const [appleId, setAppleId] = useState('');
 const [activeIndex, setActiveIndex] = useState(null); // 控制展开的面板索引 

 useEffect(() => {
  setWalletAddress(getWalletAddress());
  setAppleId(getAppleId());
}, []);

 const handleToggle = async (index) => {
    setActiveIndex(index === activeIndex ? null : index); // 切换展开的面板索引
};

 return(
    <Modal show={show} className={styles.redeemModel}>
        <Modal.Header>
            <Modal.Title>No Mintpass registered</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={styles.redeemLine1}>
                <div className={styles.redeemText}><div className={styles.name}>Wallet Address：</div> <div className={styles.code}><TextOverflowTips text={walletAddress} /></div></div>
                <div className={styles.redeemText}><div className={styles.name}>Apple iD：</div> <div className={styles.code}><TextOverflowTips text={appleId} /></div></div>
                <div className={styles.redeemBtn}><Button href="/redeem_step1" size="lg" className={styles.disactiveBtn}>Change account</Button></div>
                <div className={styles.redeemBtn}><Button href="/" size="lg" className={styles.disactiveBtn}>Return to Homepage</Button></div>
            </div>

            <Card style={{ border: 'none', borderBottom: '1px solid #005D6C' }}>
              <Card.Body className={styles.card_item} style={{padding: '0.5rem 1rem'}}>
                <div className="d-flex justify-content-between" style={{alignItems: 'center'}}>
                  <div>
                    <h6>How to get a Mintpass?</h6>
                  </div>
                  <div>
                    <Button
                      className={styles.card_btn}
                      variant="link"
                      onClick={() => handleToggle(1)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 1}
                    >
                      {activeIndex === 1 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
              </div>
              </Card.Body>
              <Collapse in={activeIndex === 1}>
                <div id="collapseExample1">
                  <Card.Body className={styles.card_body}>
                    <Row>
                        <Col xs={12}>
                            Join the next event in Mindful Ocean App.<br />
                            Next event starting on 5 May 2023.
                        </Col>
                        <Col xs={12} className="d-flex justify-content-center mt-3 mb-3">
                            <Button className={styles.appBtn} style={{backgroundImage:"url('apple_store.png')"}}></Button>
                        </Col>
                        <Col xs={12}>
                            Or purchase directly on <span style={{textDecoration: "underline"}}>Opensea</span> now.
                        </Col>
                    </Row>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
        </Modal.Body>
  </Modal>
 )
}

export default AppModal;