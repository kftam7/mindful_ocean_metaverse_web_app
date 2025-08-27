import { useEffect, useState } from "react";
import { Row, Col, Button, Container, Collapse, Card } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
import Layout from '../components/SubpageLayout';
import { getHeaders } from '../utils/utils';
import axios from 'axios';
import { useTranslation } from '../i18n';

const FaqDomain = () => {
  const { t, locale } = useTranslation();
  //const apiPort = process.env.API_PORT || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // 控制展开的面板索引

  const handleToggle = async (index) => {
    setActiveIndex(index === activeIndex ? null : index); // 切换展开的面板索引
  };

  return (

   <h5>{t('page.faq.frequentlyAskedQuestions')}</h5>
   
  )
}

//per-page layout
FaqDomain.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default FaqDomain;