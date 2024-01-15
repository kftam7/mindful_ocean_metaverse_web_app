import { getSession } from 'next-auth/react';
import { getAccount, fetchMintpassContract, getArtworkId } from '../store/actions';
import { fetchWeb3 } from '../store/web3Connections';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/SubmitPage.module.css';
import { Row, Col, Image, Button, Container } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";

import axios from 'axios';
import fs from 'fs';
import { NFTStorage, File } from 'nft.storage';
import { useTranslation } from '../i18n';
import { ethers, BigNumber } from 'ethers';
import { getMessageHashSignature, getHeaders } from '../utils/utils';
import { FaSpinner } from 'react-icons/fa';
import Layout from '../components/SubpageLayout';

//智能合约2.0
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { mintpassContractConfig } from '../components/contracts';

function Mintpass({ session, user }) {
  const { t, locale } = useTranslation();
  const { query: { artworkId } } = useRouter();
  //const apiPort = process.env.API_PORT || '/';
  const apiPort = process.env.APIBaseUrl || '/';
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const mintpassContract = useSelector((state) => state.contractState);
  // const artworkId = useSelector((state) => state.artworkIdState);
  const username = user?.name;
  const endpoint = 'https://api.nft.storage'; // the default
  const token = process.env.IPFS_TOKEN;
  const assets = './assets';

  //智能合约2.0
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...mintpassContractConfig,
    functionName: 'mintMintPass',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  useEffect(() => {
    if (!isError) return;
    if (confirm(error?.shortMessage)) {
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [isError])

  useEffect(() => {
    if (!isSuccess) return;
    setMinedArtwork();

    Router.push({
      pathname: '/mintedPage',
    });
  }, [isSuccess])

  useEffect(async () => {
    await dispatch(getAccount());
    await dispatch(fetchMintpassContract());
  }, [dispatch])

  useEffect(() => {
    dispatch(getArtworkId());
  }, [dispatch])

  //https://nft.storage/docs/how-to/mint-erc-1155/; can think about write mintpass NFT as ERC1155
  async function generateMeta() {
    const storage = new NFTStorage({ endpoint, token });
    fs.readdir(assets, async function (err, file) {
      let metadata = await storage.store({
        name: `Mindful Ocean Mintpass`,
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

  const mintFront = async () => {
    const appleId = sessionStorage.getItem("appleId");
    setLoading(true);
    const res = await axios.get(`${apiPort}/mindfulapi/app/artwork/${appleId}`, { headers: getHeaders() });
    if ((res.status === 200) && (res.data.data.length > 0)) {
      const ifMinted = res.data.data.find(item => item.artworkId === Number(artworkId)).ifMinted;
      if (!ifMinted) {
        mintPass();
        //setMinedArtwork();
      } else {
        toast.error('Artwork has been minted. Please choose another one', {
          autoClose: 3000,
          position: 'top-center',
          className: 'custom-toast-error',
          hideProgressBar: true,
        });
        setLoading(false);
      }
    } else {
      toast.error('Artwork has been minted. Please choose another one', {
        autoClose: 3000,
        position: 'top-center',
        className: 'custom-toast-error',
        hideProgressBar: true,
      });
      setLoading(false);
    }
  };

  const mintPass = async () => {
    await axios.post(`${apiPort}/mindfulapi/app/nftstorage/mintpass/${artworkId}`, {}, { headers: getHeaders() })
      .then(res => {
        const { status, data } = res;
        if (status === 200) {
          mint(data);
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  async function mint(ipfs) {
    try {
      const contract = require("../utils/MintPassNFT.json");
      const { messageHash, signature } = await getMessageHashSignature(contract).then(res => {
        return res;
      })
      // return;
      // mint the mintPass
      console.log("Minting MintPass...");
      console.log("messageHash: ", messageHash);
      console.log("signature: ", signature);
      console.log("artworkId: ", artworkId);
      console.log("ipfs: ", ipfs);

      //await mintpassContract.methods.mintMintPass('0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab', 'https://www.google.com', '0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab', '100', messageHash, signature).send({ from: account, value: 100000000000000 })
      // await mintpassContract.methods.mintMintPass(messageHash, signature, ipfs).send({ from: account, value: 100000000000000 })
      // .then(async function(){
      //   setMinedArtwork();
      // })

      await write({
        args: [messageHash, signature, artworkId, ipfs],
        value: process.env.MintingFee,
      })
    }
    catch (err) {
      console.log('error', err)
    }
  }
  async function setMinedArtwork() {
    try {
      const params = {
        artworkId,
      }
      await axios.put(`${apiPort}/mindfulapi/app/setMintedArtwork/${artworkId}`, params, { headers: getHeaders() })
        .then(res => {
          // Router.push({
          //   pathname: '/mintedPage',
          // });
        })
        .catch(err => {
          console.log(err)
        })
    }
    catch (err) {
      console.log('error', err)
    }
  }
  return (
    <Container className='mt-5 mb-5'>
      <ToastContainer />
      {loading || isLoading ?
        <div className="overly">
          {/* <FaSpinner /> */}
          <Image src="/loading.gif" width="30px" height="30px" />
        </div>
        : ''
      }
      <div className={styles.submitPage}>
        {/* <Button onClick={update}>Update</Button> */}
        <Row><Link href="/"><h6 style={{ cursor: "pointer" }}>&larr; {t('button.returnToHomepage')}</h6></Link></Row>
        <Row className="mt-4"><h4>{t('page.mintpass.submitArtwork')}</h4></Row>

        <Row className='mt-4' style={{ fontSize: "1.3rem", fontWeight: '800' }}>
          <Col xs={4} className={styles.item}>
            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
            <div className={styles.content}><i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i><span>{t('page.mintpass.authentication')}</span></div>
            <div className={`${styles.arrow} ${styles.arrowBottom}`}></div>
          </Col>
          <Col xs={4} className={styles.item}>
            <div className={`${styles.arrow} ${styles.arrowTop}`}></div>
            <div className={styles.content}><i className="fa-solid fa-circle-check" style={{ color: "#7FFF00" }}></i><span>{t('page.mintpass.submission')}</span></div>
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
              <Image src="/mintPass_lower.gif" alt="mintpass" />
            </div>
          </Row>
          <Row className='d-flex justify-content-center mt-3'>
            <Col>
              <Button className={`${styles.mintPassBtn}`} onClick={mintFront} disabled={isLoading || loading}>{t('button.getMintPass')}</Button>
            </Col>
          </Row>
          <Row className='text-center mt-1 mb-5' style={{ color: "grey" }}>
            <p className="m-0">
              {t('page.mintpass.aSmallGasFeeWillBeCharged')}<br />
            </p>
          </Row>
        </div>
      </div>
    </Container>
  )
}

//智能合约2.0
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';
import { projectId, wagmiConfig, ethereumClient } from '../components/wagmi';
function App() {
  return (
    <Layout>
      <WagmiConfig config={wagmiConfig}>
        <Mintpass />
        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          themeVariables={{
            '--w3m-z-index': '9999'
          }}
        />
      </WagmiConfig>
    </Layout>
  )
}

export default App;
// export default Mintpass;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const BASE_URL = process.env.NEXTAUTH_URL;
  if (session) {
    const res = await axios.get(
      `${BASE_URL}/api/users`,
      {
        params:
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