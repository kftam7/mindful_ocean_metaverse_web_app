import React, { memo, useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {useLocation, useNavigate,} from 'react-router';
import logoImg from '../assets/logoHeader.png';
import { getUserSession, getIsAdmin } from "../utils/utils";
import version from "../utils/version.json";

const { Header, Sider, Content } = Layout;

const BaseLayout=({children}) => {
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState('');

    const [collapsed, setCollapsed] = useState(false);
    const [showSideBar, setShowSideBar] = useState(true);
    const location = useLocation();
    const menuItems = [
        {
            key: '/user',
            icon: '',
            label: 'User',
        },
        {
            key: '/event',
            icon: '',
            label: 'Event',
        },
        {
            key: '/artwork',
            icon: '',
            label: 'Artwork',
        },
        {
            key: '/appversion',
            icon: '',
            label: 'App Version',
        },
        {
            key: '/language',
            icon: '',
            label: 'Language',
        },
        {
            key: '/logout',
            icon: '',
            label: 'Logout',
        },
    ];

    useEffect(() => {
        if(!getUserSession()){
            navigate("/login");
        }
    },[getUserSession()]);

    useEffect(() => {
        setSelectedKeys(location.pathname);
    });

    useEffect(() => {
        setShowSideBar(true);
        if (location.pathname === "/index.html") {
            navigate("/");
            return;
        }
        
        const arrayEmailContent = location.pathname.split('/');
        if(arrayEmailContent[1] === 'login'){
            setShowSideBar(false);
        };
        // const isInclude = menuItems.some((item) => {
        //     return item.key === location.pathname;
        // });
        // if (!isInclude) {
        //     setShowSideBar(false);
        // }
    },[location]);

    const toggle = () => {
        setCollapsed(!collapsed)
    };

    const handleMenu = (e) => {
        const isAdmin = getIsAdmin();
        if(!isAdmin){
            navigate("/login");
        }

        navigate(e.key);
        setSelectedKeys(e.key);
    }

    return (
        <>
            <Layout >
                {showSideBar ? (
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: '#333333',
                        }}
                    >   
                        <div style={{ textAlign: 'center', }} >
                            <img src={logoImg} alt="" style={{ width: '80%', }} />
                        </div>
                        <div
                            style={{
                                paddingLeft: '24px',
                                lineHeight: '40px',
                                fontSize: '14px',
                                color: '#005d6c',
                                marginBottom: '30px',
                            }}
                        >
                            Login: {getUserSession()}<br/>
                        </div>
                        <Menu
                            style={{
                                backgroundColor: '#333333',
                            }}
                            onClick={handleMenu}
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['/home']}
                            selectedKeys={selectedKeys}
                            items={menuItems}
                        />
                        <div style={{height: '40px',}}></div>
                        <div
                            style={{
                                position: 'absolute',
                                left: '0',
                                bottom: '0',
                                paddingLeft: '24px',
                                lineHeight: '40px',
                                color: '#CCCCCC',
                                width: '100%',
                            }}
                        >
                            Version: {version.version_no}
                        </div>
                    </Sider>
                ) : (<></>)}
                <Layout className="site-layout" style={showSideBar ? { marginLeft: 200 } : {}}>
                    {/* <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Header> */}
                    <Content
                        className="site-layout-background"
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default BaseLayout