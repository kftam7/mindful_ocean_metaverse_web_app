import { Row, Image, Container } from 'react-bootstrap';
import styles from '../../styles/Donate.module.css';

const Donate = ({ t }) => {

    return (
        <div class="Donate_donate__hawye" id="donate">
            <Image src="/measuredBoxes/9.png" alt="Ocean9" class="Donate_bgpart9__q5P2x" />
            <Image src="/measuredBoxes/11.png" alt="Ocean11" class="Donate_bgpart11__nDt_P" />
            <div class="container">
                <div class="d-flex justify-content-around row">
                    <div class="Donate_donate_col_left__L18k5 col-md-3">
                        <Image src="/donate_left.png" alt="donate1" class="Donate_donate_left__mVvOY" />
                    </div>
                    <div class="col-md-5 col-sm-12">
                        <div class="Donate_donate_mid__hSbds">
                        </div>
                    </div>
                    <div class="Donate_donate_col_right__dpZBZ col-md-3">
                        <Image src="/donate_right.png" alt="donate2" class="Donate_donate_right__hVwCC" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Donate;