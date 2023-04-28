import Link from 'next/link';
import styles from '../styles/RedeemStep.module.css';
import { Row, Col, Image, Container } from 'react-bootstrap';

//if this page displayed, duplicated the localStorage image and remove the image in DB
  //may need to clear the localStorage.canvas for side-effects cleaning up
export default function RedeemStep3() {
    return(
        <Container className='mt-5 mb-5'>
            <div className={styles.submitPage}>
                <Row><Link href="/">&larr; Return to homepage</Link></Row>
                <Row className="mt-4"><h5>Redeem Artworks</h5></Row>

                <Row className='mt-4'>
                <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                    <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                    <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>1. Authentication</span></div>
                    <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                </Col>
                <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                    <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                    <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>2. Select Mint Pass</span></div>
                    <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                </Col>
                <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                    <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                    <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>3. Complete</span></div>
                    <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                </Col>
                </Row>
                <div className={styles.mintedContent}>
                    <div className='text-center'>
                        <Row>
                            <Col>
                                <div className={styles.mintedTitle}>Your Mintpass is burnt sucessfully.</div>
                                <div className={styles.mintedImg}>
                                    <Image src="/redeem_step3_img.jpg" alt="minted" />
                                </div>
                                <div className={styles.mintedTitle}>
                                    In return, a Mindful Ocean Metaverse NFTis now minted in your wallet.
                                </div>
                                <div className='mt-5'>
                                    View your new fish NFT on <span style={{textDecoration: "underline"}}>Opensea</span>
                                </div>
                                <div className={styles.mintedTitle}>
                                    Plop! Your new fish is in the Mindful Ocean Metaverse now.<br />
                                    Start interacting with it on our App.
                                </div>
                                <div>
                                    Open the App on iOS device by scanning the following QR code.
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Container>
    )
}