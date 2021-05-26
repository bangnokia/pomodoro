import { useState } from 'react';
import Clock from './Clock';
import alarmSound from './sounds/clock.wav';
import ProgressBar from './ProgressBar';

function App() {
    const options = [
        [25, 5],
        [50, 10]
    ];
    const [minutes, setMinutes] = useState(25);
    const [workingMinutes, setWorkingMinutes] = useState(25);
    const [relaxingMinutes, setRelaxingMinutes] = useState(5);
    const [status, setStatus] = useState('working');
    const [pomodoro, setPomodoro] = useState(0);
    const audio = new Audio(alarmSound);

    function work() {
        setStatus('working');
        setMinutes(workingMinutes);
        audio.play();
    }

    function drinkBeer() {
        setStatus('breaking');
        setMinutes(relaxingMinutes);
        setPomodoro(pomodoro + 1);
        audio.play();
    }

    function changeMode(workingMinutes, relaxingMinutes) {
        setWorkingMinutes(workingMinutes);
        setRelaxingMinutes(relaxingMinutes);
        setMinutes(workingMinutes);
        setStatus('working');
    }

    return (
        <div className="w-full h-screen bg-gray-800">
            <div className="container max-w-xl mx-auto flex items-center flex-col pt-10">
                <Clock minutes={minutes} status={status} work={work} relax={drinkBeer} />

                <div className="block mt-20">
                    <div className="flex w-full justify-around space-x-5">
                        {
                            options.map(([w, r]) => (
                                <div
                                    key={w}
                                    onClick={() => changeMode(w, r)}
                                    className={`cursor-pointer px-10 text-2xl text-gray-700 font-mono py-3 transition hover:text-green-500 ${w === minutes || r === minutes ? 'text-white' : ''}`}>
                                    {w}/{r}
                                </div>
                            ))
                        }
                    </div>
                </div>

                <ProgressBar total={pomodoro} className="flex flex-col space-y-3 absolute bottom-3 right-3" />
            </div>
        </div>
    );
}


export default App;
