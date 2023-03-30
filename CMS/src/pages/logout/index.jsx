import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal, } from 'antd';
import { removeUserSession } from "../../utils/utils";

const Logoutpage = (props) => {

    const language = props.language;

    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);

    const handleCancel = () => {
        navigate(-1);
        setVisible(false);
    };

    const handleOk = () => {
        navigate('/login');
        removeUserSession();
        setVisible(false);
    };

    return (
        <div className="mainContainer">
             <Modal
                title={language["logout.Modal.title"]}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={language["logout.Modal.okText"]}
                cancelText={language["logout.Modal.cancelText"]}
            >
                <p>{language["logout.Modal.p"]}</p>
            </Modal>
        </div>
    );
};

export default Logoutpage;