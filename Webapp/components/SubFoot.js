import { Image } from 'react-bootstrap';
import { useTranslation } from '../i18n';

const Footer = props => {
    const { isFootFixed } = props
    const { t, locale } = useTranslation();
    return (
        <div className={isFootFixed ? 'sub_foot fixed' : 'sub_foot'}>
            <div class="container">
                <p className='logo'><Image src="/logo.png" /></p>
                &copy; {t('footer.copyright')} {t('footer.version.no')}
            </div>
        </div>
    )
}
export default Footer;