import { useTranslation } from '../../i18n';
import CookieConsent, { Cookies } from "react-cookie-consent";

const ComponentsCookieConsent = () => {
  const { t, locale } = useTranslation();

 return(
    <CookieConsent
      location="bottom"
      buttonText={t('button.accept')}
      declineButtonText={t('button.decline')}
      enableDeclineButton
      cookieName="CookieConsent"
      style={{ background: "rgba(61,65,66,.85)" }}
      buttonStyle={{ color: "#fff", background: "#005D6C", margin: "15px 10px", borderRadius: "10px" }}
      declineButtonStyle={{ color: "#888", background: "rgba(61,65,66,.85)", margin: "15px 10px", border: "2px solid #888", borderRadius: "10px" }}
      expires={150}
    >
      {t('main.text.cookieConsent')}
    </CookieConsent>
 )
}

export default ComponentsCookieConsent;