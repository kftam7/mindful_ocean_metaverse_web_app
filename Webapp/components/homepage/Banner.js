import { Image, Carousel } from 'react-bootstrap';

const Banner = ({ t }) => {

  return (
    <div className='banner'>
      <Carousel pauseOnHover={false}>
        <Carousel.Item>        
          <a href="/event?eventId=18"> 
            <div className='banner_over'>
              <div className='banner_des'>
                <div className='banner_title'>{t('home.banner.title0')}</div>
                <div className='banner_text'>{t('home.banner.text0')}</div>
              </div>
            </div>
            <Image src="/oceanImage_4.jpg"  width="100%" />
          </a>
        </Carousel.Item>      
        <Carousel.Item>
          <div className='banner_over'>
            <div className='banner_des'>
              <div className='banner_title'>{t('home.banner.title1')}</div>
              <div className='banner_text'>{t('home.banner.text1')}</div>
            </div>
          </div>
          <Image src="/oceanImage_2_1.png" width="100%" />
        </Carousel.Item>
        <Carousel.Item>
          <div className='banner_over'>
            <div className='banner_des'>
              <div className='banner_title'>{t('home.banner.title2')}</div>
              <div className='banner_text'>{t('home.banner.text2')}</div>
            </div>
          </div>
          <Image src="/oceanImage_2_2.jpg" width="100%" />
        </Carousel.Item>
        <Carousel.Item>
          <div className='banner_over'>
            <div className='banner_des'>
              <div className='banner_title'>{t('home.banner.title3')}</div>
              <div className='banner_text'>{t('home.banner.text3')}</div>
            </div>
          </div>
          <Image src="/oceanImage_2_3.jpg" width="100%" />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Banner;