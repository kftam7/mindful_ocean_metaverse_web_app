import { Row, Col, Button, Image, Container } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/Mintpass.module.css';
import { useTranslation } from '../../i18n';

const Mintpass = () => {
    const { t, locale } = useTranslation();

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
                <Button href='/redeem_step1' className={`${homeStyles.btn} ${styles.btnDefault}`} style={{fontWeight: '800', fontSize: '1.5rem'}}>{t('button.redeem')}</Button>
            </Row>
        </div>
    )
}

export default Mintpass;