import { useEffect, useState } from "react";
import homeStyles from '../styles/Home.module.css';
import Layout from '../components/IndexPageLayout';
import Banner from '../components/homepage/Banner';
// import Intro from '../components/homepage/Intro';
// import Intro2 from '../components/homepage/Intro2';
// import Gallery from '../components/homepage/Gallery';
// import Donate2 from '../components/homepage/Donate2';
// import Mindfultoken from '../components/homepage/Mindfultoken';
// import Draw from '../components/homepage/Draw';
// import Mintpass from '../components/homepage/Mintpass';
// import Redeem1 from '../components/homepage/Redeem1';

import Part1 from '../components/homepage/Part1';
import Part2 from '../components/homepage/Part2';
import Part3 from '../components/homepage/Part3';
import Part3_1 from '../components/homepage/Part3_1';
import Part4 from '../components/homepage/Part4';
import Part5 from '../components/homepage/Part5';
import Part6 from '../components/homepage/Part6';
import Part7 from '../components/homepage/Part7';
import Part8 from '../components/homepage/Part8';
import Part9 from '../components/homepage/Part9';
import Part10 from '../components/homepage/Part10';
import Part11 from '../components/homepage/Part11';
import { useTranslation } from '../i18n';

export default function Home() {
  const { t, locale } = useTranslation();

  return(
    <div className={homeStyles.main}>
      <Banner t={t} />
      <Part1 t={t} />
      <Part2 t={t} />
      <Part3 t={t} />
      <Part12 t={t} />
      <Part13 t={t} />
      <Part3_1 t={t} />
      <Part4 t={t} />
      <Part5 t={t} />
      <Part6 t={t} />
      <Part7 t={t} />
      <Part8 t={t} />
      <Part9 t={t} />
      <Part10 t={t} />
      <Part11 t={t} />

      {/* <Intro t={t} />
      <Intro2 t={t} />
      <Gallery t={t} />
      <Donate2 t={t} />
      <Mindfultoken t={t} />
      <Draw t={t} />
      <Mintpass t={t} />
      <Redeem1 t={t} /> */}
    </div>
  )
}

//per-page layout
Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}