import { useState, useEffect } from 'react';
import Modal from './utils/Modal';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiCloseFill } from 'react-icons/ri';
import { BiCheck } from 'react-icons/bi';
import { Color, Font } from '../types/enum';
import { Timer } from '../types/types';
import TimerInputSettings from './utils/timerInputSettings';

// TODO Remettre les TODO dans la toolbar
// TODO Mettre un son au start et pause du timer (sur le site ou j'ai crée un compte)
// TODO Create npm package for modal and dropdown

interface IProps {
    timer: Timer;
    setTimer: (arg: Timer) => void;
    currentFont: Font;
    setCurrentFont: (arg: Font) => void;
    currentColor: Color;
    setCurrentColor: (arg: Color) => void;
}

enum inputAction {
    INCREMENT,
    DECREMENT,
}

const Settings = ({
    timer,
    setTimer,
    currentFont,
    setCurrentFont,
    currentColor,
    setCurrentColor,
}: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newTimer, setNewTimer] = useState({
        pomodoro: timer.pomodoro,
        shortBreak: timer.shortBreak,
        longBreak: timer.longBreak,
    });
    const [fontSelected, setFontSelected] = useState(currentFont);
    const [colorSelected, setColorSelected] = useState(currentColor);

    const handleApplyChange = () => {
        setIsOpen(false);
        setCurrentFont(fontSelected);
        setCurrentColor(colorSelected);
        const newTimerCopy = { ...newTimer };
        if (newTimerCopy.pomodoro >= 60) newTimerCopy.pomodoro = 60;
        if (newTimerCopy.shortBreak >= 60) newTimerCopy.shortBreak = 60;
        if (newTimerCopy.longBreak >= 60) newTimerCopy.longBreak = 60;
        if (newTimerCopy.pomodoro <= 0) newTimerCopy.pomodoro = 1;
        if (newTimerCopy.shortBreak <= 0) newTimerCopy.shortBreak = 1;
        if (newTimerCopy.longBreak <= 0) newTimerCopy.longBreak = 1;
        setTimer(newTimerCopy);
    };

    useEffect(() => {
        if (!isOpen) {
            setFontSelected(currentFont);
            setColorSelected(currentColor);
            setNewTimer((oldTimer: Timer) => {
                return {
                    ...oldTimer,
                    pomodoro: timer.pomodoro,
                    shortBreak: timer.shortBreak,
                    longBreak: timer.longBreak,
                };
            });
        }
    }, [isOpen, currentFont, currentColor, timer]);

    const isFontClassActive = (mode: Font) => {
        return `settings__content__font__content__item ${
            fontSelected === mode ? 'settings__content__font__content__item--active' : ''
        }`;
    };

    const isColorClassActive = (mode: Color) => {
        return (
            mode === colorSelected && (
                <BiCheck className="settings__content__color__content__item--active" />
            )
        );
    };

    const handleIncOrDecInputNumber = (timer: any, action: inputAction) => {
        if (action === inputAction.INCREMENT) {
            setNewTimer((oldState) => {
                // @ts-ignore
                if (oldState[timer] >= 60) return { ...oldState };
                // @ts-ignore
                oldState[timer]++;
                return { ...oldState };
            });
        } else if (action === inputAction.DECREMENT) {
            setNewTimer((oldState) => {
                // @ts-ignore
                if (oldState[timer] <= 1) return { ...oldState };
                // @ts-ignore
                oldState[timer]--;
                return { ...oldState };
            });
        }
    };

    return (
        <>
            <button className="btn-settings" onClick={() => setIsOpen(true)}>
                <IoSettingsSharp />
            </button>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} contentClass="settings">
                <div className="settings__head">
                    <h4>Settings</h4>
                    <button onClick={() => setIsOpen(false)}>
                        <RiCloseFill />
                    </button>
                </div>
                <div className="settings__content">
                    <div className="settings__content__times">
                        <span className="settings__content__category-title">TIME (MINUTES)</span>

                        <div className="settings__content__times__content">
                            <TimerInputSettings
                                label="pomodoro"
                                objectNameProperty="pomodoro"
                                value={newTimer.pomodoro}
                                setValue={setNewTimer}
                                incrementFunc={() =>
                                    handleIncOrDecInputNumber('pomodoro', inputAction.INCREMENT)
                                }
                                decrementFunc={() =>
                                    handleIncOrDecInputNumber('pomodoro', inputAction.DECREMENT)
                                }
                            />
                            <TimerInputSettings
                                label="short-break"
                                objectNameProperty="shortBreak"
                                value={newTimer.shortBreak}
                                setValue={setNewTimer}
                                incrementFunc={() =>
                                    handleIncOrDecInputNumber('shortBreak', inputAction.INCREMENT)
                                }
                                decrementFunc={() =>
                                    handleIncOrDecInputNumber('shortBreak', inputAction.DECREMENT)
                                }
                            />
                            <TimerInputSettings
                                label="long-break"
                                objectNameProperty="longBreak"
                                value={newTimer.longBreak}
                                setValue={setNewTimer}
                                incrementFunc={() =>
                                    handleIncOrDecInputNumber('longBreak', inputAction.INCREMENT)
                                }
                                decrementFunc={() =>
                                    handleIncOrDecInputNumber('longBreak', inputAction.DECREMENT)
                                }
                            />
                        </div>
                    </div>
                    <div className="settings__content__font">
                        <span className="settings__content__category-title">FONT</span>
                        <div className="settings__content__font__content">
                            <button
                                className={isFontClassActive(Font.KHUMB_SANS)}
                                onClick={() => setFontSelected(Font.KHUMB_SANS)}>
                                Aa
                            </button>
                            <button
                                className={isFontClassActive(Font.ROBOTO_SLAB)}
                                onClick={() => setFontSelected(Font.ROBOTO_SLAB)}>
                                Aa
                            </button>
                            <button
                                className={isFontClassActive(Font.SPACE_MONO)}
                                onClick={() => setFontSelected(Font.SPACE_MONO)}>
                                Aa
                            </button>
                        </div>
                    </div>
                    <div className="settings__content__color">
                        <span className="settings__content__category-title">COLOR</span>
                        <div className="settings__content__color__content">
                            <button
                                className="settings__content__color__content__item"
                                onClick={() => setColorSelected(Color.RED)}>
                                {isColorClassActive(Color.RED)}
                            </button>
                            <button
                                className="settings__content__color__content__item"
                                onClick={() => setColorSelected(Color.CYAN)}>
                                {isColorClassActive(Color.CYAN)}
                            </button>
                            <button
                                className="settings__content__color__content__item"
                                onClick={() => setColorSelected(Color.VIOLET)}>
                                {isColorClassActive(Color.VIOLET)}
                            </button>
                        </div>
                    </div>
                </div>
                <button className="settings__btn-apply" onClick={() => handleApplyChange()}>
                    Apply
                </button>
            </Modal>
        </>
    );
};

export default Settings;
