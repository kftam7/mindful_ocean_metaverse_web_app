import { useEffect, useState } from "react";
import { Row, Col, Button, Container, Image } from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';

import Layout from '../components/SubpageLayout';
import { getHeaders } from '../utils/utils';
import { useTranslation } from '../i18n';
import Router, { useRouter } from 'next/router';
import EventStep from './eventStep';

const Event1 = () => {
  const { t, locale } = useTranslation();
  //const apiPort = process.env.API_PORT || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const { query: { eventId } } = useRouter();
  const [loading, setLoading] = useState(false);

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
            <h5>{t('home.part4.subTitle1')}</h5>
          </Col>
          <Col sm={12} md={12}>
            <div className="event_list">
              <div className="list_item">
                <div className="item_pic"><Image src="/Rectangle.png" /></div>
                <div className="item_title">1.Artwork Creation and Submission</div>
                <div className="item_des">In each event, we feature a specific marine animal, and provide all users with the same coloring template in our app. Users are invited to participate in a creative challenge, in which they can use the provided template to design the outlook of the marine animal, and submit their unique designs to the event.</div>
              </div>
              <div className="list_item">
                <div className="item_pic"><Image src="/Rectangle.png" /></div>
                <div className="item_title">2.Artwork Creation and Submission</div>
                <div className="item_des">In each event, we feature a specific marine animal, and provide all users with the same coloring template in our app. Users are invited to participate in a creative challenge, in which they can use the provided template to design the outlook of the marine animal, and submit their unique designs to the event.</div>
              </div>
              <div className="list_item">
                <div className="item_pic"><Image src="/Rectangle.png" /></div>
                <div className="item_title">3.Artwork Creation and Submission</div>
                <div className="item_des">In each event, we feature a specific marine animal, and provide all users with the same coloring template in our app. Users are invited to participate in a creative challenge, in which they can use the provided template to design the outlook of the marine animal, and submit their unique designs to the event.</div>
              </div>
              <div className="list_item">
                <div className="item_pic"><Image src="/Rectangle.png" /></div>
                <div className="item_title">4.Artwork Creation and Submission</div>
                <div className="item_des">In each event, we feature a specific marine animal, and provide all users with the same coloring template in our app. Users are invited to participate in a creative challenge, in which they can use the provided template to design the outlook of the marine animal, and submit their unique designs to the event.</div>
              </div>
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