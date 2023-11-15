import { Navbar, Container, Nav } from 'react-bootstrap';
import { useTranslation } from '../i18n';

const Footer = () => {
    const { t, locale } = useTranslation();

    return (
        <div class="container">
            <div className='foot'>
                &copy; Outblaze, Inc. 2023. Save our ocean.
            </div>
        </div>
    )
}
export default Footer;