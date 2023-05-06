import Link from 'next/link';
import styles from '../styles/RedeemStep.module.css';
import { Row, Col, Image, Container, Button } from 'react-bootstrap';
import { useTranslation } from '../i18n';
import { useEffect } from 'react';
import { getAccount, fetchMintpassContractNFT } from '../store/actions';
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';

//if this page displayed, duplicated the localStorage image and remove the image in DB
  //may need to clear the localStorage.canvas for side-effects cleaning up
export default function RedeemStep3() {
    const { t, locale } = useTranslation();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.accountState);
    const mintpassNFTContract = useSelector((state) => state.contractNFTState);

    useEffect(async() => {
      await dispatch(getAccount());
      await dispatch(fetchMintpassContractNFT());
    },[dispatch])

    async function mint() {
      console.log(mintpassNFTContract)
      await mintpassNFTContract.methods.mintMindfulNFT('0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab', 'https://www.baidu.com', '0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab', 10, 1).send({ from: account })
      .once('confirmation', async function(confirmationNumber, receipt){ //if use "on('"confirmation") here, it will be triggered repeatedly
  
      })
      .then(async function(){
        console.log('success')
        return;
        Router.push({
          pathname: '/redeem_step4',
        });
      }
      )
    }

    return(
        <Container className='mt-5 mb-5'>
            <div className={styles.submitPage}>
                <Row><Link href="/"><h6 style={{cursor: "pointer"}}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
                <Row className="mt-4"><h4>{t('page.redeem.redeemArtworks')}</h4></Row>

                <Row className='mt-4' style={{fontSize: "1.3rem",fontWeight:'800'}}>
                    <Col xs={4} className={styles.item}>
                        <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                        <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>{t('page.redeem.authentication')}</span></div>
                        <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                    </Col>
                    <Col xs={4} className={styles.item}>
                        <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                        <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>{t('page.redeem.selectMintPass')}</span></div>
                        <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                    </Col>
                    <Col xs={4} className={`${styles.item} ${styles.itemActive}`}>
                        <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                        <div className={styles.content}><i className="fa-regular fa-circle"></i><span>{t('page.redeem.burnMinpPass')}</span></div>
                        <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
                    </Col>
                    <Col xs={4} className={styles.item}>
                        <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                        <div className={styles.content}><i className="fa-regular fa-circle"></i><span>{t('page.redeem.complete')}</span></div>
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
                            </Col>
                        </Row>
                    </div>
                </div>

                <Row className='justify-content-md-center mt-5'>
                    <Col xs={12}>
                    <div className='text-center'>
                        <Button size="lg" className={styles.disactiveBtn} style={{width: "30%", borderRadius: "10px", fontWeight:'800'}} onClick={mint}>{t('button.mintMindfulNFT')}</Button>
                    </div>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}