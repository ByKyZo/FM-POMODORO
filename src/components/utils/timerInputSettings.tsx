import React from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

interface IProps {
    label: string;
    objectNameProperty: string;
    value: number;
    setValue: (arg: any) => void;
    incrementFunc: () => void;
    decrementFunc: () => void;
}

const TimerInputSettings = ({ label, objectNameProperty,value,setValue ,incrementFunc, decrementFunc }: IProps) => {
    return (
        <div className="settings__content__times__content__item">
            <label htmlFor="input-num-pomodoro">{label}</label>
            <div className="settings__content__times__content__item__input-wrapper">
                <button
                    onClick={incrementFunc}
                    className="settings__content__times__content__item__input-wrapper__btn--increment">
                    <IoChevronUpOutline />
                </button>
                <button
                    className="settings__content__times__content__item__input-wrapper__btn--decrement"
                    onClick={decrementFunc}>
                    <IoChevronDownOutline />
                </button>
                <input
                    id="input-num-pomodoro"
                    value={value}
                    min="1"
                    max="60"
                    onChange={(e) =>
                        setValue((oldState: any) => {
                            return { ...oldState, [objectNameProperty]: parseInt(e.target.value) };
                        })
                    }
                    type="number"
                />
            </div>
        </div>
    );
};

export default TimerInputSettings;
