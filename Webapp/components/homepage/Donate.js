import { Row, Image, Container } from 'react-bootstrap';
import styles from '../../styles/Donate.module.css';
import { useTranslation } from '../../i18n';

const Donate = () => {
    const { t, locale } = useTranslation();

    return (
        <div className={styles.donate} id="donate">
            <Image className={styles.bgpart9} src="/measuredBoxes/9.png" alt="Ocean9" />
            <Image className={styles.bgpart11} src="/measuredBoxes/11.png" alt="Ocean11" />
            <Row className={styles.title}>
                <h3>{t('main.text.donate')}</h3>
                <p className="mt-1">{t('main.text.forEveryNFTSold')}</p>         
                <picture>
                    <source srcSet="verticalDonate.png" media="(max-width: 600px)" />
                    <Image className={styles.img} src="donate.png" alt="Donate to The Ocean Clean Up" fluid='true' />
                </picture>             
            </Row>
        </div>
    )
}

export default Donate;