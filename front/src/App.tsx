import {memo, useEffect, useState, useRef} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import {TenderInfoType} from './Utils/Types';
import axios from 'axios';

const App =  memo(() => {

  const [tenderInfo, setTenderInfo] = useState<TenderInfoType | null>( null ); 

  useEffect(() => {getAuctionData(123)}, []); //запрашиваем данные об акционе
  let time = tenderInfo ? (tenderInfo.phase.endOfphaseTimeSec - Math.ceil(Date.now()/1000)) : 9999
  useEffect(() => { //Планируем прерзагрузку данных по окончании хода
      window.setTimeout(() => { //Включаем отсчет таймера
      getAuctionData(123) //Обновляем данные
    }, time);
  }, [tenderInfo]);

  function getAuctionData(auctionId: number) {
        axios.get('/auction/'+auctionId) //запрашиваем данные об акционе
      .then(function (response) {
        setTenderInfo(response.data); //устанавливаем данные в стейт
      })
      .catch(function (error) {
        setTenderInfo(null)
      });
  };
  
  return (
    <>
      <Header title = { tenderInfo ? tenderInfo.title : "Информация не загружена" }/>
      <Main timeLeft ={time} tenderInfo = {tenderInfo} />
    </>
  );
})

export default App;
