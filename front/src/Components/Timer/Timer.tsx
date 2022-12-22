import styles from './Timer.module.css';
import { useEffect,useState} from 'react';
import ClockIcon from '../../icons/clockIcon.svg';

function Timer({time}: {time: number}) {
  const [timeLeft, setTimeLeft] = useState<number>(0); 
  
  useEffect(() => { setTimeLeft(time)}, []); //Устанавливаем начальное время таймера

  useEffect(() => {  //Устанавливаем начальное время таймера
    setTimeout(()=>{setTimeLeft(timeLeft-1)}, 1000) // Планируем обновление таймера через 1 сек
  });
  
  function formatTime(time: number): string{
    return String(time).padStart(2, "0")
  }

  const hours = Math.floor(timeLeft/(60 * 60)) 
  const min = Math.floor((timeLeft - hours*60)/60)
  const sec = timeLeft - min*60 - hours*60*60

    return (
      <div className={styles.timer}>
            <span>{formatTime(hours)}</span>
            :
            <span>{formatTime(min)}</span>
            :
            <span>{formatTime(sec)}</span>       
            <img  className={styles.clockIcon} src={ClockIcon} />
      </div>
    );
}

export default Timer;