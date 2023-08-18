import { useState,useEffect } from 'react';
import { Card } from 'react-bootstrap';
import styles from '../../styles/Gallery.module.css';

import GridModal from '../gallery/GridModal';

const GalleryModel = (props) => {
    const {metadata, image, index} = props;
    const [modalShow, setModalShow] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [nft,setNft] = useState();

    useEffect(() => {
        let nft = {
            texture:metadata.URL,
            name:metadata.name,
            author:metadata.extraInfo,
            description:metadata.description,
            firstName:metadata.firstName,
            lastName:metadata.lastName
        }
        setNft(nft);
        setLoaded(true); 
    },[metadata]);

    useEffect(() => {
        const modelViewer = document.getElementById(`model${index}`);
        if(modelViewer){
            modelViewer.addEventListener("load", () => {
                let material = modelViewer.model.materials[0];
                let newTexture = async (imageSource) => {
                return await modelViewer.createTexture(imageSource)
                }
                let initTexture = async (attr, channel, imageSource) => {
                const texture = await newTexture(imageSource);
                material[attr][channel].setTexture(texture);
                }
                let source = image;
                initTexture('pbrMetallicRoughness', 'baseColorTexture', source)
            });
        }
    },[loaded])

    if (loaded === false && !nft) return (
        <h1 className="px-20 py-10 text-3xl">
            <div className="loadingAnim"></div>
        </h1>
    )
    return(
        <>
            <Card className={styles.card} onClick={() => setModalShow(true)}>
                {/* src is the 3D model, poster is the texture */}
                <model-viewer 
                    id={`model${index}`}
                    src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone.glb?v=1636271548450"
                    ios-src="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Ftest-whale-scale-root-bone-tex.usdz?v=1636599386704"
                    poster="https://cdn.glitch.me/fba9d1c3-4e26-47cd-867f-19660ae37f80%2Funnamed.png?v=1636256018924"
                    alt="A 3D model of an fish"
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate autoplay ar
                    ar-modes="webxr scene-viewer quick-look">
                </model-viewer>
                <Card.Body>
                    <Card.Title>{nft.name}</Card.Title>
                    <Card.Text>
                        {props.t('main.text.by')}
                        <span style={{float: 'right'}}>{nft.firstName} {nft.lastName}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
            <GridModal show={modalShow} onHide={() => setModalShow(false)} texture={image} title={nft.name} text={`${props.t('main.text.by')} ${nft.author}`} info={metadata} t={props.t} />
        </>
    )
}

export default GalleryModel;