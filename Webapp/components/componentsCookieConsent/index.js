import { useTranslation } from '../../i18n';
import CookieConsent, { Cookies } from "react-cookie-consent";
import { Image } from 'react-bootstrap';

const ComponentsCookieConsent = () => {
  const { t, locale } = useTranslation();

  return (
    <CookieConsent
      location="bottom"
      buttonText={t('button.accept')}
      declineButtonText={t('button.decline')}
      enableDeclineButton
      cookieName="CookieConsent"
      style={{ background: "rgba(61,65,66,.85)" }}
      buttonStyle={{ color: "#fff", background: "#005D6C", margin: "15px 10px", borderRadius: "5px" }}
      declineButtonStyle={{ color: "#efefef", background: "rgba(61,65,66,.85)", margin: "15px 10px", border: "2px solid #888", borderRadius: "5px" }}
      expires={150}
    >
      <Image src="/icon_cookie.png" width="25px" height="25px" /> {t('main.text.cookieConsent')}<a href="https://www.iubenda.com/privacy-policy/43680858/cookie-policy" target='_blank' style={{ color: '#fff', textDecoration: 'underline' }}>{t('main.text.cookiePolicy')}</a>
    </CookieConsent>
  )
}

export default ComponentsCookieConsent;