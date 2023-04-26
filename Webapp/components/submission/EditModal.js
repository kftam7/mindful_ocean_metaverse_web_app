import { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import homeStyles from '../../styles/Home.module.css';
import styles from '../../styles/SubmitPage.module.css';
import axios from 'axios';

const EditModal = ({editShow,setEditShow }) => {
    const handleEditClose = () => {
      setEditShow(false);
      resetForm();
    }
    const [formData, setFormData] = useState({
      description: '',
      personal_information: ''
    });
    const [formErrors, setFormErrors] = useState({
      description: false,
      personal_information: false
    });

    const handleChange = (event) => {
      const { name, value } = event.target;
      // 更新 formData 对象中相应的表单值
      setFormData({ ...formData, [name]: value });
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    };

    const resetForm = () => {
      const data = {
        description: '',
        personal_information: ''
      }
      setFormData(data);
      const dataError = {
        description: false,
        personal_information: false
      }
      setFormErrors(dataError);
    };

    const savePersonalWebsite = async (event) => {
      event.preventDefault();
      // 从 formData 对象中获取表单的值
      const { description, personal_information } = formData;
      const newFormErrors = {
        description: !description,
        personal_information: !personal_information
      };
      setFormErrors(newFormErrors);
  
      if(!description || !personal_information) return;
  
      const params = [{
        description,
        personal_information: ''
      }];
      console.log(params)
    };

    return (
        <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className='mb-3'>
          <p>Supplementary information for the selected artworkThis will be shown in XXX.</p>
          <Form onSubmit={savePersonalWebsite}>
            <Form.Group className="align-items-center form_group" controlId="description">
              <Form.Label className='form_label'>Description:</Form.Label>
              <Form.Control
                className={styles.form_control}
                type="text"
                placeholder=""
                name="description"
                value={formData.description}
                isInvalid={formErrors.description}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback
                className={styles.form_feedback}
                type="invalid"
              >
                Description cannot be empty
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="align-items-center form_group" controlId="personal_information">
              <Form.Label className='form_label'>Personal Information:</Form.Label>
              <Form.Control
                className={styles.form_control}
                type="text"
                placeholder=""
                name="personal_information"
                value={formData.personal_information}
                isInvalid={formErrors.personal_information}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback
                className={styles.form_feedback}
                type="invalid"
              >
                Personal Information cannot be empty
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Button className={`${homeStyles.btn} ${styles.confirmBtn}`} style={{fontWeight: '800'}} onClick={savePersonalWebsite}>Save</Button>
        </Row>
        </Modal.Body>
      </Modal>
    )
}

export default EditModal;