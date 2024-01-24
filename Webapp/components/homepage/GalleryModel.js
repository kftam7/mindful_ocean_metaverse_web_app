import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import styles from '../../styles/Gallery.module.css';

import GridModal from '../gallery/GridModal';
import { ModelSrcFile, ModelPosterFile } from '../../model.config';

const GalleryModel = (props) => {
    const { metadata, image, index } = props;
    const [modalShow, setModalShow] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [nft, setNft] = useState();

    useEffect(() => {
        let dataModelSrcFile = new Map()
        ModelSrcFile.forEach((value, key) => {
            dataModelSrcFile.set(key.toLowerCase(), value)
        })
        let dataModelPosterFile = new Map()
        ModelPosterFile.forEach((value, key) => {
            dataModelPosterFile.set(key.toLowerCase(), value)
        })
        let nft = {
            texture: metadata.URL,
            name: metadata.name,
            author: metadata.extraInfo,
            description: metadata.description,
            firstName: metadata.firstName,
            lastName: metadata.lastName,
            ModelSrc: dataModelSrcFile.get(metadata.type),
            ModelPoster: dataModelPosterFile.get(metadata.type),
        }
        setNft(nft);
        setLoaded(true);
    }, [metadata]);

    useEffect(() => {
        const modelViewer = document.getElementById(`model${index}`);
        if (modelViewer) {
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
    }, [loaded])

    if (loaded === false && !nft) return (
        <h1 className="px-20 py-10 text-3xl">
            <div className="loadingAnim"></div>
        </h1>
    )
    return (
        <>
            <Card className={styles.card} onClick={() => setModalShow(true)}>
                {/* src is the 3D model, poster is the texture */}
                <model-viewer
                    id={`model${index}`}
                    src={nft.ModelSrc}
                    poster={nft.ModelPoster}
                    alt="A 3D model of an fish"
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate autoplay
                    ar-modes="webxr scene-viewer quick-look">
                </model-viewer>
                <Card.Body>
                    <Card.Title>{nft.name}</Card.Title>
                    <Card.Text>
                        <div>{props.t('main.text.by')}</div>
                        <span>{nft.firstName} {nft.lastName}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
            <GridModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                texture={image}
                title={nft.name}
                text={`${props.t('main.text.by')} ${nft.author}`}
                info={metadata}
                t={props.t}
                nft={nft}
            />
        </>
    )
}

export default GalleryModel;