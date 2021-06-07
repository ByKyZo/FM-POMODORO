import React, { useState } from 'react';
import { Mode } from '../types/enum';
import { Timer } from '../types/types';
import { useEffect } from 'react';
// @ts-ignore
import SoundTimerEnd from '../assets/sounds/SoundTimerEnd.mp3';

interface IProps {
    timer: Timer;
    currentMode: Mode;
}

const soundTimerEnd = new Audio(SoundTimerEnd);
soundTimerEnd.volume = 0.6;

const Counter = ({ timer, currentMode }: IProps) => {
    const [isStart, setIsStart] = useState(false);
    const [isRestart, setIsRestart] = useState(false);
    const [currentTimer, setCurrentTimer] = useState(0);
    const [currentTimerFormat, setCurrentTimerFormat] = useState({
        minutes: 0,
        seconds: 0,
    });
    const [currentTimerInSeconds, setCurrentTimerInSeconds] = useState(0);
    const [counterCircleValue, setCounterCircleValue] = useState(0);
    const [timerTimeoutID, setTimerTimeoutID] = useState<NodeJS.Timeout[]>([]);
    const COUNTER_SVG_SIZE = 503;
    const circleProperty = {
        strokeDasharray: `${COUNTER_SVG_SIZE}px`,
        strokeDashoffset: `-${counterCircleValue}px`,
    };

    const handleDisplayFormatCounter = () => {
        let minutes: number | string = currentTimerFormat.minutes;
        let seconds: number | string = currentTimerFormat.seconds;
        if (currentTimerFormat.seconds < 10) seconds = `0${currentTimerFormat.seconds}`;
        if (currentTimerFormat.minutes < 10) minutes = `0${currentTimerFormat.minutes}`;
        return `${minutes}:${seconds}`;
    };

    const killAllTimeoutInstances = () => {
        timerTimeoutID.forEach((el) => {
            clearTimeout(el);
        });
        setTimerTimeoutID([]);
    };

    const handleStartTimer = () => {
        killAllTimeoutInstances();
        if (!isStart) return;
        setTimerTimeoutID((oldState) => {
            return [
                ...oldState,
                setTimeout(() => {
                    setCurrentTimerInSeconds((oldState) => {
                        return oldState - 1;
                    });
                    setCurrentTimerFormat((oldState) => {
                        if (oldState.seconds <= 0) {
                            oldState.seconds = 59;
                            oldState.minutes--;
                        } else {
                            oldState.seconds--;
                        }
                        return { ...oldState };
                    });
                }, 1000),
            ];
        });
    };

    const handleCurrentTimerFormat = () => {
        setCurrentTimerFormat((oldCurrentTimerFormat) => {
            return {
                ...oldCurrentTimerFormat,
                minutes: currentTimer,
                seconds: 0,
            };
        });
    };

    const handleRestart = () => {
        setIsRestart(false);
        handleCurrentTimerFormat();
        setCurrentTimerInSeconds(currentTimer * 60);
        setCounterCircleValue(0);
    };

    const handleOnCounterClick = () => {
        !isRestart ? setIsStart((oldState) => !oldState) : handleRestart();
    };

    useEffect(() => {
        if (!isRestart || !soundTimerEnd.paused) {
            console.log('SONG PAUSE');
            soundTimerEnd.pause();
        } else {
            soundTimerEnd.play();
        }
    }, [isRestart]);

    useEffect(() => {
        killAllTimeoutInstances();
        if (!isStart || currentTimerInSeconds === -1) return;
        if (currentTimerInSeconds !== 0) handleStartTimer();
        else {
            setIsRestart(true);
            setIsStart(false);
        }
        const timerTotalSecondsFix = currentTimer * 60;
        const currentTimerInSecondsPercent = (100 * currentTimerInSeconds) / timerTotalSecondsFix;
        const diff = (100 - currentTimerInSecondsPercent) / 100;
        setCounterCircleValue(COUNTER_SVG_SIZE * diff);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStart, currentTimerInSeconds]);

    useEffect(() => {
        handleCurrentTimerFormat();
        setCurrentTimerInSeconds(currentTimer * 60);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTimer]);

    useEffect(() => {
        killAllTimeoutInstances();
        setIsStart(false);
        setIsRestart(false);
        setCounterCircleValue(0);
        switch (currentMode) {
            case Mode.POMODORO:
                setCurrentTimer(timer.pomodoro);
                break;
            case Mode.SHORT_BREAK:
                setCurrentTimer(timer.shortBreak);
                break;
            case Mode.LONG_BREAK:
                setCurrentTimer(timer.longBreak);
                break;
            default:
                setCurrentTimer(timer.pomodoro);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMode, timer]);

    return (
        <button className="counter" onClick={() => handleOnCounterClick()}>
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
                    <span
                        className={`counter__inside__wrapper__timer ${
                            isRestart ? 'counter__inside__wrapper__timer--end' : ''
                        }`}>
                        {handleDisplayFormatCounter()}
                    </span>
                    <span className="counter__inside__wrapper__btn-start">
                        {isRestart ? 'RESTART' : isStart ? 'PAUSE' : 'START'}
                    </span>
                </div>
            </div>
        </button>
    );
};;;
export default Counter;
