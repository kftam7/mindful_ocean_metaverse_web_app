import { useEffect, useState } from "react";
import homeStyles from '../styles/Home.module.css';
import Layout from '../components/IndexPageLayout';
import Head from '../components/homepage/Head';
import Intro from '../components/homepage/Intro';
import Gallery from '../components/homepage/Gallery';
import Create from '../components/homepage/Create';
import Donate from '../components/homepage/Donate';
import Draw from '../components/homepage/Draw';
import Redeem from '../components/homepage/Redeem';
import Team from '../components/homepage/Team';
import Mintpass from '../components/homepage/Mintpass';
import Redeem1 from '../components/homepage/Redeem1';

export default function Home(props) {
  const { lang } = props;

  return(
    <div className={homeStyles.main}>
      <Head />
      <Intro />
      <Gallery />
      <Draw />
      <Mintpass />
      <Redeem1 />
      <Donate />
      <Redeem />
      <Team />
    </div>
  )
}

//per-page layout
Home.getLayout = function getLayout(page) {
  return (
    <Layout myFunction={Home}>
      {page}
    </Layout>
  )
}