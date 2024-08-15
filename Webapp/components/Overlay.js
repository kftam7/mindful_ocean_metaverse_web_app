import { useTranslation } from '../i18n';

const Overlay = () => {
    const { t, locale } = useTranslation();

    return (
        <div class="overlay">
            <ul>
                <li className='o1'><a href='https://www.instagram.com/mindfuloceannft' target='_blank'></a></li>
                <li className='o2'><a href='https://discord.gg/8v72Zdrt32' target='_blank'></a></li>
                <li className='o3'><a href='https://mindfuloceanmetaverse.medium.com/' target='_blank'></a></li>
                <li className='o4'><a href='https://twitter.com/MindfulOceanNFT' target='_blank'></a></li>
                <li className='o6'><a href='https://www.facebook.com/mindfuloceanmetaverse' target='_blank'></a></li>
                <li className='o5'><a href='/contactUs'></a></li>
            </ul>
        </div>
    )
}
export default Overlay;