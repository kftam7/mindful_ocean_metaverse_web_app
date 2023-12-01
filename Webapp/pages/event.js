import { useEffect, useState } from "react";
import { Row, Col, Button, Container, Image } from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';

import Layout from '../components/SubpageLayout';
import { getHeaders } from '../utils/utils';
import { useTranslation } from '../i18n';
import { useRouter } from 'next/router';
import EventStep from './eventStep';

const Event1 = () => {
  const { t, locale } = useTranslation();
  //const apiPort = process.env.API_PORT || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const { query: { eventId } } = useRouter();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    const list = {
      '1': {
        title: t('home.part4.subTitle1'),
        list: [
          {
            title: t('home.part4.subTitle1'),
            des: t('home.part4.subText1'),
            imgUrl: '/Rectangle.png',
          },
          {
            title: t('home.part4.subTitle1'),
            des: t('home.part4.subText1'),
            imgUrl: '/Rectangle.png',
          },
        ],
      },
      '2': {
        title: t('home.part4.subTitle2'),
        list: [
          {
            title: t('home.part4.subTitle2'),
            des: t('home.part4.subText2'),
            imgUrl: '/Rectangle.png',
          },
        ],
      },
      '3': {
        title: t('home.part4.subTitle3'),
        list: [
          {
            title: t('home.part4.subTitle3'),
            des: t('home.part4.subText3'),
            imgUrl: '/Rectangle.png',
          },
        ],
      },
      '4': {
        title: t('home.part4.subTitle4'),
        list: [
          {
            title: t('home.part4.subTitle4'),
            des: t('home.part4.subText4'),
            imgUrl: '/Rectangle.png',
          },
        ],
      },
      '5': {
        title: t('home.part4.subTitle5'),
        list: [
          {
            title: t('home.part4.subTitle5'),
            des: t('home.part4.subText5'),
            imgUrl: '/Rectangle.png',
          },
        ],
      },
      '6': {
        title: t('home.part4.subTitle6'),
        list: [
          {
            title: t('home.part4.subTitle6'),
            des: t('home.part4.subText6'),
            imgUrl: '/Rectangle.png',
          },
        ],
      },
    };
    setItem(list[eventId]);
  }, [eventId]);

  return (
    <div className="event_page">
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
            <h5>{item?.title}</h5>
          </Col>
          <Col sm={12} md={12}>
            <div className="event_list">
              {item?.list.map((obj, key) => {
                return <div className="list_item" key={key}>
                  <div className="item_pic"><Image src={obj.imgUrl} /></div>
                  <div className="item_title">{obj.title}</div>
                  <div className="item_des">{obj.des}</div>
                </div>
              })}
            </div>
            {eventId < 6 ? <div className="text-center event_btn"><Button variant="outline-primary" onClick={() => window.location.href = `/event?eventId=${Number(eventId) + 1}`}>{t('button.continueReading')}</Button></div>
              : ''}
            <EventStep
              eventId={eventId}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

//per-page layout
Event1.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Event1;