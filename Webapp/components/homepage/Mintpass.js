import { useState } from "react";
import { Row, Col, Button, Image, Container } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/Mintpass.module.css';
import AnimationForFishPool from '../../components/animationForFishPool/AnimationForFishPool';
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
              pathname: '/authentication',
            });
        }
    };

    return (
        <>
            <AnimationForFishPool />
            <div className={styles.mintpassRow} id="mintpass">
                <Row className={styles.title}>
                <h3>{t('main.text.mintPass')}</h3>
                <p className="mt-1">{t('main.text.submitArtworksCreated')}</p>
                </Row>
                <Row className={styles.mintpassImg}>
                    <Image className="" src="/mintpassSec.png" fluid='true' alt="mintpass" />
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Button onClick={determine} className={`${homeStyles.btn} ${styles.overlayBtn}`} style={{fontWeight: '800', fontSize: '1.5rem'}}>{t('button.submit')} &rarr;</Button>
                </Row>
            </div>
            <ModalIsMobile setShow={setShow} show={show} />
        </>
    )
}

export default Mintpass;