import { useEffect, useState } from "react";
import { Image } from 'react-bootstrap';
import Layout from '../components/SubpageLayout';
import { useTranslation } from '../i18n';

const Event1 = (props) => {
  const { eventId } = props;
  const { t, locale } = useTranslation();

  const handStep = (currentEventId) => {
    return () => {
      if(currentEventId === Number(eventId)) return;
      window.location.href = `/event?eventId=${currentEventId}`;
    }
  };

  return (
    <div className="event_step">
      <div className="step_item">
        <div className={eventId === '1' ? "item_num active" : "item_num"} onClick={handStep(1)}>1</div>
        <div className="item_title">Artwork Creation<br />
          and Submission</div>
      </div>
      <div className="step_item">
        <div className="item_arrow"><Image src="/arrow_event.png" /></div>
      </div>
      <div className="step_item">
        <div className={eventId === '2' ? "item_num active" : "item_num"} onClick={handStep(2)}>2</div>
        <div className="item_title">Mintpass<br />
          Creation</div>
      </div>
      <div className="step_item">
        <div className="item_arrow"><Image src="/arrow_event.png" /></div>
      </div>
      <div className="step_item">
        <div className={eventId === '3' ? "item_num active" : "item_num"} onClick={handStep(3)}>3</div>
        <div className="item_title">AI Analysis</div>
      </div>
      <div className="step_item">
        <div className="item_arrow"><Image src="/arrow_event.png" /></div>
      </div>
      <div className="step_item">
        <div className={eventId === '4' ? "item_num active" : "item_num"} onClick={handStep(4)}>4</div>
        <div className="item_title">NFT Redemption</div>
      </div>
      <div className="step_item">
        <div className="item_arrow"><Image src="/arrow_event.png" /></div>
      </div>
      <div className="step_item">
        <div className={eventId === '5' ? "item_num active" : "item_num"} onClick={handStep(5)}>5</div>
        <div className="item_title">AR Metaverse</div>
      </div>
      <div className="step_item">
        <div className="item_arrow"><Image src="/arrow_event.png" /></div>
      </div>
      <div className="step_item">
        <div className={eventId === '6' ? "item_num active" : "item_num"} onClick={handStep(6)}>6</div>
        <div className="item_title">Donation</div>
      </div>
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