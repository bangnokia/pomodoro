import { useState, useEffect } from 'react';
import Clock from './Clock';
import {notification} from '@tauri-apps/api';

function App() {
    const options = [
        [25, 5],
        [50, 10]
    ];
    const [minutes, setMinutes] = useState(25);
    const [relaxingMinutes, setRelaxingMinutes] = useState(5);
    const [status, setStatus] = useState('working');
    const [pomodoro, setPomodoro] = useState(0);

    async function requestPerission() {
        const granted = await notification.isPermissionGranted();
        console.log('granted', granted);

        if (!granted) {
            console.log('requesting permission')
            notification.requestPermission((result) => {
                console.log(result)
            }, (fail) => {
                console.log(fail)
            })
        }

        notification.sendNotification('hello')
    }

    function work() {
        setStatus('working');
    }

    function drinkBeer() {
        setStatus('breaking');
        setPomodoro(pomodoro + 1);
    }

    function changeMode(workingMinutes, relaxingMinutes) {
        setMinutes(workingMinutes);
        setRelaxingMinutes(relaxingMinutes);
        setStatus('working');
    }

    return (
        <div className="w-full h-screen bg-cyan-500">
            <div className="container max-w-xl mx-auto flex items-center flex-col pt-20">
                <button onClick={() => requestPerission()}>request</button>

                <Clock minutes={minutes} status={status} work={work} relax={drinkBeer} />

                <div className="block mt-20">
                    <div className="flex w-full justify-around space-x-5">
                        {
                            options.map(([w, r]) => (
                                <div
                                    onClick={() => changeMode(w, r)}
                                    className={`cursor-pointer border px-10 text-2xl text-gray-700 font-mono py-3 ${w === minutes ? 'border-white' : 'border-cyan-500'} transition hover:bg-white`}>
                                    {w}/{r}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


export default App;
