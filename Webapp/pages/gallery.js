import {Row, Col, Form,InputGroup,FormControl, Button, Image, Container, Dropdown, Pagination} from 'react-bootstrap';
import Script from 'next/script';
import Link from 'next/link';
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/Gallery.module.css';

import Layout from '../components/SubpageLayout';
import { data } from '../data/data';
import GalleryModel from '../components/homepage/GalleryModel';
import { useTranslation } from '../i18n';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAppleId } from '../utils/utils';

const GalleryPage = () => {
  const apiPort = process.env.API_PORT || '/';
  const { t, locale } = useTranslation();
  const [appleId, setAppleId] = useState();
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  // useEffect(() => {
  //   setAppleId(getAppleId());
  // }, []);

  // useEffect(async () => {
  //   if(!appleId) return;
  //   console.log(appleId)
  //   const des = await axios.get(`${apiPort}/mindfulapi/artwork/${appleId}`);
  //   console.log(des)
  //   if(des.status === 200){
  //     const { data: { data } } = des;
  //   }
  // }, [appleId]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleFirstPage = () => {
    setActivePage(1);
  };

  const handlePrevPage = () => {
    const prevPage = activePage > 1 ? activePage - 1 : 1;
    setActivePage(prevPage);
  };

  const handleNextPage = () => {
    const nextPage = activePage < totalPages ? activePage + 1 : totalPages;
    setActivePage(nextPage);
  };

  const handleLastPage = () => {
    setActivePage(totalPages);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={activePage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  };

  const changeOrderBy = (orderBy) => {
    console.log(orderBy)
  };

  const changeType = (type) => {
    console.log(type)
  };

  return(
    <Container className='mt-5 mb-5' style={{}}>
      <Row className='' ><Link href="/"><h6 style={{cursor: 'pointer'}}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
      <Row className='mt-5'>
          <Col md={12} lg={6}>
            <h5>{t('main.text.gallery')}</h5>
            <p>{t('page.gallery.artworksByOurCommunity')}</p>
          </Col>
          <Col md={12} lg={6}>
            <Row className='me-auto'>
              <Col md={12} lg={4}>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle className={styles.dropdownBtn} id="types">
                    {t('page.gallery.orderBy')}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item onClick={() => changeOrderBy(t('page.gallery.creationTimeAscending'))}>{t('page.gallery.creationTimeAscending')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeOrderBy(t('page.gallery.creationTimeDescending'))}>{t('page.gallery.creationTimeDescending')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeOrderBy(t('page.gallery.updateTimeAscending'))}>{t('page.gallery.updateTimeAscending')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeOrderBy(t('page.gallery.updateTimeDescending'))}>{t('page.gallery.updateTimeDescending')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeOrderBy(t('page.gallery.random'))}>{t('page.gallery.random')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={12} lg={4}>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle className={styles.dropdownBtn} id="types">
                    {t('page.gallery.type')}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item onClick={() => changeType(t('page.gallery.whale'))}>{t('page.gallery.whale')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeType(t('page.gallery.butterflyFish'))}>{t('page.gallery.butterflyFish')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className='me-auto'>
              <Col md={12} lg={4}>
                <Form className="mb-3">
                  <InputGroup style={{width:'100%'}}>
                      <FormControl id="search by name" placeholder={t('page.gallery.searchBycreator')} style={{border: '1px solid #005D6C', borderRadius: '15px'}} />
                  </InputGroup>
                </Form>
              </Col>
              <Col md={12} lg={4}>
                <Form className="mb-3">
                  <InputGroup style={{width:'100%'}}>
                      <FormControl id="search by name" placeholder={t('page.gallery.searchByDescription')} style={{border: '1px solid #005D6C', borderRadius: '15px'}} />
                  </InputGroup>
                </Form>
              </Col>
              <Col md={12} lg={4}>
                <Form className="mb-3">
                  <InputGroup style={{width:'100%'}}>
                      <FormControl id="search by name" placeholder={t('page.gallery.searchByExtralnfo')} style={{border: '1px solid #005D6C', borderRadius: '15px'}} />
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
        <Row>
          <Col lg={12}>
            <Pagination className='mt-3 pagination_basic'>
              <Pagination.First onClick={handleFirstPage} />
              <Pagination.Prev onClick={handlePrevPage} />
              {renderPageNumbers()}
              <Pagination.Next onClick={handleNextPage} />
              <Pagination.Last onClick={handleLastPage} />
            </Pagination>
          </Col>
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