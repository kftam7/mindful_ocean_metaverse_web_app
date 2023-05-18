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
import { getAppleId, getHeaders } from '../utils/utils';
import axios from 'axios';

const GalleryPage = () => {
  const apiPort = process.env.API_PORT || '/';
  const { t, locale } = useTranslation();
  const [isSort, setIsSort] = useState(false);
  const pageSize = 6;
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [dataArtwork, setDataArtwork] = useState([]);
  const [dataResult, setDataResult] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [orderByText, setOrderByText] = useState('');  
  const [type, setType] = useState('');
  const [typeTxt, setTypeText] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  // 初始化数据
  useEffect(async () => {
    const appleid = getAppleId();
    if(!appleid) return;
    const des = await axios.get(`${apiPort}/mindfulapi/app/artwork`, {headers: getHeaders()});
    if(des.status === 200){
      const { data: { data } } = des;
      console.log(data)
      setDataSource(data);
      setDataArtwork(data);
      setTotalCount(data.length)
    }
  }, []);

  // 数据渲染
  useEffect(() => {
    const total = dataArtwork.length;
    if(!total) return setDataResult([]);
    if(total <= pageSize){
      setTotalPages(1);
    }else{
      if(total % pageSize === 0){
        setTotalPages(total / pageSize);
      }else{
        setTotalPages(parseInt(total / pageSize) + 1);
      }
    }
    
    // 当前页数据范围
    let start = 0;
    let end = 0;
    if(activePage === 1){
      start = 0;
      end = pageSize;
    }else if(totalPages > activePage){
      start = (activePage - 1) * pageSize;
      end = activePage * pageSize;
    }else{
      start = (activePage - 1) * pageSize;
      end = totalCount
    }
    getData(start, end);
  }, [dataArtwork, activePage, isSort]);

  // 获取当前页数据
  const getData = (start, end) => {
    const data = dataArtwork.slice(start, end);
    setDataResult(data);
  };

  // 条件检索，排序检索
  useEffect(() => {
    if(!dataSource.length) return;
    if(!orderBy && !type && !name && !description && !extraInfo) {
      setDataArtwork(dataSource);
      setActivePage(1);
      return;
    }
    
    let result = dataSource;

    if(type){
      result= result.filter(item => item.type === type);
    }

    if(name || description || extraInfo){
      const regexName = new RegExp(name, 'i');
      const regexDesc = new RegExp(description, 'i');
      const regexExtraInfo = new RegExp(extraInfo, 'i');
  
      result = result.filter(item => {
        const nameMatch = regexName.test(item.name);
        const descMatch = regexDesc.test(item.description);
        const extraInfoMatch = regexExtraInfo.test(item.extraInfo);
        return nameMatch && descMatch && extraInfoMatch;
      });
    }

    if(orderBy){
      setIsSort(!isSort);
      result = result.sort((a, b) => {
        if(orderBy === 'creationTimeAscending'){
          return new Date(a.createTime) - new Date(b.createTime);
        }
        if(orderBy === 'creationTimeDescending'){
          return new Date(b.createTime) - new Date(a.createTime);
        }
        if(orderBy === 'updateTimeAscending'){
          return new Date(a.updateTime) - new Date(b.updateTime);
        }
        if(orderBy === 'updateTimeDescending'){
          return new Date(b.updateTime) - new Date(a.updateTime);
        }
        if(orderBy === 'random'){
          return Math.random() - 0.5;
        }
      });
    }
    
    console.log(result)
    setDataArtwork(result);
    setActivePage(1);

  }, [dataSource, orderBy, type, name, description, extraInfo]);

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
    let text = '';
    if(orderBy === 'creationTimeAscending'){
      text = t('page.gallery.creationTimeAscending');
    }
    if(orderBy === 'creationTimeDescending'){
      text = t('page.gallery.creationTimeDescending');
    }
    if(orderBy === 'updateTimeAscending'){
      text = t('page.gallery.updateTimeAscending');
    }
    if(orderBy === 'updateTimeDescending'){
      text = t('page.gallery.updateTimeDescending');
    }
    if(orderBy === 'random'){
      text = t('page.gallery.random');
    }
    setOrderBy(orderBy);
    setOrderByText(text);
  };

  const changeType = (type) => {
    setType(type);
    setTypeText(type === 'fish' ? t('page.gallery.butterflyFish') : t('page.gallery.whale'));
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const changeExtralnfo = (e) => {
    setExtraInfo(e.target.value);
  };

  return(
    <Container className='mt-5 mb-5' style={{}}>
      <Row className='' ><Link href="/"><h6 style={{cursor: 'pointer'}}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
      <Row className='mt-5'>
          <Col md={12} lg={4}>
            <h5>{t('main.text.gallery')}</h5>
            <p>{t('page.gallery.artworksByOurCommunity')}</p>
          </Col>
          <Col md={12} lg={8}>
            <Row className='me-auto'>
              <Col md={12} lg={6}>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle className={styles.dropdownBtn} id="types">
                    {orderByText ? orderByText : t('page.gallery.orderBy')}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item onClick={() => changeOrderBy('creationTimeAscending')}>{t('page.gallery.creationTimeAscending')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeOrderBy('creationTimeDescending')}>{t('page.gallery.creationTimeDescending')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeOrderBy('updateTimeAscending')}>{t('page.gallery.updateTimeAscending')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeOrderBy('updateTimeDescending')}>{t('page.gallery.updateTimeDescending')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeOrderBy('random')}>{t('page.gallery.random')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={12} lg={6}>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle className={styles.dropdownBtn} id="types">
                    {typeTxt ? typeTxt : t('page.gallery.type')}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item onClick={() => changeType('whale')}>{t('page.gallery.whale')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => changeType('fish')}>{t('page.gallery.butterflyFish')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className='me-auto'>
              <Col md={12} lg={4}>
                <Form className="mb-3">
                  <InputGroup style={{width:'100%'}} onChange={changeName}>
                      <FormControl id="search by name" placeholder={t('page.gallery.searchByName')} style={{border: '1px solid #005D6C', borderRadius: '15px'}} />
                  </InputGroup>
                </Form>
              </Col>
              <Col md={12} lg={4}>
                <Form className="mb-3">
                  <InputGroup style={{width:'100%'}} onChange={changeDescription}>
                      <FormControl id="search by description" placeholder={t('page.gallery.searchByDescription')} style={{border: '1px solid #005D6C', borderRadius: '15px'}} />
                  </InputGroup>
                </Form>
              </Col>
              <Col md={12} lg={4}>
                <Form className="mb-3">
                  <InputGroup style={{width:'100%'}} onChange={changeExtralnfo}>
                      <FormControl id="search by extralnfo" placeholder={t('page.gallery.searchByExtralnfo')} style={{border: '1px solid #005D6C', borderRadius: '15px'}} />
                  </InputGroup>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='mt-2'>
          {
            dataResult.map((d, i) => (
              <Col xs={6} md={4} key={i} style={{position:'relative'}}>
                <GalleryModel metadata={d} image={d.URL} index={dataResult.indexOf(d)} />
                <Image src={d.URL} className={styles.GalleryPageImages} />
              </Col>
            ))
          }
        </Row>
        {dataResult.length ?
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
          </Row> : ''
        }
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