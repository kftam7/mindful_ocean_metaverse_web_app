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
            title: t('home.part4.phase1.subTitle1'),
            des: t('home.part4.phase1.subText1'),
          },
          {
            title: t('home.part4.phase1.subTitle2'),
            des: t('home.part4.phase1.subText2'),
            imgUrl: '/P1a_credit-Stock Image Source by Freepik.jpg',
          },
          {
            title: t('home.part4.phase1.subTitle3'),
            des: t('home.part4.phase1.subText3'),
            imgUrl: '/P1b.jpg',
          },
        ],
      },
      '2': {
        title: t('home.part4.subTitle2'),
        list: [
          {
            title: t('home.part4.phase2.subTitle1'),
            des: t('home.part4.phase2.subText1'),
          },
          {
            title: t('home.part4.phase2.subTitle2'),
            des: t('home.part4.phase2.subText2'),
            imgUrl: '/P2.jpg',
          },          
        ],
      },
      '3': {
        title: t('home.part4.subTitle3'),
        list: [
          {
            title: t('home.part4.phase3.subTitle1'),
            des: t('home.part4.phase3.subText1'),
          },
          {
            title: t('home.part4.phase3.subTitle2'),
            des: t('home.part4.phase3.subText2'),
            imgUrl: '/P3a.jpg',
          },
          {
            imgUrl: '/P3b.jpg',
          },            
        ],
      },
      '4': {
        title: t('home.part4.subTitle4'),
        list: [
          {
            title: t('home.part4.phase4.subTitle1'),
            des: t('home.part4.phase4.subText1'),
          },
          {
            title: t('home.part4.phase4.subTitle2'),
            des: t('home.part4.phase4.subText2'),
            imgUrl: '/P4.gif',
          },          
        ],
      },
      '5': {
        title: t('home.part4.subTitle5'),
        list: [
          {
            title: t('home.part4.phase5.subTitle1'),
            des: t('home.part4.phase5.subText1'),
          },
          {
            title: t('home.part4.phase5.subTitle2'),
            des: t('home.part4.phase5.subText2'),
            imgUrl: '/P5.jpg',
          },
          {
            title: t('home.part4.phase5.subTitle3'),
            des: t('home.part4.phase5.subText3'),
          },                    
        ],
      },
      '6': {
        title: t('home.part4.subTitle6'),
        list: [
          {
            title: t('home.part4.phase6.subTitle1'),
            des: t('home.part4.phase6.subText1'),
          },
          {
            title: t('home.part4.phase6.subTitle2'),
            des: t('home.part4.phase6.subText2'),
            imgUrl: '/P6.gif',
          },
        ],
      },
      '18': {
        title: t('home.event1.title'),
        list: [
          {
            title: t('home.event1.subTitle1'),
            des: t('home.event1.subText1'),
          },          
          {
            title: t('home.event1.subTitle2'),
            des: t('home.event1.subText2'),
          },
          {
            title: t('home.event1.subTitle3'),
            des: t('home.event1.subText3'),
          },
          {
            title: t('home.event1.subTitle4'),
            des: t('home.event1.subText4'),
          },
          {
            title: t('home.event1.subTitle5'),
            des: t('home.event1.subText5'),
          },
          {
            title: t('home.event1.subTitle6'),
            des: t('home.event1.subText6'),
          },
          {
            title: t('home.event1.subTitle7'),
            des: t('home.event1.subText7'),
          },
          {
            title: t('home.event1.subTitle8'),
            des: t('home.event1.subText8'),
          },
          {
            title: t('home.event1.subTitle9'),
            des: t('home.event1.subText9'),
          },
          {
            title: t('home.event1.subTitle10'),
            des: t('home.event1.subText10'),
          },
          {
            title: t('home.event1.subTitle11'),
            des: t('home.event1.subText11'),
          },
          {
            title: t('home.event1.subTitle12'),
            des: t('home.event1.subText12'),
          },
          {
            title: t('home.event1.subTitle13'),
            des: t('home.event1.subText13'),
          },
          {
            title: t('home.event1.subTitle14'),
            des: t('home.event1.subText14'),
          },
          {
            title: t('home.event1.subTitle15'),
            des: t('home.event1.subText15'),
          },                                               
        ],
      },
      '19': {
        title: t('home.event2.title'),
        list: [
          {
            title: t('home.event2.subTitle13'),
            des: t('home.event2.subText13'),
          },                                  
          {
            title: t('home.event2.subTitle2'),
            des: t('home.event2.subText2'),
          },
          {
            title: t('home.event2.subTitle3'),
            des: t('home.event2.subText3'),
          },
          {
            title: t('home.event2.subTitle4'),
            des: t('home.event2.subText4'),
          },
          {
            title: t('home.event2.subTitle5'),
            des: t('home.event2.subText5'),
          },
          {
            title: t('home.event2.subTitle6'),
            des: t('home.event2.subText6'),
          },
          {
            title: t('home.event2.subTitle7'),
            des: t('home.event2.subText7'),
          },
          {
            title: t('home.event2.subTitle8'),
            des: t('home.event2.subText8'),
          },
          {
            title: t('home.event2.subTitle9'),
            des: t('home.event2.subText9'),
          },
          {
            title: t('home.event2.subTitle10'),
            des: t('home.event2.subText10'),
          },
          {
            title: t('home.event2.subTitle11'),
            des: t('home.event2.subText11'),
          },
          {
            title: t('home.event2.subTitle12'),
            des: t('home.event2.subText12'),
          },                               
        ],
      },
      '20': {
        title: t('home.event3.title'),
        list: [
          {
            title: t('home.event3.subTitle16'),
            des: t('home.event3.subText16'),
          },          
          {
            title: t('home.event3.subTitle2'),
            des: t('home.event3.subText2'),
          }, 
          {
            title: t('home.event3.subTitle3'),
            des: t('home.event3.subText3'),
          }, 
          {
            title: t('home.event3.subTitle4'),
            des: t('home.event3.subText4'),
          }, 
          {
            title: t('home.event3.subTitle5'),
            des: t('home.event3.subText5'),
          },
          {
            title: t('home.event3.subTitle6'),
            des: t('home.event3.subText6'),
          }, 
          {
            title: t('home.event3.subTitle7'),
            des: t('home.event3.subText7'),
          }, 
          {
            title: t('home.event3.subTitle8'),
            des: t('home.event3.subText8'),
          }, 
          {
            title: t('home.event3.subTitle9'),
            des: t('home.event3.subText9'),
          }, 
          {
            title: t('home.event3.subTitle10'),
            des: t('home.event3.subText10'),
          },
          {
            title: t('home.event3.subTitle11'),
            des: t('home.event3.subText11'),
          }, 
          {
            title: t('home.event3.subTitle12'),
            des: t('home.event3.subText12'),
          }, 
          {
            title: t('home.event3.subTitle13'),
            des: t('home.event3.subText13'),
          }, 
          {
            title: t('home.event3.subTitle14'),
            des: t('home.event3.subText14'),
          }, 
          {
            title: t('home.event3.subTitle15'),
            des: t('home.event3.subText15'),
          },                                                                                                       
        ],
      },
      '21': {
        list: [
          {
            des: t('home.event4.subText1'),
          },                                           
        ],
      },  
      '22': {
        title: t('home.pastdirectory.title'),
        list: [
          {
            des: t('home.pastdirectory.subTitle6'),
          },            
          {
            des: t('home.pastdirectory.subTitle5'),
          },  
          {
            des: t('home.pastdirectory.subTitle4'),
          },          
          {
            des: t('home.pastdirectory.subTitle3'),
          },   
          {
            des: t('home.pastdirectory.subTitle1'),
          }, 
          {
            des: t('home.pastdirectory.subTitle2'),
          },                                                                
        ],
      },
      '23': {
        title: t('home.event5.title'),
        list: [
          {
            des: t('home.event5.subText0'),
          },
          {
            des: t('home.event5.result'),
          },                  
          {
            title: t('home.event5.subTitle1'),
            des: t('home.event5.subText1'),
          }, 
          {
            title: t('home.event5.subTitle2'),
            des: t('home.event5.subText2'),
          },
          {
            title: t('home.event5.subTitle3'),
            des: t('home.event5.subText3'),
          }, 
          {
            title: t('home.event5.subTitle4'),
            des: t('home.event5.subText4'),
          },
          {
            title: t('home.event5.subTitle5'),
            des: t('home.event5.subText5'),
          },   
          {
            title: t('home.event5.subTitle6'),
            des: t('home.event5.subText6'),
          },   
          {
            title: t('home.event5.subTitle7'),
            des: t('home.event5.subText7'),
          },   
          {
            title: t('home.event5.subTitle8'),
            des: t('home.event5.subText8'),
          },     
          {
            title: t('home.event5.subTitle9'),
            des: t('home.event5.subText9'),
          },                                                                                                               
        ],
      },
      '24': {
        title: t('home.event6.title'),
        list: [
          {
            des: t('home.event6.subText0'),
          },            
          {
            des: t('home.event6.result'),
          },    
          {
            des: t('home.event6.subText1'),
          }, 
          {
            title: t('home.event6.subTitle2'),
            des: t('home.event6.subText2'),
          },
          {
            title: t('home.event6.subTitle3'),
            des: t('home.event6.subText3'),
          }, 
          {
            title: t('home.event6.subTitle4'),
            des: t('home.event6.subText4'),
          },
          {
            title: t('home.event6.subTitle5'),
            des: t('home.event6.subText5'),
          },   
          {
            title: t('home.event6.subTitle6'),
            des: t('home.event6.subText6'),
          },   
          {
            title: t('home.event6.subTitle7'),
            des: t('home.event6.subText7'),
          },   
          {
            title: t('home.event6.subTitle8'),
            des: t('home.event6.subText8'),
          },     
          {
            title: t('home.event6.subTitle9'),
            des: t('home.event6.subText9'),
          },
          {
            title: t('home.event6.subTitle10'),
            des: t('home.event6.subText10'),
          },
          {
            title: t('home.event6.subTitle11'),
            des: t('home.event6.subText11'),
          },
          {
            title: t('home.event6.subTitle12'),
            des: t('home.event6.subText12'),
          },
          {
            title: t('home.event6.subTitle13'),
            des: t('home.event6.subText13'),
          },
          {
            title: t('home.event6.subTitle14'),
            des: t('home.event6.subText14'),
          },                                                                                                                                                                          
        ],
      },
      '25': {
        title: t('home.event7.title'),
        list: [
          {
            des: t('home.event7.subText0'),
          },            
          {
            des: t('home.event7.result'),
          },    
          {
            des: t('home.event7.subText1'),
          }, 
          {
            title: t('home.event7.subTitle2'),
            des: t('home.event7.subText2'),
          },
          {
            title: t('home.event7.subTitle3'),
            des: t('home.event7.subText3'),
          }, 
          {
            title: t('home.event7.subTitle4'),
            des: t('home.event7.subText4'),
          },
          {
            title: t('home.event7.subTitle5'),
            des: t('home.event7.subText5'),
          },   
          {
            title: t('home.event7.subTitle6'),
            des: t('home.event7.subText6'),
          },   
          {
            title: t('home.event7.subTitle7'),
            des: t('home.event7.subText7'),
          },   
          {
            title: t('home.event7.subTitle8'),
            des: t('home.event7.subText8'),
          },     
          {
            title: t('home.event7.subTitle9'),
            des: t('home.event7.subText9'),
          },
          {
            title: t('home.event7.subTitle10'),
            des: t('home.event7.subText10'),
          },
          {
            title: t('home.event7.subTitle11'),
            des: t('home.event7.subText11'),
          },
          {
            title: t('home.event7.subTitle12'),
            des: t('home.event7.subText12'),
          },
          {
            title: t('home.event7.subTitle13'),
            des: t('home.event7.subText13'),
          },
          {
            title: t('home.event7.subTitle14'),
            des: t('home.event7.subText14'),
          },                                                                                                                                                                          
        ],
      },
      '26': {
        title: t('home.event8.title'),
        list: [
          {
            des: t('home.event8.subText0'),
          },            
          {
            des: t('home.event8.subText1'),
          }, 
          {
            title: t('home.event8.subTitle2'),
            des: t('home.event8.subText2'),
          },
          {
            title: t('home.event8.subTitle3'),
            des: t('home.event8.subText3'),
          }, 
          {
            title: t('home.event8.subTitle4'),
            des: t('home.event8.subText4'),
          },
          {
            title: t('home.event8.subTitle5'),
            des: t('home.event8.subText5'),
          },   
          {
            title: t('home.event8.subTitle6'),
            des: t('home.event8.subText6'),
          },   
          {
            title: t('home.event8.subTitle7'),
            des: t('home.event8.subText7'),
          },   
          {
            title: t('home.event8.subTitle8'),
            des: t('home.event8.subText8'),
          },     
          {
            title: t('home.event8.subTitle9'),
            des: t('home.event8.subText9'),
          },
          {
            title: t('home.event8.subTitle10'),
            des: t('home.event8.subText10'),
          },
          {
            title: t('home.event8.subTitle11'),
            des: t('home.event8.subText11'),
          },
          {
            title: t('home.event8.subTitle12'),
            des: t('home.event8.subText12'),
          },
          {
            title: t('home.event8.subTitle13'),
            des: t('home.event8.subText13'),
          },
          {
            title: t('home.event8.subTitle14'),
            des: t('home.event8.subText14'),
          },                                                                                                                                                                          
        ],
      },
      '27': {
        title: t('home.event9.title'),
        list: [       
          {
            des: t('home.event9.subText1'),
          }, 
          {
            title: t('home.event9.subTitle2'),
            des: t('home.event9.subText2'),
          },
          {
            title: t('home.event9.subTitle3'),
            des: t('home.event9.subText3'),
          }, 
          {
            title: t('home.event9.subTitle4'),
            des: t('home.event9.subText4'),
          },
          {
            title: t('home.event9.subTitle5'),
            des: t('home.event9.subText5'),
          },   
          {
            title: t('home.event9.subTitle6'),
            des: t('home.event9.subText6'),
          },   
          {
            title: t('home.event9.subTitle7'),
            des: t('home.event9.subText7'),
          },   
          {
            title: t('home.event9.subTitle8'),
            des: t('home.event9.subText8'),
          },     
          {
            title: t('home.event9.subTitle9'),
            des: t('home.event9.subText9'),
          },
          {
            title: t('home.event9.subTitle10'),
            des: t('home.event9.subText10'),
          },
          {
            title: t('home.event9.subTitle11'),
            des: t('home.event9.subText11'),
          },
          {
            title: t('home.event9.subTitle12'),
            des: t('home.event9.subText12'),
          },
          {
            title: t('home.event9.subTitle13'),
            des: t('home.event9.subText13'),
          },
          {
            title: t('home.event9.subTitle14'),
            des: t('home.event9.subText14'),
          },                                                                                                                                                                          
        ],
      },
      '28': {
        title: t('home.event10.title'),
        list: [       
          {
            des: t('home.event10.subText1'),
          }, 
          {
            title: t('home.event10.subTitle2'),
          },
          {
            title: t('home.event10.subTitle3'),
            des: t('home.event10.subText3'),
          }, 
          {
            title: t('home.event10.subTitle4'),
            des: t('home.event10.subText4'),
          },
          {
            title: t('home.event10.subTitle5'),
            des: t('home.event10.subText5'),
          },   
          {
            title: t('home.event10.subTitle6'),
            des: t('home.event10.subText6'),
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
                  <div className="item_des" dangerouslySetInnerHTML={{ __html: obj.des}} />
                </div>
              })}
            </div>
            {eventId < 6 ? <div className="text-center event_btn"><Button variant="outline-primary" onClick={() => window.location.href = `/event?eventId=${Number(eventId) + 1}`}>{t('button.continueReading')}</Button></div>
              : <div className="text-center event_btn"><Button variant="outline-primary" onClick={() => window.location.href = `/`}>&larr; {t('button.returnToHomepage')}</Button></div>}
            {eventId < 10 ? <EventStep
              eventId={eventId}
            /> : ''}
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