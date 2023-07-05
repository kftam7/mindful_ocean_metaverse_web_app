import Link from 'next/link';
import styles from '../styles/SubmitPage.module.css';
import { Row, Col, Image, Container } from 'react-bootstrap';

//if this page displayed, duplicated the localStorage image and remove the image in DB
  //may need to clear the localStorage.canvas for side-effects cleaning up
export default function MintedPage() {
    

    return(
        <Container className='mt-5 mb-5'>
            <div className={styles.submitPage}>
                <Row><Link href="/">&larr; Return to homepage</Link></Row>
                <Row className="mt-4"><h5>Submit Artwork</h5></Row>

                <Row className='mt-4'>
                <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                    <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                    <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>1. Authentication</span></div>
                    <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                </Col>
                <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                    <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                    <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>2. Submission</span></div>
                    <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                </Col>
                <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                    <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                    <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>3. Get Mintpass</span></div>
                    <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                </Col>
                </Row>
                <div className={styles.mintedContent}>
                    <div className='text-center'>
                        <Row>
                            <Col>
                                <div className={styles.mintedTitle}>Your fish is successfully submitted.</div>
                                <div className={styles.mintedImg}>
                                    <Image src="/minted.png" alt="minted" />
                                </div>
                                <div className={styles.mintedTitle}>
                                    In return.<br />
                                    Mint Pass is now generated in your wallet.
                                </div>
                                <p>View Mint Pass on <span><a href="https://testnets.opensea.io/collection/mindfulpass-v2" style={{textDecoration: "underline"}} target="_blank" rel='noreferrer'>Opensea</a> or <a href="/userProfile" style={{textDecoration: "underline"}}>View My Profile</a></span></p>
                                {/* <p>View Mint Pass on your&nbsp; 
                                    <span style={{textDecoration: "underline"}}><Link href="/dashboard">dashboard</Link></span>
                                    &nbsp;or trade Mint Pass on&nbsp; 
                                    <span style={{textDecoration: "underline"}}>
                                        <a href="https://testnets.opensea.io/collection/mindfulpass-v2" target="_blank" rel='noreferrer'>Opensea</a>
                                    </span>
                                </p> */}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Container>
    )
}