import { useEffect, useState } from "react";
import homeStyles from '../styles/Home.module.css';
import Layout from '../components/IndexPageLayout';
import Head from '../components/homepage/Head';
import Intro from '../components/homepage/Intro';
import Intro2 from '../components/homepage/Intro2';
import Gallery from '../components/homepage/Gallery';
import Create from '../components/homepage/Create';
import Donate from '../components/homepage/Donate';
import Donate2 from '../components/homepage/Donate2';
import Mindfultoken from '../components/homepage/Mindfultoken';
import Draw from '../components/homepage/Draw';
import Redeem from '../components/homepage/Redeem';
import Team from '../components/homepage/Team';
import Mintpass from '../components/homepage/Mintpass';
import Redeem1 from '../components/homepage/Redeem1';
import { useTranslation } from '../i18n';

export default function Home() {
  const { t, locale } = useTranslation();

  return(
    <div className={homeStyles.main}>
      <Head t={t} />
      <Intro t={t} />
      <Intro2 t={t} />
      <Gallery t={t} />
      <Donate2 t={t} />
      <Mindfultoken t={t} />
      <Draw t={t} />
      <Mintpass t={t} />
      <Redeem1 t={t} />
      {/* <Donate t={t} /> */}
      {/* <Redeem t={t} /> */}
      {/* <Team t={t} /> */}
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