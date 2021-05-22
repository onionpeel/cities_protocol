import { useState, useEffect } from 'react';
import { useContext} from 'react'
import { LanguageContext } from '../contexts/LanguageContext';


const CountdownClock = ({timeToExpiration}) => {
  let [isEnglish, setLoc] = useContext(LanguageContext);
  let [days, setDays] = useState();
  let [hours, setHours] = useState();
  let [minutes, setMinutes] = useState();
  let [seconds, setSeconds] = useState();

  useEffect(() => {
    let _total, _seconds, _minutes, _hours, _days;
    let remaining;

    function setEndInThreeDays(timeToExpiration_) {

      _seconds = Math.floor(timeToExpiration_ % 60 );
      _minutes = Math.floor( (timeToExpiration_/60) % 60 );
      _hours = Math.floor( (timeToExpiration_/(60*60)) % 24 );
      _days = Math.floor( timeToExpiration_/(60*60*24) );

      // _total = timeToExpiration + 259200000 - Date.parse(new Date());
      // _seconds = Math.floor( (_total/1000) % 60 );
      // _minutes = Math.floor( (_total/1000/60) % 60 );
      // _hours = Math.floor( (_total/(1000*60*60)) % 24 );
      // _days = Math.floor( _total/(1000*60*60*24) );
    };


    function initializeClock(_timeToExpiration) {
      remaining = _timeToExpiration;

      function updateClock() {
        setEndInThreeDays(remaining);
        _seconds = ('0' + _seconds).slice(-2);
        _minutes = ('0' + _minutes).slice(-2);
        _hours = ('0' + _hours).slice(-2);

        setSeconds(_seconds);
        setMinutes(_minutes);
        setHours(_hours);
        setDays(_days);

        if (remaining <= 0) {
          clearInterval(timeinterval);
        };

        remaining -= 1;
      };

      updateClock();
      let timeinterval = setInterval(updateClock, 1000);
    };

    initializeClock(timeToExpiration);

  }, []);

    return (
      <div>
        {isEnglish === 'english' ?
        <div>
          <div>
             {days} days, {hours}:{minutes}:{seconds} left
          </div>
        </div>
        :
          <div>
            {days} días, {hours}:{minutes}:{seconds} restantes
          </div>
        }
      </div>
    );
  };


export default CountdownClock;
