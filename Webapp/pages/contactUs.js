import { useEffect, useState } from "react";
import { Row, Col, Image, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
import styles from '../styles/ContactUs.module.css';

import Layout from '../components/SubpageLayout';
import { useTranslation } from '../i18n';

const ContactUs = () => {
  const { t, locale } = useTranslation();
  //const apiPort = process.env.API_PORT || '/';
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.contact_us}>
      <Container className='mt-5 mb-5'>
        <ToastContainer />
        {loading ?
          <div className="overly">
            <FaSpinner />
          </div>
          : ''
        }
        <Row className='' ><Link href="/"><h6 style={{ cursor: 'pointer' }}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
        <Row className='mt-5'>
          <Col sm={12} md={12}>
            <h5>{t('nav.contactUs')}</h5>
          </Col>
        </Row>

        <Row className={styles.head}>
          <Image className={styles.bgpart1} src="/measuredBoxes/1.png" alt="ocean1" />
          <div className={styles.imgDiv}>
            <Image src="/measuredBoxes/2.png" alt="ocean2" className={styles.bgpart2} />
          </div>
          <Col lg={12}>
            <div className={styles.contact_box}>
              <div className={styles.link_email}><a href="mailto:info@mindful-ocean.org">
                <div className={styles.email_con}>
                  <div className={styles.email_title}>{t('main.text.email')}</div>
                  <div className={styles.email_img}></div>
                  <div className={styles.email_text}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="textOverflowTooltip">{t('main.text.copiedToClipboard')}</Tooltip>}
                    >
                      <span>info@mindful-ocean.org</span>
                    </OverlayTrigger>
                  </div>
                </div>
              </a></div>
              <div className={styles.link_item}>
                <div className={styles.item_a}><a href="https://twitter.com/MindfulOceanNFT" target='_blank'><span className={`${styles.item_icon} ${styles.icon1}`}></span>{t('main.text.twitter')}</a></div>
                <div className={styles.item_a}><a href="https://discord.com/channels/1176399280924266600/1176399281524068403"  target='_blank'><span className={`${styles.item_icon} ${styles.icon2}`}></span>{t('main.text.facebook')}</a></div>
                <div className={styles.item_a}><a href="https://www.instagram.com/mindfuloceannft" target='_blank'><span className={`${styles.item_icon} ${styles.icon3}`}></span>{t('main.text.instagram')}</a></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

//per-page layout
ContactUs.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default ContactUs;