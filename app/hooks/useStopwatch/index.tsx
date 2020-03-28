import { useState, useEffect } from 'react';

export const useStopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const incrementTime = () => setElapsedTime(time => time + 0.01);

    useEffect(() => {
        const interval = isRunning ? setInterval(incrementTime, 10) : undefined;
        return () => clearInterval(interval);
    }, [isRunning]);

    const resetTimer = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };

    return {
        elapsedTime: elapsedTime.toFixed(1),
        startTimer: () => setIsRunning(true),
        stopTimer: () => setIsRunning(false),
        resetTimer,
        isRunning
    };
};
