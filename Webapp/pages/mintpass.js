import { getSession } from 'next-auth/react';
import { getAccount, fetchMintpassContract } from '../store/actions';
import { fetchWeb3 } from '../store/web3Connections';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';
import Link from 'next/link';
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/SubmitPage.module.css';
import { Row, Col, Image, Button, Container } from 'react-bootstrap';

import axios from 'axios';
import fs from 'fs';
import { NFTStorage, File } from 'nft.storage';
import { useTranslation } from '../i18n';

export default function Mintpass({ session,user }) {
  const { t, locale } = useTranslation();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const mintpassContract = useSelector((state) => state.contractState);
  const username = user?.name;
  const endpoint = 'https://api.nft.storage'; // the default
  const token = process.env.IPFS_TOKEN;
  const assets = './assets';
  useEffect(async() => {
    await dispatch(getAccount());
    await dispatch(fetchMintpassContract());
  },[dispatch])

  //https://nft.storage/docs/how-to/mint-erc-1155/; can think about write mintpass NFT as ERC1155
  async function generateMeta() {
    const storage = new NFTStorage({ endpoint,token });
    fs.readdir(assets, async function (err, file) {
      let metadata = await storage.store({
        name: `Mindful Ocean Mint Pass`,
        description:
          `created by ${username}`,
          image: new File([await fs.promises.readFile(`./assets/${file}`)], file, {
            type: 'image/jpg/png',
          }),
        });
        console.log('IPFS URL for the metadata:', metadata.url)
    console.log('metadata.json contents:\n', metadata.data)
    console.log(
      'metadata.json contents with IPFS gateway URLs:\n',
    metadata.embed()    
    );
    });
  } //after getting the metadata url, still need to set URL from smart contract
  //if mint success, duplicate & remove the image, update mint status and ID to DB
  //can fetch the tokenId here?
  async function mint() {
    console.log(mintpassContract)
    await mintpassContract.methods.mintMintPass('0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab', 'https://www.baidu.com', '0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab', 10).send({ from: account })
    .once('confirmation', async function(confirmationNumber, receipt){ //if use "on('"confirmation") here, it will be triggered repeatedly

    })
    .then(async function(){
      console.log('success')
      await generateMeta();
      return;
      Router.push({
        pathname: '/mintedPage',
      });
    }
    )
    const tokenId = await fetchTokenId();
    await duplicate(tokenId);
    await update(tokenId);
  }

  async function fetchTokenId() {
    const balance = await mintpassContract.methods.balanceOf(account).call({ from: account });
    const tokenId = await mintpassContract.methods.tokenOfOwnerByIndex(account, balance - 1).call({ from: account });
    return tokenId;
  }

  async function duplicate(tokenId) {
    await axios.post(
      'api/images',
      {
        tokenId: tokenId,
        img: window.localStorage.canvas
      }
    )
  }
    //search the user according to the email and update mint ID and delete image from the array
  async function update(tokenId) {
    //axios.delete can't send params so should use put here
      await axios.put(
      '/api/users',
        { 
          email: session?.user?.email, 
          tokenId: tokenId,
          index: window.localStorage.index 
        }
      )
  }
  return(
    <Container className='mt-5 mb-5'>
      <div className={styles.submitPage}>
        {/* <Button onClick={update}>Update</Button> */}
        <Row><Link href="/"><h6 style={{cursor: "pointer"}}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
        <Row className="mt-4"><h4>{t('page.mintpass.submitArtwork')}</h4></Row>

          <Row className='mt-4' style={{fontSize: "1.3rem",fontWeight:'800'}}>
              <Col xs={4} className={styles.item}>
                  <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                  <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>{t('page.mintpass.authentication')}</span></div>
                  <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
              </Col>
              <Col xs={4} className={styles.item}>
                  <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                  <div className={styles.content}><i className="fa-solid fa-circle-check" style={{color: "#7FFF00"}}></i><span>{t('page.mintpass.submission')}</span></div>
                  <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
              </Col>
              <Col xs={4} className={`${styles.item} ${styles.itemActive}`}>
                  <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
                  <div className={styles.content}><i className="fa-regular fa-circle"></i><span>{t('page.mintpass.getMintpas')}</span></div>
                  <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
              </Col>
          </Row>

          <div className={styles.mintpassContent}>
            <Row className='d-flex justify-content-center mt-5'>
              <div className={styles.mintpassImg}>
                <Image src="/mintPass_lower.gif" alt="mintpass"/>
              </div>
            </Row>
            <Row className='d-flex justify-content-center mt-3'>
              <Col>
                <Button href='#' className={`${homeStyles.btn} ${styles.mintPassBtn}`} onClick={mint}>{t('button.getMintPass')}</Button>
              </Col>
            </Row>
            <Row className='text-center mt-1 mb-5' style={{color:"grey"}}>
                <p className="m-0">
                  {t('page.mintpass.aSmallGasFeeWillBeCharged')}<br />
                  <span style={{textDecoration:"underline", cursor: 'pointer'}}>{t('page.mintpass.moreDetails')}</span>
                </p>
            </Row>
          </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);  
  const BASE_URL = process.env.NEXTAUTH_URL;
  if(session) {
    const res = await axios.get(
      `${BASE_URL}/api/users`,
        { params: 
          { 
            email: session.user.email, 
          }
        }
      )
    const user = res.data;
    return {
      props: {
        session,
        user
      }
    }
  }
  return {
    props: {
    }
  }
}