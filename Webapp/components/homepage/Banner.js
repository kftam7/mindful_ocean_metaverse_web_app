import { Image, Carousel } from 'react-bootstrap';

const Banner = ({ t }) => {

  return (
    <div className='banner'>
      <Carousel pauseOnHover={false}>
        <Carousel.Item>
          <div className='banner_over'>
            <div className='banner_des'>
              <div className='banner_title'>Do you know</div>
              <div className='banner_text'>90% of marine species are at risk of extinction?</div>
            </div>
          </div>
          <Image src="/oceanImage_2_1.png" width="100%" />
        </Carousel.Item>
        <Carousel.Item>
          <div className='banner_over'>
            <div className='banner_des'>
              <div className='banner_title'>Do you know</div>
              <div className='banner_text'>90% of marine species are at risk of extinction?</div>
            </div>
          </div>
          <Image src="/oceanImage_2_1.png" width="100%" />
        </Carousel.Item>
        <Carousel.Item>
          <div className='banner_over'>
            <div className='banner_des'>
              <div className='banner_title'>Do you know</div>
              <div className='banner_text'>90% of marine species are at risk of extinction?</div>
            </div>
          </div>
          <Image src="/oceanImage_2_1.png" width="100%" />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Banner;