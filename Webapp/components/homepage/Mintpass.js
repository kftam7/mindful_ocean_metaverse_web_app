import { Row, Col, Button, Image, Container } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/Mintpass.module.css';
import AnimationForFishPool from '../../components/animationForFishPool/AnimationForFishPool';
import { useTranslation } from '../../i18n';

const Mintpass = () => {
    const { t, locale } = useTranslation();

    return (
        <>
            <AnimationForFishPool />
            <div className={styles.mintpassRow} id="mintpass">
                <Row className={styles.title}>
                <h3>{t('main.text.mintPass')}</h3>
                <p className="mt-1">{t('main.text.submitArtworksCreated')}</p>
                </Row>
                <Row className={styles.mintpassImg}>
                    <Image className="" src="/mintpassSec.png" fluid='true' alt="mint pass" />
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Button href='/authentication' className={`${homeStyles.btn} ${styles.overlayBtn}`} style={{fontWeight: '800', fontSize: '1.5rem'}}>{t('button.submit')} &rarr;</Button>
                </Row>
            </div>
        </>
    )
}

export default Mintpass;