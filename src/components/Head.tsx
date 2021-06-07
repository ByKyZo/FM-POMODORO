import { Mode } from '../types/enum';

interface IProps {
    currentMode: Mode;
    setCurrentMode: (arg: Mode) => void;
}

const Head = ({ currentMode, setCurrentMode }: IProps) => {
    const isModeClassActive = (mode: Mode) => {
        return `head__nav__btn ${currentMode === mode ? 'head__nav__btn--active' : ''}`;
    };

    return (
        <div className="head">
            <h1 className="head__title">pomodoro</h1>
            <nav className="head__nav">
                <button
                    className={isModeClassActive(Mode.POMODORO)}
                    onClick={() => setCurrentMode(Mode.POMODORO)}>
                    pomodoro
                </button>
                <button
                    className={isModeClassActive(Mode.SHORT_BREAK)}
                    onClick={() => setCurrentMode(Mode.SHORT_BREAK)}>
                    short break
                </button>
                <button
                    className={isModeClassActive(Mode.LONG_BREAK)}
                    onClick={() => setCurrentMode(Mode.LONG_BREAK)}>
                    long break
                </button>
            </nav>
        </div>
    );
};

export default Head;
