import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import './App.css'
import BaseLayout from './layouts';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';

import { getUserSession } from "./utils/utils";

import Login from './pages/login';
import Homepage from './pages/home';
//import Cryptopage from './pages/crypto';
import Logout from './pages/logout';
//import Emailpage from "./pages/email";
//import CryptoLogpage from "./pages/cryptoLog";
//import EmailLogpage from "./pages/emailLog";
//import EmailAddresspage from "./pages/emailAddress";
//import EmailTemplatepage from "./pages/emailTemplate";
import NotFound from './pages/notfound';

import Appversion from "./pages/appversion";
//import Statuspage from "./pages/status";
//import Userspage from "./pages/users";
//import UsersContentDetailpage from "./pages/users/contentDetail";

import local from "./utils/local.json";
import en_US from "./locales/en_US";
import zh_CN from "./locales/zh_CN";

let language = {};
switch(local["local"]) {
  case "en_US":
    // 英语 美式
    language = en_US;
    break;
  case "zh_CN":
    // 简体中文
    language = zh_CN;
    break;
  default:
    language = en_US;
}

function RequireAuth({ children }) {

  const authed = getUserSession();
  return authed ? (
    children
  ) : (
    <Navigate language={language} to="/login" replace />
  );
}

function App(){

  return(
    <>
      <Router>
            <BaseLayout>
                <Routes >
                  <Route path ='/login' element={<Login language={language} />} />
                  <Route path ='/home' element={<Homepage language={language} />} />
                  <Route path ='/appversion' element={<Appversion language={language} />} />
                  <Route path ='/logout' element={
                    <RequireAuth>
                      <Logout language={language} />
                    </RequireAuth>
                  }/>
                  <Route exact path="/" element={<Navigate to ='/login' replace />}/>
                  <Route exact path="*" element={<NotFound />}/>
                </Routes>
            </BaseLayout>
      </Router>
    </>
  );
}
export default App;
