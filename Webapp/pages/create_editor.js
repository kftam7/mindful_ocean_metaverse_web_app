import {Row, Col, Image, Container, Button, Card} from 'react-bootstrap';
import Script from 'next/script';
import styles from '../styles/CreatePage.module.css';

function CreatePage() {
  return(
    <Row className={styles.createPage}>
        <Col md={12} lg={7} className={styles.drawCol}>
            <div id='canvasDiv'>
            {/* canvas comes here */}
            </div>
        </Col>
        <Col md={0} lg={1}>
        </Col>
        <Col md={12} lg={4}>
            <div className={styles.card}>
                <model-viewer
                    id="model"
                    src={process.env.ModelSrc}
                    poster={process.env.ModelPoster}
                    alt="A 3D model of an ocean animal"
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate autoplay ar
                    ar-modes="webxr scene-viewer quick-look"
                    style={{height: '60vh'}}>
                </model-viewer>
                <section className="attribution">
                </section> 
            </div>
            <p>Refresh the page if the textures don't be displayed/updated on 3D model!</p>
        </Col>
        <Script type="text/javascript" charset="utf-8" src="/js/model.js" />
        <Script type="text/javascript" charset="utf-8" src="/js/main.js" />
        <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
        <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
    </Row>
  )
}

export default CreatePage;