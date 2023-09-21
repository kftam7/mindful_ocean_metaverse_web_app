import { Navbar, Container, Nav } from 'react-bootstrap';
import { useTranslation } from '../i18n';

const Footer = () => {
    const { t, locale } = useTranslation();
    return (
        <Navbar className="mt-5 p-4" style={{backgroundColor: '#005D6C'}}>
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/whitepaper" style={{color: '#fff'}}>{t('footer.nav.whitePaper')}</Nav.Link>
                    <Nav.Link href="/privatepolicy" style={{color: '#fff'}}>{t('footer.nav.privatePolicy')}</Nav.Link>
                    <Nav.Link href="/contactUs" style={{color: '#fff'}}>{t('footer.nav.contactUs')}</Nav.Link>
                    <Nav.Link href="/testArtwork" style={{color: '#fff', display: 'none'}}>testArtwork</Nav.Link>
                </Nav>
                {/* <p className="text-dark mt-2">Copyright © 2021 Dalton Learning Lab Limited. All rights reserved.</p> */}
                <p className="text-light mt-2">{t('footer.nav.versionNo')} {process.env.NEXT_PUBLIC_VERSION}</p>
            </Container>
        </Navbar>
    )
}
export default Footer;