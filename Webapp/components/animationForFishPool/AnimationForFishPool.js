import React, { useState, useEffect } from "react";
import { Image } from 'react-bootstrap';
import axios from 'axios';
import { getAppleId, getRefreshToken, md5 } from '../../utils/utils';

const AnimationForFishPool = () => {
  const apiPort = process.env.API_PORT || '/';
  const [inits, setInits] = useState(0);
  const [initsNew, setInitsNew] = useState(0);
  const [listAll, setListAll] = useState([[0], [0], [0], [0], [0], [0]]);
  const [animationActive, setAnimationActive] = useState(false);
  const [coverActive, setCoverActive] = useState(false);
    
  // 模拟监听接口的函数
  const fetchValue = async () => {
    try {
      // 发起接口请求，获取接口返回的数字
    const appleid = getAppleId();
    const refresh_token = getRefreshToken();
    const time_stamp = Math.floor(Date.now() / 1000);
    const headers = {
      appleid,
      refresh_token,
      time_stamp,
      secret: md5(appleid + time_stamp)
    }
    console.log(headers)
      const res = await axios.get(`${apiPort}/mindfulapi/app/nfttotal/mintPass`, {headers});
      const {data: { total }} = res;
      if(total === 0) return;
      // // 更新 value 的值
      // setInits((pre) => pre+1);
      setInits(total);

    } catch (error) {
      console.error('Failed to fetch value from API:', error);
    }
  };  

  useEffect(() => {
    const appleid = getAppleId();
    if(!appleid) return;
    // 每30秒更新一次接口数据
    const intervalId = setInterval(() => {
      fetchValue();
    }, 30000);

    fetchValue();

    // 清除定时器
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setAnimationActive(true);
    setCoverActive(true);
    let prev = addZero(inits, 5);
    let next = addZero(inits, 5);
    setInits(inits);
    getData(prev, next);
  },[inits]);

  const addZero = (num, n) => {
      let len = num.toString().length;
      while (len < n) {
          num = "0" + num;
          len++;
      }
      return num;
  };

  const getData = (prev, next) => {
      let listAll = [];
      let prevArray = prev.toString().split("");
      let nextArray = next.toString().split("");

      let listInit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      for (let i = 0; i < prevArray.length; i++) {
          let prevNumber = parseInt(prevArray[i]);
          let nextNumber = parseInt(nextArray[i]);
          let start = -1;
          let end = -1;

          for (let j = 0; j < listInit.length; j++) {
              if (listInit[j] === prevNumber) {
                  start = 0;
              }
              if (start !== -1 && listInit[j] === nextNumber) {
                  end = j;
                  break;
              }
          }
          listAll.push(listInit.slice(start, end + 1));
      }
      setListAll(listAll);

      resetAnimation();
  };

  const resetAnimation = () => {
    setTimeout(() => {
      setAnimationActive(false);
      setCoverActive(false);
    }, 8000);
  };

  return (
    <div>
      <div className="animation_panel">
        <div className="radiant"></div>
          <div
            className={`pearl ${animationActive ? 'active' : ''}`}
          >
            <div className="glow">
              <div className="pearl_img"><Image src='./pearl.png' /></div>
              <div className="pearl_sparkle"><Image src='./sparkle.png' /></div>
              <div className={`sparkle_cover ${coverActive ? 'active' : ''}`}><Image src='./sparkle_cover.png' /></div>
            </div>
        </div>
        <Image src='./animation_for_fish_pool.gif' />
      </div>
      {/* 数字滚动 */}
      <div className="box-number">
          {listAll.map((list, i) => (
              <div key={i} className="list-wrap">
                  <div className={`roll roll_${list.length - 1}`} key={i}>
                      {list.map((item, index) => (
                          <div key={index} className={`item item_${index}`}>
                              {item}
                          </div>
                      ))}
                  </div>
              </div>
          ))}
      </div>
      {/* 数字end */}
    </div>
  );
};

export default AnimationForFishPool;
