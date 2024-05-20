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
                    <div>{t('page.faq.ourMission.q1')}</div>
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
                  {t('page.faq.ourMission.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 2 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.ourMission.q2')}</div>
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
                  {t('page.faq.ourMission.a2')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 3 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.ourMission.q3')}</div>
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
                  {t('page.faq.ourMission.a3')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 4 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.ourMission.q4')}</div>
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
                  {t('page.faq.ourMission.a4')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 5 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.ourMission.q5')}</div>
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
                  {t('page.faq.ourMission.a5')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 6 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.ourMission.q6')}</div>
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
                  {t('page.faq.ourMission.a6')}
                </div>
              </Collapse>
            </Card>
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.communityEvents')}</h4>
            <Card className={activeIndex === 7 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.communityEvents.q1')}</div>
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
                  {t('page.faq.communityEvents.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 8 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.communityEvents.q2')}</div>
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
                  {t('page.faq.communityEvents.a2')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 9 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.communityEvents.q3')}</div>
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
                  {t('page.faq.communityEvents.a3')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 10 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.communityEvents.q4')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(10)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 10}
                    >
                      {activeIndex === 10 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 10}>
                <div className="content">
                  {t('page.faq.communityEvents.a4')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 11 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.communityEvents.q5')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(11)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 11}
                    >
                      {activeIndex === 11 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 11}>
                <div className="content">
                  {t('page.faq.communityEvents.a5')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 12 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.communityEvents.q6')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(12)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 12}
                    >
                      {activeIndex === 12 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 12}>
                <div className="content">
                  {t('page.faq.communityEvents.a6')}
                </div>
              </Collapse>
            </Card>                        
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.blockchain')}</h4>
            <Card className={activeIndex === 13 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.blockchain.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(13)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 13}
                    >
                      {activeIndex === 13 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 13}>
                <div className="content">
                  {t('page.faq.blockchain.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 14 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.blockchain.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(14)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 14}
                    >
                      {activeIndex === 14 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 14}>
                <div className="content">
                  {t('page.faq.blockchain.a2')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 15 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.blockchain.q3')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(15)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 15}
                    >
                      {activeIndex === 15 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 15}>
                <div className="content">
                  {t('page.faq.blockchain.a3')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 16 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.blockchain.q4')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(16)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 16}
                    >
                      {activeIndex === 16 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 16}>
                <div className="content">
                  {t('page.faq.blockchain.a4')}
                </div>
              </Collapse>
            </Card>                      
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.AI')}</h4>
            <Card className={activeIndex === 17 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.AI.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(17)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 17}
                    >
                      {activeIndex === 17 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 17}>
                <div className="content">
                  {t('page.faq.AI.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 18 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.AI.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(18)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 18}
                    >
                      {activeIndex === 18 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 18}>
                <div className="content">
                  {t('page.faq.AI.a2')}
                </div>
              </Collapse>
            </Card>                    
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.AR')}</h4>
            <Card className={activeIndex === 19 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.AR.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(19)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 19}
                    >
                      {activeIndex === 19 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 19}>
                <div className="content">
                  {t('page.faq.AR.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 20 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.AR.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(20)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 20}
                    >
                      {activeIndex === 20 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 20}>
                <div className="content">
                  {t('page.faq.AR.a2')}
                </div>
              </Collapse>
            </Card>                    
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.terminology')}</h4>
            <Card className={activeIndex === 21 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.terminology.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(21)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 1}
                    >
                      {activeIndex === 21 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 21}>
                <div className="content">
                  {t('page.faq.terminology.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 22 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.terminology.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(22)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 22}
                    >
                      {activeIndex === 22 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 22}>
                <div className="content">
                  {t('page.faq.terminology.a2')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 23 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.terminology.q3')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(23)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 23}
                    >
                      {activeIndex === 23 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 23}>
                <div className="content">
                  {t('page.faq.terminology.a3')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 24 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.terminology.q4')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(24)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 24}
                    >
                      {activeIndex === 24 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 24}>
                <div className="content">
                  {t('page.faq.terminology.a4')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 25 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.terminology.q5')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(25)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 25}
                    >
                      {activeIndex === 25 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 25}>
                <div className="content">
                  {t('page.faq.terminology.a5')}
                </div>
              </Collapse>
            </Card>
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.fee')}</h4>
            <Card className={activeIndex === 26 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.fee.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(26)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 26}
                    >
                      {activeIndex === 26 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 26}>
                <div className="content">
                  <p>{t('page.faq.fee.a1')}</p><u><a href="https://www.coindesk.com/price/polygon" target="_blank">Latest MATIC price</a></u><p></p><p><u><a href="https://tokentool.bitbond.com/gasprice/polygon" target="_blank">Latest estimated gas fee</a></u></p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 27 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.fee.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(27)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 27}
                    >
                      {activeIndex === 27 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 27}>
                <div className="content">
                  {t('page.faq.fee.a2')}<u><a href="https://tokentool.bitbond.com/gasprice/polygon" target="_blank">here.</a></u>
                </div>
              </Collapse>
            </Card>                    
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.donation')}</h4>
            <Card className={activeIndex === 28 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(28)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 1}
                    >
                      {activeIndex === 28 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 28}>
                <div className="content">
                  <p>{t('page.faq.donation.a1-1')}</p><p>{t('page.faq.donation.a1-2')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 29 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(29)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 29}
                    >
                      {activeIndex === 29 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 29}>
                <div className="content">
                  {t('page.faq.donation.a2')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 30 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q3')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(30)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 30}
                    >
                      {activeIndex === 30 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 30}>
                <div className="content">
                  {t('page.faq.donation.a3')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 31 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q4')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(31)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 31}
                    >
                      {activeIndex === 31 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 31}>
                <div className="content">
                  {t('page.faq.donation.a4')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 32 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q5')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(32)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 32}
                    >
                      {activeIndex === 32 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 32}>
                <div className="content">
                  {t('page.faq.donation.a5')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 33 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q6')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(33)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 33}
                    >
                      {activeIndex === 33 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 33}>
                <div className="content">
                  {t('page.faq.donation.a6')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 34 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q7')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(34)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 34}
                    >
                      {activeIndex === 34 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 34}>
                <div className="content">
                  {t('page.faq.donation.a7')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 35 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q8')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(35)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 35}
                    >
                      {activeIndex === 35 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 35}>
                <div className="content">
                  {t('page.faq.donation.a8')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 36 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q9')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(36)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 36}
                    >
                      {activeIndex === 36 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 36}>
                <div className="content">
                  {t('page.faq.donation.a9')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 37 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q10')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(37)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 37}
                    >
                      {activeIndex === 37 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 37}>
                <div className="content">
                  {t('page.faq.donation.a10')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 38 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q11')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(38)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 38}
                    >
                      {activeIndex === 38 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 38}>
                <div className="content">
                  {t('page.faq.donation.a11')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 39 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q12')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(39)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 39}
                    >
                      {activeIndex === 39 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 39}>
                <div className="content">
                  {t('page.faq.donation.a12')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 40 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q13')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(40)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 40}
                    >
                      {activeIndex === 40 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 40}>
                <div className="content">
                  {t('page.faq.donation.a13')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 41 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q14')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(41)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 41}
                    >
                      {activeIndex === 41 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 41}>
                <div className="content">
                  <p>{t('page.faq.donation.a14-1')}</p><p>{t('page.faq.donation.a14-2')}</p><p>{t('page.faq.donation.a14-3')}</p><p>{t('page.faq.donation.a14-4')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 42 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.donation.q15')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(42)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 42}
                    >
                      {activeIndex === 42 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 42}>
                <div className="content">
                  {t('page.faq.donation.a15')}
                </div>
              </Collapse>
            </Card>                        
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.royalties')}</h4>
            <Card className={activeIndex === 43 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.royalties.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(43)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 43}
                    >
                      {activeIndex === 43 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 43}>
                <div className="content">
                  {t('page.faq.royalties.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 44 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.royalties.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(44)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 44}
                    >
                      {activeIndex === 44 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 44}>
                <div className="content">
                  {t('page.faq.royalties.a2')}
                </div>
              </Collapse>
            </Card>                    
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.rewards')}</h4>
            <Card className={activeIndex === 45 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.rewards.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(45)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 45}
                    >
                      {activeIndex === 45 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 45}>
                <div className="content">
                  {t('page.faq.rewards.a1')}
                </div>
              </Collapse>
            </Card>                   
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.howTo')}</h4>
            <Card className={activeIndex === 46 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.howTo.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(46)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 46}
                    >
                      {activeIndex === 46 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 46}>
                <div className="content">
                  {t('page.faq.howTo.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 47 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.howTo.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(47)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 47}
                    >
                      {activeIndex === 47 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 47}>
                <div className="content">
                  {t('page.faq.howTo.a2')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 48 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.howTo.q3')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(48)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 48}
                    >
                      {activeIndex === 48 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 48}>
                <div className="content">
                  {t('page.faq.howTo.a3')}
                </div>
              </Collapse>
            </Card>                    
          </div> 

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.mobileApp')}</h4>
            <Card className={activeIndex === 49 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(49)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 49}
                    >
                      {activeIndex === 49 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 49}>
                <div className="content">
                  {t('page.faq.mobileApp.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 50 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(50)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 50}
                    >
                      {activeIndex === 50 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 50}>
                <div className="content">
                  {t('page.faq.mobileApp.a2')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 51 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q3')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(51)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 51}
                    >
                      {activeIndex === 51 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 51}>
                <div className="content">
                  {t('page.faq.mobileApp.a3')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 52 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q4')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(52)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 52}
                    >
                      {activeIndex === 52 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 52}>
                <div className="content">
                  {t('page.faq.mobileApp.a4')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 53 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q5')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(53)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 53}
                    >
                      {activeIndex === 53 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 53}>
                <div className="content">
                  {t('page.faq.mobileApp.a5')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 54 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q6')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(54)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 54}
                    >
                      {activeIndex === 54 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 54}>
                <div className="content">
                  {t('page.faq.mobileApp.a6')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 55 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q7')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(55)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 55}
                    >
                      {activeIndex === 55 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 55}>
                <div className="content">
                  <p>{t('page.faq.mobileApp.a7-1')}</p><p>{t('page.faq.mobileApp.a7-2')}</p><p>{t('page.faq.mobileApp.a7-3')}</p><p>{t('page.faq.mobileApp.a7-4')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 56 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q8')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(56)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 56}
                    >
                      {activeIndex === 56 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 56}>
                <div className="content">
                  {t('page.faq.mobileApp.a8')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 57 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q9')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(57)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 57}
                    >
                      {activeIndex === 57 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 57}>
                <div className="content">
                  <p>{t('page.faq.mobileApp.a9-1')}</p><p>{t('page.faq.mobileApp.a9-2')}</p><p>{t('page.faq.mobileApp.a9-3')}</p><p>{t('page.faq.mobileApp.a9-4')}</p><p>{t('page.faq.mobileApp.a9-5')}</p><p>{t('page.faq.mobileApp.a9-6')}</p><p>{t('page.faq.mobileApp.a9-7')}</p><p>{t('page.faq.mobileApp.a9-8')}</p><p>{t('page.faq.mobileApp.a9-9')}</p><p>{t('page.faq.mobileApp.a9-10')}</p><p>{t('page.faq.mobileApp.a9-11')}</p><p>{t('page.faq.mobileApp.a9-12')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 58 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q10')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(58)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 58}
                    >
                      {activeIndex === 58 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 58}>
                <div className="content">
                  <p>{t('page.faq.mobileApp.a10-1')}</p><p>{t('page.faq.mobileApp.a10-2')}</p><p>{t('page.faq.mobileApp.a10-3')}</p><p>{t('page.faq.mobileApp.a10-4')}</p><p>{t('page.faq.mobileApp.a10-5')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 59 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q11')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(59)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 59}
                    >
                      {activeIndex === 59 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 59}>
                <div className="content">
                  {t('page.faq.mobileApp.a11')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 60 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q12')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(60)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 60}
                    >
                      {activeIndex === 60 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 60}>
                <div className="content">
                  {t('page.faq.mobileApp.a12')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 61 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q13')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(61)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 61}
                    >
                      {activeIndex === 61 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 61}>
                <div className="content">
                  <p>{t('page.faq.mobileApp.a13-1')}</p><p>{t('page.faq.mobileApp.a13-2')}</p><p>{t('page.faq.mobileApp.a13-3')}</p><p>{t('page.faq.mobileApp.a13-4')}</p><p>{t('page.faq.mobileApp.a13-5')}</p><p>{t('page.faq.mobileApp.a13-6')}</p><p>{t('page.faq.mobileApp.a13-7')}</p><p>{t('page.faq.mobileApp.a13-8')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 62 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q14')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(62)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 62}
                    >
                      {activeIndex === 62 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 62}>
                <div className="content">
                  {t('page.faq.mobileApp.a14')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 63 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q15')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(63)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 63}
                    >
                      {activeIndex === 63 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 63}>
                <div className="content">
                  {t('page.faq.mobileApp.a15')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 64 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q16')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(64)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 64}
                    >
                      {activeIndex === 64 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 64}>
                <div className="content">
                  {t('page.faq.mobileApp.a16')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 65 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q17')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(65)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 65}
                    >
                      {activeIndex === 65 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 65}>
                <div className="content">
                  {t('page.faq.mobileApp.a17')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 66 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q18')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(66)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 66}
                    >
                      {activeIndex === 66 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 66}>
                <div className="content">
                  <p>{t('page.faq.mobileApp.a18-1')}</p><p>{t('page.faq.mobileApp.a18-2')}</p><p>{t('page.faq.mobileApp.a18-3')}</p><p>{t('page.faq.mobileApp.a18-4')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 67 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q19')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(67)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 7}
                    >
                      {activeIndex === 67 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 67}>
                <div className="content">
                  <p>{t('page.faq.mobileApp.a19-1')}</p><p>{t('page.faq.mobileApp.a19-2')}</p><p>{t('page.faq.mobileApp.a19-3')}</p><p>{t('page.faq.mobileApp.a19-4')}</p><p>{t('page.faq.mobileApp.a19-5')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 68 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q20')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(68)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 68}
                    >
                      {activeIndex === 68 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 68}>
                <div className="content">
                  {t('page.faq.mobileApp.a20')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 69 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q21')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(69)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 69}
                    >
                      {activeIndex === 69 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 69}>
                <div className="content">
                  {t('page.faq.mobileApp.a21')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 70 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q22')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(70)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 70}
                    >
                      {activeIndex === 70 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 70}>
                <div className="content">
                  {t('page.faq.mobileApp.a22')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 71 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q23')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(71)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 71}
                    >
                      {activeIndex === 71 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 71}>
                <div className="content">
                  {t('page.faq.mobileApp.a23')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 72 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q24')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(72)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 72}
                    >
                      {activeIndex === 72 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 72}>
                <div className="content">
                  {t('page.faq.mobileApp.a24')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 73 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q25')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(73)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 73}
                    >
                      {activeIndex === 73 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 73}>
                <div className="content">
                  {t('page.faq.mobileApp.a25')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 74 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q26')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(74)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 74}
                    >
                      {activeIndex === 74 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 74}>
                <div className="content">
                  {t('page.faq.mobileApp.a26')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 75 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q27')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(75)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 75}
                    >
                      {activeIndex === 75 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 75}>
                <div className="content">
                  {t('page.faq.mobileApp.a27')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 76 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q28')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(76)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 76}
                    >
                      {activeIndex === 76 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 76}>
                <div className="content">
                  <p>{t('page.faq.mobileApp.a28-1')}</p><p>{t('page.faq.mobileApp.a28-2')}</p><p>{t('page.faq.mobileApp.a28-3')}</p><p>{t('page.faq.mobileApp.a28-4')}</p><p>{t('page.faq.mobileApp.a28-5')}</p><p>{t('page.faq.mobileApp.a28-6')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 77 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q29')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(77)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 77}
                    >
                      {activeIndex === 77 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 77}>
                <div className="content">
                  {t('page.faq.mobileApp.a29')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 78 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q30')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(78)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 78}
                    >
                      {activeIndex === 78 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 78}>
                <div className="content">
                  <p>{t('page.faq.mobileApp.a30-1')}</p><p>{t('page.faq.mobileApp.a30-2')}</p><p>{t('page.faq.mobileApp.a30-3')}</p><p>{t('page.faq.mobileApp.a30-4')}</p><p>{t('page.faq.mobileApp.a30-5')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 79 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q31')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(79)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 79}
                    >
                      {activeIndex === 7 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 79}>
                <div className="content">
                  {t('page.faq.mobileApp.a31')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 80 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q32')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(80)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 80}
                    >
                      {activeIndex === 80 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 80}>
                <div className="content">
                  {t('page.faq.mobileApp.a32')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 81 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q33')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(81)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 81}
                    >
                      {activeIndex === 81 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 81}>
                <div className="content">
                  {t('page.faq.mobileApp.a33')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 82 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q34')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(82)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 82}
                    >
                      {activeIndex === 82 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 82}>
                <div className="content">
                  {t('page.faq.mobileApp.a34')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 83 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q35')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(83)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 83}
                    >
                      {activeIndex === 83 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 83}>
                <div className="content">
                  {t('page.faq.mobileApp.a35')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 84 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.mobileApp.q36')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(84)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 84}
                    >
                      {activeIndex === 84 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 84}>
                <div className="content">
                  {t('page.faq.mobileApp.a36')}
                </div>
              </Collapse>
            </Card>                                                                           
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.website')}</h4>
            <Card className={activeIndex === 85 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.website.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(85)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 85}
                    >
                      {activeIndex === 85 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 85}>
                <div className="content">
                  {t('page.faq.website.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 86 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.website.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(86)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 86}
                    >
                      {activeIndex === 86 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 86}>
                <div className="content">
                  {t('page.faq.website.a2')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 87 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.website.q3')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(87)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 87}
                    >
                      {activeIndex === 87 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 87}>
                <div className="content">
                  {t('page.faq.website.a3')}
                </div>
              </Collapse>
            </Card>                    
          </div> 

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.carbon')}</h4>
            <Card className={activeIndex === 88 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(88)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 88}
                    >
                      {activeIndex === 88 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 88}>
                <div className="content">
                  {t('page.faq.carbon.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 89 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(89)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 89}
                    >
                      {activeIndex === 89 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 89}>
                <div className="content">
                  <p>{t('page.faq.carbon.a2-1')}</p><p>{t('page.faq.carbon.a2-2')}</p><p>{t('page.faq.carbon.a2-3')}</p><p>{t('page.faq.carbon.a2-4')}</p>
                </div>
              </Collapse>
            </Card>                
            <Card className={activeIndex === 90 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q3')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(90)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 90}
                    >
                      {activeIndex === 90 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 90}>
                <div className="content">
                  {t('page.faq.carbon.a3')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 91 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q4')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(91)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 91}
                    >
                      {activeIndex === 91 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 91}>
                <div className="content">
                  {t('page.faq.carbon.a4')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 92 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q5')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(92)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 92}
                    >
                      {activeIndex === 92 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 92}>
                <div className="content">
                  <p>{t('page.faq.carbon.a5-1')}</p><p>{t('page.faq.carbon.a5-2')}</p><p>{t('page.faq.carbon.a5-3')}</p>
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 93 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q6')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(93)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 93}
                    >
                      {activeIndex === 93 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 93}>
                <div className="content">
                  {t('page.faq.carbon.a6')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 94 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q7')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(94)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 94}
                    >
                      {activeIndex === 94 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 94}>
                <div className="content">
                  {t('page.faq.carbon.a7')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 95 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q8')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(95)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 95}
                    >
                      {activeIndex === 95 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 95}>
                <div className="content">
                  {t('page.faq.carbon.a8')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 96 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q9')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(96)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 96}
                    >
                      {activeIndex === 96 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 96}>
                <div className="content">
                  {t('page.faq.carbon.a9')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 97 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.carbon.q10')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(97)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 97}
                    >
                      {activeIndex === 97 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 97}>
                <div className="content">
                  {t('page.faq.carbon.a10')}
                </div>
              </Collapse>
            </Card>                                    
          </div>

          <div className="card_item">
            <h4 style={{ marginBottom: '20px' }}>{t('page.faq.others')}</h4>
            <Card className={activeIndex === 98 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.others.q1')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(98)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 98}
                    >
                      {activeIndex === 98 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 98}>
                <div className="content">
                  {t('page.faq.others.a1')}
                </div>
              </Collapse>
            </Card>
            <Card className={activeIndex === 99 ? 'item_qa bg_gray' : 'item_qa'}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{t('page.faq.others.q2')}</div>
                  </div>
                  <div>
                    <Button
                      className='card_btn'
                      variant="link"
                      onClick={() => handleToggle(99)}
                      aria-controls="collapseExample4"
                      aria-expanded={activeIndex === 99}
                    >
                      {activeIndex === 99 ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Collapse in={activeIndex === 99}>
                <div className="content">
                  {t('page.faq.others.a2')}
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