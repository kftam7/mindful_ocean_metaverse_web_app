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
const Gallery = ({t}) => {
  const apiPort = process.env.API_PORT || '/';
  const [artworkhomepage, setArtworkhomepage] = useState([]);

  // 初始化数据
  useEffect(async () => {
    const appleid = getAppleId();
    if(!appleid) return;
    const des = await axios.get(`${apiPort}/mindfulapi/app/artworkhomepage`, {headers: getHeaders()});
    if(des.status === 200){
      const { data: { data } } = des;
      let result = data.map(item => {
        return {
          metadata: {
            texture:item.URL,
            name:item.name,
            author:item.extraInfo,
            description:item.description
          },
          image: item.URL
        }
      });
      setArtworkhomepage(result);
    }
  }, []);

  const onCinkToUrl = () => {
    const appleId = getAppleId();
    if(!appleId) return toast.error(t('error.info.pleaseSignInToAppleIDFirst'), {
      autoClose: 3000,
      position: 'top-center',
      className: 'custom-toast-success',
      hideProgressBar: true,
    });
    window.location.href = '/gallery';
  };

  return(
    <div className={styles.gallery} id="gallery">
      <ToastContainer />
      <Row className={styles.title}>
        <h3>{t('main.text.gallery')}</h3>
        <p className="mt-1">{t('main.text.mindfulOcean')}</p>
      </Row>
      {artworkhomepage.length ? 
        <>
          <Row className={styles.galleryRow}>            
            {artworkhomepage.map((item, index) => {
              return <>
                  <Col style={{position:'relative'}}>
                    <GalleryModel metadata={item.metadata} image={item.image} index={index} />
                    {index === 0 ? 
                      <Image className={styles.bgpart6} src="/measuredBoxes/6.png" alt="Ocean6" />
                      : ''
                    }
                    {index === 2 ? 
                      <div className={styles.imgDiv}>
                        <Image className={styles.bgpart7} src="/measuredBoxes/7.png" alt="Ocean7" />
                      </div>
                      : ''
                    }
                  </Col>
                </>
            })}
          </Row>
          <Row className={styles.btnRow}>
            <Button className={`${styles.btn} ${homeStyles.btn}`} onClick={onCinkToUrl}>{t('button.viewMore')} &rarr;</Button>
          </Row>
        </> : ''
      }
      <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
      <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
    </div>
  )
}

export default Gallery;