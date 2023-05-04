import {Row, Col, Form,InputGroup,FormControl, Button, Image, Container, Dropdown} from 'react-bootstrap';
import Script from 'next/script';
import Link from 'next/link';
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/Gallery.module.css';

import Layout from '../components/SubpageLayout';
import { data } from '../data/data';
import GalleryModel from '../components/homepage/GalleryModel';
import { useTranslation } from '../i18n';

const GalleryPage = () => {
  const { t, locale } = useTranslation();

  return(
    <Container className='mt-5 mb-5' style={{}}>
      <Row className='' ><Link href="/"><h6 style={{cursor: 'pointer'}}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
      <Row className='mt-5'>
          <Col sm={12} md={6}>
            <h5>{t('main.text.gallery')}</h5>
            <p>{t('page.gallery.artworksByOurCommunity')}</p>
          </Col>
          <Col sm={12} md={6}>
            <Row className='mt-3 me-auto'>
              <Col sm={6} md={5}>
                <Dropdown className="">
                  <Dropdown.Toggle className={styles.dropdownBtn} id="types">
                    {t('page.gallery.whale')}&nbsp;&nbsp;&nbsp;
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item href="#/whale">{t('page.gallery.whale')}</Dropdown.Item>
                      <Dropdown.Item href="#/butterflyfish">{t('page.gallery.butterflyFish')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={6} md={6} className={styles.searchByCreator}>
              <Form>
                <InputGroup style={{width:'100%'}}>
                    <FormControl id="search by name" placeholder={t('page.gallery.searchBycreator')} style={{border: '1px solid #005D6C', borderRadius: '15px'}} />
                </InputGroup>
            </Form>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row className='mt-2'>
        {
            data.map((d, i) => (
              <Col xs={6} md={4} key={i} style={{position:'relative'}}>
                <GalleryModel metadata={d.metadata} image='./pic1.jpg' index={data.indexOf(d)} />
                <Image src='./pic1.jpg' className={styles.GalleryPageImages} />
              </Col>
            ))
          }    
        </Row>
        <Row className={styles.btnRow}>
              <Button href="/gallery" className={`${styles.btn} ${homeStyles.btn}`}>{t('button.shuffle')}</Button>
        </Row>
        <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
        <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
    </Container>
  )
}

//per-page layout
GalleryPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default GalleryPage;