import { useEffect, useMemo, useState } from "react";
import "./CharacterCounter.scss";

const WORDS_PER_MINUTE = 200;

function CharacterCounter() {
    const [text, setText] = useState("");
    const [delayedText, setDelayedText] = useState(text);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDelayedText(text);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [text]);

    const metrics = useMemo(() => {
        console.log("Recalculando métricas...");

        const words = delayedText.trim().split(/\s+/).filter(Boolean);
        const totalChars = delayedText.length;
        const wordCount = words.length;

        const readingTime = wordCount > 0 ? (wordCount / WORDS_PER_MINUTE).toFixed(2) : "0";
        const avgWordLength = wordCount > 0
            ? (words.join("").length / wordCount).toFixed(2)
            : "0";

        return {
            totalChars,
            wordCount,
            readingTime,
            avgWordLength,
        };
    }, [delayedText]);

    return (
        <div className="counter">
            <h1>Character Counter Tool</h1>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe tu texto aquí..."
            />

            <div className="metrics">
                <p><strong>Total Characters:</strong> {metrics.totalChars}</p>
                <p><strong>Total Words:</strong> {metrics.wordCount}</p>
                <p><strong>Estimated Reading Time:</strong> {metrics.readingTime} min</p>
                <p><strong>Average Word Length:</strong> {metrics.avgWordLength}</p>
            </div>
        </div>
    );
}

export default CharacterCounter;