import { useEffect, useState } from "react";
import { Row, Col, Button, Container, Collapse, Card } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';

import Layout from '../components/SubpageLayout';
import { getHeaders } from '../utils/utils';
import axios from 'axios';
import { useTranslation } from '../i18n';

const Faq = () => {
  const { t, locale } = useTranslation();
  //const apiPort = process.env.API_PORT || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // 控制展开的面板索引

  const handleToggle = async (index) => {
    setActiveIndex(index === activeIndex ? null : index); // 切换展开的面板索引
  };

  return (
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
          <h5>{t('page.faq.frequentlyAskedQuestions')}</h5>
        </Col>
        <Col sm={12} md={12}>
          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.ourMission')}</h4>
            <Card className={activeIndex === 1 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>O1.What is Mindful Ocean Metaverse?</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(1)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 1}
                    >
                      {activeIndex === 1 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 1}>
                <div className="content">
                  Mindful Ocean Metaverse is a community art project with a mission to save our ocean. We useblockchain, Al, and AR technology to empower anyone to take part in ocean conservation by making artOur NFT art creation events nurture mindfulness and promote creativity, enabling anyone to easilycreate NFT artworks that simulate marine life in a co-created virtual space - the Mindful OceanMetaverse
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 2 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>Q2. How can we save our ocean by making art?</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(2)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 2}
                    >
                      {activeIndex === 2 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 2}>
                <div className="content">
                  -
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 3 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>Q3. What is United Nations' Sustainable Development Goals?</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(3)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 3}
                    >
                      {activeIndex === 3 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 3}>
                <div className="content">
                  -
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 4 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>Q4. What is UNSDG #14 Life Below Water?</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(4)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 4}
                    >
                      {activeIndex === 4 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 4}>
                <div className="content">
                  -
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 5 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>Q5. Why should I care about the ocean?</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(5)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 5}
                    >
                      {activeIndex === 5 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 5}>
                <div className="content">
                  -
                </div>
              </Collapse>
            </Card>
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.communityEvents')}</h4>
            <Card className={activeIndex === 6 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>Q6. How can I participate as an artist?</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(6)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 6}
                    >
                      {activeIndex === 6 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 6}>
                <div className="content">
                  -
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 7 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>Q7. How can I participate as a collector?</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(7)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 7}
                    >
                      {activeIndex === 7 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 7}>
                <div className="content">
                  -
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 8 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>Q8. How can I participate as a scientist?</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(8)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 8}
                    >
                      {activeIndex === 8 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 8}>
                <div className="content">
                  -
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 9 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>Q9. How can I participate as an ocean conservation organization?</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(9)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 9}
                    >
                      {activeIndex === 9 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 9}>
                <div className="content">
                  -
                </div>
              </Collapse>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

//per-page layout
Faq.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Faq;