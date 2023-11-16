import { useTranslation } from '../i18n';

const Overlay = () => {
    const { t, locale } = useTranslation();

    return (
        <div class="overlay">
            <ul>
                <li className='o1'><a href='#'></a></li>
                <li className='o2'><a href='#'></a></li>
                <li className='o3'><a href='#'></a></li>
                <li className='o4'><a href='https://twitter.com/MindfulOceanNFT' target="_blank"></a></li>
                <li className='o5'><a href='#'></a></li>
            </ul>
        </div>
    )
}
export default Overlay;