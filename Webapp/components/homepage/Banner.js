import { Image, Carousel } from 'react-bootstrap';

const svg = 
`<svg style="width:100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 886 494">
<style>
.image-mapper-shape {
    fill: rgba(0, 0, 0, 0);
}
g:hover .image-mapper-shape {
    stroke: white;
    stroke-width: 2px;
    opacity: 20%;
}
</style>
        
<image xlink:href="example_banner.png" style="width: 886px;"></image>
<a xlink:href="event?eventId=18" target="_blank" xlink:title="upcoming">
<g>
<rect x="47" y="128" width="233" height="234" class="image-mapper-shape" data-index="1"></rect>
</g>
</a>
<a xlink:href="event?eventId=19" target="_blank" xlink:title="current">
<g>
<rect x="326" y="132" width="231" height="229" class="image-mapper-shape" data-index="2"></rect>
</g>
</a>
<a xlink:href="event?eventId=20" target="_blank" xlink:title="past">
<g>
<rect x="606" y="132" width="229" height="227" class="image-mapper-shape" data-index="3"></rect>
</g>
</a>
</svg>`;

const Banner = ({ t }) => {

  return (
    <div className='banner'>
      <Carousel interval={null} pauseOnHover={false}>
        <Carousel.Item>
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/oceanImage_2_1.png"
            alt="First slide"
            useMap="#image-map"
          />
          <map name="image-map">
            <area target="_blank" alt="Location 1" title="Location 1" href="event?eventId=19" coords="690,330,990,630" shape="rect" />
            <area target="_blank" alt="Location 2" title="Location 2" href="http://example.com" coords="73,89,123,162" shape="rect" />
          </map>
        </Carousel.Item>
        <Carousel.Item>
          <a href="/event?eventId=19"> 
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