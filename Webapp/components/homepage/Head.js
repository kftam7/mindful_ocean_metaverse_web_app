import { useEffect } from "react";
import { Row, Image } from 'react-bootstrap';
import styles from '../../styles/Head.module.css';
import { useTranslation } from '../../i18n';

const Head = () => {
    const { t, locale } = useTranslation();

    return (
        <Row className={styles.head}>
            <Image className={styles.bgpart1} src="/measuredBoxes/1.png" alt="ocean1" />
            <div className={styles.imgDiv}>
                <Image src="/measuredBoxes/2.png" alt="ocean2" className={styles.bgpart2} />
            </div>   
            <div className={styles.upperBg}>
                <div className={styles.textbox}>
                    <h2 className={`text-center ${styles.glowingText}`}>{t('main.text.mindfulOcean')}</h2>
                    <h4 className={`text-center ${styles.glowingText}`}>{t('main.text.theVeryFirstCommunityDrivenNFTProject')}</h4>
                </div>
            </div>
        </Row>
    )
}

export default Head;