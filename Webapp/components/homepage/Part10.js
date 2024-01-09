import { Button } from 'react-bootstrap';

const Part8 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel'>
        <div class="container">
          <div className="part_title2">{t('home.part10.title1')} <a href="https://discord.com/channels/1176399280924266600/1176399281524068403" target="_blank"> <Button variant="outline-primary">{t('button.joinDiscord')}</Button> </a> </div>
          <div className='part_text'>
            {t('home.part10.text1')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Part8;