import { Row, Col, Image, Button } from 'react-bootstrap';

const Part4 = ({ t }) => {

  return (
    <div class="part_box_default">
      <div className='part_pannel bg_blue'>
        <div class="container">
          <div className='part_title2'>The 6 phases of Mindful Ocean art-making event</div>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>Artwork Creation and Submission</div>
                  <div className='part_text'>
                    In each event, we feature a specific marine animal, and provide all users with the same coloring template in our app. Users are invited to participate in a creative challenge, in which they can use the provided template to design the outlook of the marine animal, and submit their unique designs to the event.
                  </div>
                  <div className='part_btn'><Button variant="outline-primary">Learn more</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img1.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>Mint Pass Creation</div>
                  <div className='part_text'>
                    On our website, users can select a submitted artwork, and turn it into a Mindful Ocean Mint Pass. At the end of the event, each Mint Pass can be used to redeem a Mindful Ocean NFT, which contains the submitted artwork and its metadata.
                  </div>
                  <div className='part_btn'><Button variant="outline-primary">Learn more</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img2.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>AI Analysis</div>
                  <div className='part_text'>
                    Once we have received all the submitted artwork in an event, we will compute a score for each artwork using AI. Each artwork will be organized into clusters, while each cluster will be further organized into superclusters. The total number of artworks in the cluster and supercluster that a specific artwork belongs to will be used to derive a score that can represent the scarcity of the artwork authentically. We name this score Authentic Scarcity.
                  </div>
                  <div className='part_btn'><Button variant="outline-primary">Learn more</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img3.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>NFT Redemption</div>
                  <div className='part_text'>
                    After the AI analysis is completed, we will embed each artwork alongside metadata like Authentic Scarcity, Cluster ID, and Cluster Size into a Mindful Ocean NFT. Owners of the Mindful Ocean Mint Pass can then burn their Mindful Ocean Mint Pass to redeem the Mindful Ocean NFT.
                  </div>
                  <div className='part_btn'><Button variant="outline-primary">Learn more</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img4.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>AR Metaverse</div>
                  <div className='part_text'>
                    In our app, users can unlock the AR Metaverse, a co-created virtual space where users can collect Mindful Ocean NFTs, play with the simulated marine life using hand gestures, and interact with other users. Our AR Metaverse is powered by our partner Auki Labs’ cutting-edge AR technology.
                  </div>
                  <div className='part_btn'><Button variant="outline-primary">Learn more</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img5.png" /></div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className='part4_item'>
                <div className='item_content'>
                  <div className='part_title'>Donation</div>
                  <div className='part_text'>
                    A donation will be made to support organizations or individuals who contribute to ocean conservation. The amount of the donation will be at least 50% and up to 100% of the net revenue generated from each event. We aim at building a Web 3 community and become a decentralized autonomous organization (DAO). In the future, a mechanism to allow our community members to govern the details of the donations will be developed.
                  </div>
                  <div className='part_btn'><Button variant="outline-primary">Learn more</Button></div>
                </div>
                <div className='item_img'><Image src="/part4_img6.png" /></div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='part3_bg'>
          <Image src="/measuredBoxes/1.png" />
        </div>
      </div>
    </div>
  )
}

export default Part4;