import { useState, useEffect } from 'react';
import Modal from './utils/Modal';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiCloseFill } from 'react-icons/ri';
import { BiCheck } from 'react-icons/bi';
import { Color, Font } from '../types/enum';
import { Timer } from '../types/types';

interface IProps {
    timer: Timer;
    setTimer: (arg: (arg: Timer) => Timer) => void;
    currentFont: Font;
    setCurrentFont: (arg: Font) => void;
    currentColor: Color;
    setCurrentColor: (arg: Color) => void;
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
        setCurrentFont(fontSelected);
        setCurrentColor(colorSelected);
        setTimer((oldTimer: Timer) => {
            return {
                ...oldTimer,
                pomodoro: newTimer.pomodoro,
                shortBreak: newTimer.shortBreak,
                longBreak: newTimer.longBreak,
            };
        });
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isOpen) {
            setFontSelected(currentFont);
            setColorSelected(currentColor);
            setNewTimer({
                ...newTimer,
                pomodoro: timer.pomodoro,
                shortBreak: timer.shortBreak,
                longBreak: timer.longBreak,
            });
        }
    }, [isOpen]);

    const fontActiveClass = (mode: Font) => {
        return `settings__content__font__content__item ${
            fontSelected === mode ? 'settings__content__font__content__item--active' : ''
        }`;
    };

    const isColorSelected = (mode: Color) => {
        return (
            mode === colorSelected && (
                <BiCheck className="settings__content__color__content__item--active" />
            )
        );
    };
    return (
        <>
            <button className="btn-settings" onClick={() => setIsOpen(true)}>
                <IoSettingsSharp />
            </button>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="settings">
                    <div className="settings__head">
                        <h4>Settings</h4>
                        <button onClick={() => setIsOpen(false)}>
                            <RiCloseFill />
                        </button>
                    </div>
                    <div className="settings__content">
                        <div className="settings__content__times">
                            <span className="settings__content__category-title">
                                TIME (MINUTES)
                            </span>
                            <div className="settings__content__times__content">
                                <div className="settings__content__times__content__input-wrapper">
                                    <label htmlFor="input-num-pomodoro">pomodoro</label>
                                    <input
                                        id="input-num-pomodoro"
                                        value={newTimer.pomodoro}
                                        onChange={(e) =>
                                            setNewTimer({
                                                ...newTimer,
                                                pomodoro: parseInt(e.target.value),
                                            })
                                        }
                                        type="number"
                                    />
                                </div>
                                <div className="settings__content__times__content__input-wrapper">
                                    <label htmlFor="input-num-shortBreak">short-break</label>
                                    <input
                                        id="input-num-shortBreak"
                                        type="number"
                                        value={newTimer.shortBreak}
                                        onChange={(e) =>
                                            setNewTimer({
                                                ...newTimer,
                                                shortBreak: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                                <div className="settings__content__times__content__input-wrapper">
                                    <label htmlFor="input-num-longBreak">long-break</label>
                                    <input
                                        id="input-num-longBreak"
                                        type="number"
                                        value={newTimer.longBreak}
                                        onChange={(e) =>
                                            setNewTimer({
                                                ...newTimer,
                                                longBreak: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="settings__content__font">
                            <span className="settings__content__category-title">FONT</span>
                            <div className="settings__content__font__content">
                                <button
                                    className={fontActiveClass(Font.KHUMB_SANS)}
                                    onClick={() => setFontSelected(Font.KHUMB_SANS)}>
                                    Aa
                                </button>
                                <button
                                    className={fontActiveClass(Font.ROBOTO_SLAB)}
                                    onClick={() => setFontSelected(Font.ROBOTO_SLAB)}>
                                    Aa
                                </button>
                                <button
                                    className={fontActiveClass(Font.SPACE_MONO)}
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
                                    {isColorSelected(Color.RED)}
                                </button>
                                <button
                                    className="settings__content__color__content__item"
                                    onClick={() => setColorSelected(Color.CYAN)}>
                                    {isColorSelected(Color.CYAN)}
                                </button>
                                <button
                                    className="settings__content__color__content__item"
                                    onClick={() => setColorSelected(Color.VIOLET)}>
                                    {isColorSelected(Color.VIOLET)}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="settings__btn-apply" onClick={() => handleApplyChange()}>
                        Apply
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Settings;
