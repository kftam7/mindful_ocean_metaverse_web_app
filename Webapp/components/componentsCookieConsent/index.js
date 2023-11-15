import { useTranslation } from '../../i18n';
import CookieConsent, { Cookies } from "react-cookie-consent";
import axios from 'axios';
import { getHeaders } from '../../utils/utils';
import { useEffect, useState } from 'react';

const ComponentsCookieConsent = () => {
  const { t, locale } = useTranslation();
  const apiPort = process.env.APIBaseUrl || '/';
  const [appleId, setAppleId] = useState();

  useEffect(() => {
    const appleId = sessionStorage.getItem("appleId");
    if (appleId) {
      setAppleId(appleId);
    } else {
      setAppleId('');
    }
  }, []);

  const accept = async () => {
    console.log(appleId)
    await axios.post(`${apiPort}/mindfulapi/app/tandc/${appleId}`, {}, { headers: getHeaders() })
      .then(res => {
        consle.log(res)
        return
        const { status, data } = res;
        if (status === 200) {
          toast.success('success', {
            autoClose: 3000,
            position: 'top-center',
            className: 'custom-toast-success',
            hideProgressBar: true,
          });
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText={t('button.accept')}
      declineButtonText={t('button.decline')}
      enableDeclineButton
      cookieName="CookieConsent"
      style={{ background: "rgba(61,65,66,.85)" }}
      buttonStyle={{ color: "#fff", background: "#005D6C", margin: "15px 10px", borderRadius: "10px", display: appleId ? 'inline' : 'none' }}
      declineButtonStyle={{ color: "#888", background: "rgba(61,65,66,.85)", margin: "15px 10px", border: "2px solid #888", borderRadius: "10px" }}
      expires={150}
      // onAccept={() => {
      //   accept();
      // }}
    >
      {t('main.text.cookieConsent')}<a href="https://www.iubenda.com/privacy-policy/43680858/cookie-policy" target='_blank' style={{ color: '#fff', textDecoration: 'underline' }}>{t('main.text.cookiePolicy')}</a>
    </CookieConsent>
  )
}

export default ComponentsCookieConsent;