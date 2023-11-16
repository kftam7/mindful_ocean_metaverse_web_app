import { Button } from 'react-bootstrap';

const Part8 = ({ t }) => {

  return (
    <div class="part_box">
      <div className='part_pannel bg_blue'>
        <div class="container">
          <div className="part_title2 text-center">{t('home.part10.title1')}</div>
          <div className='part_btn text-center'><Button variant="outline-primary">{t('button.learnMore')}</Button></div>
        </div>
      </div>
    </div>
  )
}

export default Part8;