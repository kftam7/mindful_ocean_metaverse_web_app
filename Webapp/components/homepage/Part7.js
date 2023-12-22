import { useEffect, useState } from 'react';
import { Row, Button, Card, Col, Container, Image } from 'react-bootstrap';
import Script from 'next/script';
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/Gallery.module.css';

import { data } from '../../data/data'
import GalleryModel from './GalleryModel';
import { getAppleId, getHeaders } from '../../utils/utils';
import axios from 'axios';

//gallery section at home page, currently models are hardcoded
const Gallery = ({ t }) => {
  //const apiPort = process.env.API_PORT || '/';
  //const apiPort = process.env.NEXT_PUBLIC_APIBASEURL || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const [artworkhomepage, setArtworkhomepage] = useState([]);

  // 初始化数据
  useEffect(async () => {
    // const appleid = getAppleId();
    // if(!appleid) return;
    const des = await axios.get(`${apiPort}/mindfulapi/app/artworkhomepage`);
    if (des.status === 200) {
      const { data: { data } } = des;
      let result = data.map(item => {
        return {
          metadata: {
            texture: item.URL,
            name: item.name,
            author: item.extraInfo,
            description: item.description,
            firstName: item.firstName,
            lastName: item.lastName,
            eventId: item.eventId,
            type: item.type,
            artistMessage: item.artistMessage
          },
          image: item.URL
        }
      });
      setArtworkhomepage(result);
    }
  }, []);

  const onCinkToUrl = () => {
    const appleId = getAppleId();
    if (!appleId) return toast.error(t('error.info.pleaseSignInToAppleIDFirst'), {
      autoClose: 3000,
      position: 'top-center',
      className: 'custom-toast-success',
      hideProgressBar: true,
    });
    window.location.href = '/gallery';
  };

  return (
    <div class="part_box" id="gallery">
      <div className='part_pannel bg_blue'>
        <ToastContainer />
        <div class="container">
          <div className='part_title2'>{t('main.text.gallery')}</div>
          {artworkhomepage.length ?
            <>
              <Row>
                {artworkhomepage.slice(0, 3).map((item, index) => {
                  return <>
                    <Col sm={12} md={4} style={{ position: 'relative' }}>
                      <GalleryModel metadata={item.metadata} image={item.image} index={index} t={t} />
                      {/* {index === 0 ?
                        <Image className={styles.bgpart6} src="/measuredBoxes/6.png" alt="Ocean6" />
                        : ''
                      }
                      {index === 2 ?
                        <div className={styles.imgDiv}>
                          <Image className={styles.bgpart7} src="/measuredBoxes/7.png" alt="Ocean7" />
                        </div>
                        : ''
                      } */}
                    </Col>
                  </>
                })}
              </Row>
              <Row className={styles.btnRow}>
                <Col className='text-center'>
                  <Button variant="outline-primary" onClick={onCinkToUrl}>{t('button.viewMore')}</Button>
                </Col>
              </Row>
            </> : ''
          }
          <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
          <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
        </div>
      </div>
      <div className='part7_bg1'>
        <Image src="/measuredBoxes/12.png" />
      </div>
      <div className='part7_bg2'>
        <Image src="/measuredBoxes/17.png" />
      </div>
    </div>
  )
}

export default Gallery;