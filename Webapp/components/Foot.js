import { Navbar, Container, Nav } from 'react-bootstrap';
import { useTranslation } from '../i18n';

const Footer = () => {
    const { t, locale } = useTranslation();

    return (
        <div class="container">
            <div className='foot'>
                &copy; {t('footer.copyright')}
            </div>
        </div>
    )
}
export default Footer;