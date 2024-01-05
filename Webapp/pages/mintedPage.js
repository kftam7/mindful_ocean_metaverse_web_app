import Link from 'next/link';
import styles from '../styles/SubmitPage.module.css';
import { Row, Col, Image, Container } from 'react-bootstrap';
import { useTranslation } from '../i18n';
import Layout from '../components/SubpageLayout';
//require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//if this page displayed, duplicated the localStorage image and remove the image in DB
//may need to clear the localStorage.canvas for side-effects cleaning up
export default function MintedPage() {
    const { t, locale } = useTranslation();

    return (
        <Layout>
            <Container className='mt-5 mb-5'>
                <div className={styles.submitPage}>
                    <Row><Link href="/"><h6 style={{ cursor: "pointer" }}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
                    <Row className="mt-4"><h5>{t('page.mintpass.submitArtwork')}</h5></Row>

                    <Row className='mt-4'>
                        <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                            <div className={styles.content}><i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i><span>{t('page.mintpass.authentication')}</span></div>
                            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                        </Col>
                        <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                            <div className={styles.content}><i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i><span>{t('page.mintpass.submission')}</span></div>
                            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                        </Col>
                        <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                            <div className={styles.content}><i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i><span>{t('page.mintpass.getMintpas')}</span></div>
                            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                        </Col>
                    </Row>
                    <div className={styles.mintedContent}>
                        <div className='text-center'>
                            <Row>
                                <Col>
                                    <div className={styles.mintedTitle}>{t('page.mintedPage.yourFishIsSuccessfullySubmitted')}</div>
                                    <div className={styles.mintedImg}>
                                        <Image src="/minted.png" alt="minted" />
                                    </div>
                                    <div className={styles.mintedTitle}>
                                        {t('page.mintedPage.inReturn')}<br />
                                        {t('page.mintedPage.mintPassIsNowGeneratedInYourWallet')}
                                    </div>
                                    <p>{t('page.mintedPage.viewMintPassOn')} <span><a href={process.env.openseaLink + process.env.MintPassContractAddress} style={{ textDecoration: "underline" }} target="_blank" rel='noreferrer'>{t('page.mintedPage.opensea')}</a> {t('page.mintedPage.or')} <a href="/userProfile" style={{ textDecoration: "underline" }}>{t('page.mintedPage.viewMyProfile')}</a></span></p>
                                    {/* <p>View Mintpass on your&nbsp; 
                                    <span style={{textDecoration: "underline"}}><Link href="/dashboard">dashboard</Link></span>
                                    &nbsp;or trade Mintpass on&nbsp; 
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
        </Layout>
    )
}