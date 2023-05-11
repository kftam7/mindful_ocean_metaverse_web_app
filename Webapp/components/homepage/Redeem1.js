import { useState } from "react";
import { Row, Col, Button, Image, Container } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/Mintpass.module.css';
import Router from 'next/router';
import ModalIsMobile from '../../components/modalIsMobile/ModalIsMobile';

const Mintpass = ({t}) => {
    const [show, setShow] = useState(false);

    const determine = () => {
        const isMobile = /Mobile/.test(navigator.userAgent);
        if(isMobile){
            setShow(true);
        }else{
            Router.push({
              pathname: '/redeem_step1',
            });
        }
    };

    return (
        <div className={styles.mintpassRow} id="redeem">
            <Row className={styles.title}>
            <h3>{t('main.text.redeemMindfulMetaverseNFT')}</h3>
            <p className="mt-1">{t('main.text.redeemAndReveal')}</p>
            </Row>
            <Row className={styles.mintpassImg}>
                <Image className="" src="/redeem1.jpg" fluid='true' alt="mint pass" />
            </Row>
            <Row className='d-flex justify-content-center'>
                <Button onClick={determine} className={`${homeStyles.btn} ${styles.btnDefault}`} style={{fontWeight: '800', fontSize: '1.5rem'}}>{t('button.redeem')}</Button>
            </Row>
            <ModalIsMobile setShow={setShow} show={show} />
        </div>
    )
}

export default Mintpass;