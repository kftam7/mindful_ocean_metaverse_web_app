import { useTranslation } from '../i18n';

const Overlay = () => {
    const { t, locale } = useTranslation();

    return (
        <div class="overlay">
            <ul>
                <li className='o1'><a href='https://www.instagram.com/mindfuloceannft' target='_blank'></a></li>
                <li className='o2'><a href='https://discord.com/channels/1176399280924266600/1176399281524068403' target='_blank'></a></li>
                <li className='o3'><a href='https://medium.com' target='_blank'></a></li>
                <li className='o4'><a href='https://twitter.com/MindfulOceanNFT' target='_blank'></a></li>
                <li className='o5'><a href='/contactUs'></a></li>
            </ul>
        </div>
    )
}
export default Overlay;