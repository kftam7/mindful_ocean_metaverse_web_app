import { Row, Col, Button, Image, Container } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/Mintpass.module.css';

const Mintpass = () => {
    return (
        <div className={styles.mintpassRow} id="Redeem">
            <Row className={styles.title}>
            <h3>Redeem Mindful Metaverse NFT</h3>
            <p className="mt-1">Redeem and reveal your own artwork NFT if you own a Mint Pass.<br />
You can get a Mint Pass by submitting an artwork on Mindful Ocean App or purchase directly on OpenSea.</p>
            </Row>
            <Row className={styles.mintpassImg}>
                <Image className="" src="/redeem1.jpg" fluid='true' alt="mint pass" />
            </Row>
            <Row className='d-flex justify-content-center'>
                <Button href='/redeem_step1' className={`${homeStyles.btn} ${styles.btnDefault}`} style={{fontWeight: '800', fontSize: '1.5rem'}}>Redeem</Button>
            </Row>
        </div>
    )
}

export default Mintpass;