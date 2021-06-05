import Head from './components/Head';
import Counter from './components/Counter';
import Settings from './components/Settings';
import { useEffect, useState } from 'react';
import { Font, Mode, Color } from './types/enum';

// FAIRE DU LOCALSTORAGE POUR TOUT !
// CUSTOM INPUT NUMBER TIMER
// METTRE UN SON QUAND START ET QUAND FINI

const App = () => {
    const [currentMode, setCurrentMode] = useState(Mode.POMODORO);
    const [timer, setTimer] = useState({
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    });
    const [currentFont, setCurrentFont] = useState(Font.KHUMB_SANS);
    const [currentColor, setCurrentColor] = useState(Color.RED);

    useEffect(() => {
        document.querySelector('html')!.setAttribute('data-color', currentColor);
    }, [currentColor]);

    useEffect(() => {
        document.querySelector('html')!.setAttribute('data-font', currentFont);
    }, [currentFont]);

    return (
        <div className="pomodoro">
            <Head currentMode={currentMode} setCurrentMode={setCurrentMode} />
            <Counter timer={timer} currentMode={currentMode} />
            <Settings
                timer={timer}
                setTimer={setTimer}
                currentFont={currentFont}
                setCurrentFont={setCurrentFont}
                currentColor={currentColor}
                setCurrentColor={setCurrentColor}
            />
        </div>
    );
};

export default App;
