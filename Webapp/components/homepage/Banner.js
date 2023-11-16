import { Image, Carousel } from 'react-bootstrap';

const Banner = ({ t }) => {

  return (
    <div className='banner'>
      <Carousel pauseOnHover={false}>
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
              <div className='banner_title'>{t('home.banner.title1')}</div>
              <div className='banner_text'>{t('home.banner.text1')}</div>
            </div>
          </div>
          <Image src="/oceanImage_2_1.png" width="100%" />
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
      </Carousel>
    </div>
  )
}

export default Banner;