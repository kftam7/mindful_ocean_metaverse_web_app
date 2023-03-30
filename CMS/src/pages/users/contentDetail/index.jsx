import React, { useEffect, useState } from "react";
import { Row, Col } from 'antd';
import './index.css';
import { getEmailtemplate } from "../../../services/users";
import { urlDecode } from "../../../utils/utils";
import { useParams } from "react-router-dom";

const ContentDetail = (props) => {
    const {language} = props;
    const {emailTemplateID} = useParams();
    const [eailTemplateDetail, setEmailTemplateDetail] = useState([]);

    useEffect(() => {
        if(!emailTemplateID) return;
        getEmailtemplate()
        .then(response => response.json())
        .then(response => {
            const data = response.data.filter(item => item.emailTemplateID === Number(emailTemplateID));
            setEmailTemplateDetail(data);
        })
        .catch(err => {
            console.log(err);
        });
    },[emailTemplateID]);

    return (
        <div>
            <div className='title'>Email Template</div>
            <table className="table1">
                <tr>
                    <th>Template Name:</th>
                </tr>
                <tr>
                    <td>{eailTemplateDetail.length ? eailTemplateDetail[0].name : '-'}</td>
                </tr>
                <tr>
                    <th>From Address:</th>
                </tr>
                <tr>
                    <td>{eailTemplateDetail.length ? eailTemplateDetail[0].email : '-'}</td>
                </tr>
                <tr>
                    <th>Subject BSC: </th>
                </tr>
                <tr>
                    <td>{eailTemplateDetail.length ? eailTemplateDetail[0].subjectBSC : '-'}</td>
                </tr>
                <tr>
                    <th>Content BSC: </th>
                </tr>
                <tr>
                    <td><div dangerouslySetInnerHTML={{__html: urlDecode(eailTemplateDetail.length ? eailTemplateDetail[0].contentBSC : '-')}}></div></td>
                </tr>
                <tr>
                    <th>Subject Polygon: </th>
                </tr>
                <tr>
                    <td>{eailTemplateDetail.length ? eailTemplateDetail[0].subjectPolygon : '-'}</td>
                </tr>
                <tr>
                    <th>Content Polygon: </th>
                </tr>
                <tr>
                    <td><div dangerouslySetInnerHTML={{__html: urlDecode(eailTemplateDetail.length ? eailTemplateDetail[0].contentPolygon : '-')}}></div></td>
                </tr>
            </table>
        </div>
    );
}

export default ContentDetail;