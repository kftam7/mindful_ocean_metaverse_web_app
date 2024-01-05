import Link from 'next/link';
import styles from '../styles/RedeemStep.module.css';
import { Row, Col, Image, Container } from 'react-bootstrap';
import { useTranslation } from '../i18n';
import Layout from '../components/SubpageLayout';

//if this page displayed, duplicated the localStorage image and remove the image in DB
//may need to clear the localStorage.canvas for side-effects cleaning up
export default function RedeemStep4() {
    const { t, locale } = useTranslation();

    return (
        <Layout>
            <Container className='mt-5 mb-5'>
                <div className={styles.submitPage}>
                    <Row><Link href="/"><h6 style={{ cursor: "pointer" }}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
                    <Row className="mt-4"><h4>{t('page.redeem.redeemArtworks')}</h4></Row>

                    <Row className='mt-4'>
                        <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                            <div className={styles.content}><i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i><span>{t('page.redeem.authentication')}</span></div>
                            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                        </Col>
                        <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                            <div className={styles.content}><i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i><span>{t('page.redeem.selectMintPass')}</span></div>
                            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                        </Col>
                        <Col xs={4} className={`${styles.item} ${styles.itemDisable}`}>
                            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                            <div className={styles.content}><i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i><span>{t('page.redeem.complete')}</span></div>
                            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                        </Col>
                    </Row>
                    <div className={styles.mintedContent}>
                        <div className='text-center'>
                            <Row>
                                <Col>
                                    <div className={styles.mintedTitle}>{t('page.redeem.yourMintpassIsBurntSucessfully')}</div>
                                    <div className={styles.mintedImg}>
                                        <Image src="/redeem_step3_img.jpg" alt="minted" />
                                    </div>
                                    <div className={styles.mintedTitle}>
                                        {t('page.redeem.inReturn')}
                                    </div>
                                    <div className='mt-5'>
                                        {t('page.redeem.viewYourNewFishNFTOn')} <a href={process.env.openseaLink + process.env.MindfulTokenContractAdd} style={{ textDecoration: "underline" }} target="_blank" rel='noreferrer'>{t('page.redeem.opensea')}</a> {t('page.mintedPage.or')} <a href="/userProfile" style={{ textDecoration: "underline" }}>{t('page.mintedPage.viewMyProfile')}</a>
                                    </div>
                                    <div className={styles.mintedTitle}>
                                        {t('page.redeem.plop')}
                                    </div>
                                    <div>
                                        {t('page.redeem.openTheApp')}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}