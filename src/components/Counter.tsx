import React, { useState } from 'react';
import { Mode } from '../types/enum';
import { Timer } from '../types/types';
import { useEffect } from 'react';

// METTRE UN SON QUAND START ET QUAND FINI
// METTRE UN SON QUAND START ET QUAND FINI
// METTRE UN SON QUAND START ET QUAND FINI

interface IProps {
    timer: Timer;
    currentMode: Mode;
}

const Counter = ({ timer, currentMode }: IProps) => {
    const [isStart, setIsStart] = useState(false);

    const circleProperty = {
        strokeDasharray: '314px',
        strokeDashoffset: '10px',
    };

    const handleTimer = () => {
        switch (currentMode) {
            case Mode.POMODORO:
                return timer.pomodoro;
            case Mode.SHORT_BREAK:
                return timer.shortBreak;
            case Mode.LONG_BREAK:
                return timer.longBreak;
        }
    };

    useEffect(() => {
        setIsStart(false);
    }, [currentMode]);

    return (
        <button className="counter" onClick={() => setIsStart((oldIsStart) => !oldIsStart)}>
            <div className="counter__inside">
                <svg viewBox="0 0 200 200">
                    <circle
                        style={{ ...circleProperty }}
                        className="counter__inside__circle"
                        cx="50%"
                        cy="50%"
                        r="80"
                    />
                </svg>
                <div className="counter__inside__wrapper">
                    <span className="counter__inside__wrapper__timer">{handleTimer() + ':00'}</span>
                    <span className="counter__inside__wrapper__btn-start">
                        {isStart ? 'PAUSE' : 'START'}
                    </span>
                </div>
            </div>
        </button>
    );
};

export default Counter;
