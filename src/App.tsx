import Head from './components/Head';
import Counter from './components/Counter';
import Settings from './components/Settings';
import { useEffect, useState } from 'react';
import { Font, Mode, Color } from './types/enum';
import { Timer } from './types/types';

const App = () => {
    const [currentMode, setCurrentMode] = useState(Mode.POMODORO);
    const [timer, setTimer] = useState({
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    });
    const [currentFont, setCurrentFont] = useState(Font.KHUMB_SANS);
    const [currentColor, setCurrentColor] = useState(Color.RED);

    const handleSetTimer = (newTimer: Timer) => {
        setTimer({ ...newTimer });
        localStorage.setItem('timer', JSON.stringify(newTimer));
    };

    const handleSetColor = (color: Color) => {
        setCurrentColor(color);
        localStorage.setItem('color', JSON.stringify(color));
    };

    const handleSetFont = (font: Font) => {
        setCurrentFont(font);
        localStorage.setItem('font', JSON.stringify(font));
    };

    const handleLocalStorage = (storageName: string, state: any, setState: (arg: any) => void) => {
        const timerStorage = localStorage.getItem(storageName);
        if (!timerStorage) {
            localStorage.setItem(storageName, JSON.stringify(state));
        } else {
            setState(JSON.parse(timerStorage));
        }
    };

    useEffect(() => {
        handleLocalStorage('timer', timer, setTimer);
        handleLocalStorage('color', currentColor, setCurrentColor);
        handleLocalStorage('font', currentFont, setCurrentFont);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                setTimer={handleSetTimer}
                currentFont={currentFont}
                setCurrentFont={handleSetFont}
                currentColor={currentColor}
                setCurrentColor={handleSetColor}
            />
        </div>
    );
};
export default App;
