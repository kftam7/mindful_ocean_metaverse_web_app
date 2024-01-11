import { Button } from 'react-bootstrap';

const Part8 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel'>
        <div class="container">
          <div className="part_title2">{t('home.part10.title1')} <a href="https://discord.gg/8v72Zdrt32" target="_blank"> <Button variant="outline-primary">{t('button.joinDiscord')}</Button> </a> </div>
          <div className='part_text'>
            {t('home.part10.text1')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Part8;