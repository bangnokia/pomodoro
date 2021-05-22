import { useState, useEffect } from 'react';
import useInterval from './hooks/useInterval';
import PlayButton from './buttons/PlayButton';

function Clock({ minutes, status, work, relax }) {
  const [seconds, setSeconds] = useState(minutes * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSeconds(minutes * 60);
  }, [minutes, status]);

  useInterval(() => {
    setSeconds(seconds - 1)
    if (seconds === 0) {
      if (status === 'working') {
        setRunning(true);
        relax();
      } else {
        setRunning(false);
        work();
      }
    }
  }, running ? 1000 : null);

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  return (
    <div>
      <div className="clock relative bg-gradient-to-bl from-yellow-500 to-yellow-200 w-64 h-64 mx-auto rounded-full flex items-center cursor-pointer overflow-hidden">
        <div className="bg-gray-800 w-60 h-60 mx-auto rounded-full flex items-center" />
        <div className="absolute w-full font-mono text-center text-green-500 text-4xl tracking-wide">
          {seconds > 0 ? formatTime(seconds) : '00:00'}
        </div>

        <div className="play-button absolute rounded-full w-full h-full" onClick={() => setRunning(!running)}>
          <PlayButton className={`absolute top-1/2 left-1/2 -mt-12 -ml-12 h-24 w-24 transition text-gray-500 opacity-80 hover:text-gray-100 cursor-pointer ${running ? 'invisible' : 'visible'}`} />
        </div>
      </div>
    </div>
  );
}

export default Clock;
