import { useCallback, useEffect, useState } from "react"

function PasswordGenerator() {
    const [length, setLength] = useState(8)
    const [numbersAllowed, setNumbersAllowed] = useState(false)
    const [charAllowed, setChatAllowed] = useState(false)
    const [password, setPassword] = useState("")

    //For good UX
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let pass = [];
        let required = [];

        if (numbersAllowed) {
            const numbers = "1234567890";
            str += numbers;
            required.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }

        if (charAllowed) {
            const specialChars = "#$&!";
            str += specialChars;
            required.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
        }

        for (let i = 0; i < length - required.length; i++) {
            pass.push(str[Math.floor(Math.random() * str.length)]);
        }

        pass = pass.concat(required);

        // Shuffle the result
        pass = pass.sort(() => Math.random() - 0.5);

        setPassword(pass.join(""));
    }, [length, numbersAllowed, charAllowed])

    const copyPassToClip = () => {
        window.navigator.clipboard.writeText(password)

        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset after 1s
    }

    useEffect(() => { generatePassword() }, [length, numbersAllowed, charAllowed, generatePassword])

    return (
        <>
            <div className="w-screen min-h-screen bg-gray-500 flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-screen-lg mx-auto shadow-2xl rounded-3xl px-12 py-10 bg-gray-700">
                    <h1 className="text-white text-center text-4xl font-bold mb-10 tracking-wide">
                        Random Password Generator
                    </h1>

                    <div className="flex flex-col sm:flex-row shadow-xl rounded-2xl overflow-hidden mb-8 w-full">
                        <input
                            type="text"
                            value={password}
                            className="outline-none w-full py-4 px-5 text-4xl bg-white font-mono"
                            placeholder="Password"
                            readOnly
                        />
                        <div className="flex sm:flex-row flex-col sm:w-auto w-full">
                            <button
                                onClick={generatePassword}
                                className="sm:px-6 px-4 sm:py-4 py-3 bg-blue-600 text-white text-3xl hover:bg-blue-700 transition w-full sm:w-auto"
                            >
                                ⟳
                            </button>
                            <button
                                onClick={copyPassToClip}
                                className={`sm:px-6 px-4 sm:py-4 py-3 text-2xl font-semibold outline-4 outline-gray-700 transition w-full sm:w-auto ${copied ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                                    } text-white`}
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>


                    <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-x-5 gap-y-4 mb-10 text-center">
                        <label className="text-white text-2xl font-medium">Length:</label>
                        <input
                            type="range"
                            min={6}
                            max={40}
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-72 sm:w-96 h-4 bg-gray-300 rounded-lg"
                            style={{
                                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((length - 6) / 34) * 100}%, #D1D5DB ${((length - 6) / 34) * 100}%, #D1D5DB 100%)`,
                            }}
                        />
                        <span className="text-white font-bold text-2xl">{length}</span>
                    </div>

                    <div className="flex justify-center gap-x-16">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-10 gap-y-6">
                            <div className="flex items-center gap-x-4">
                                <input
                                    type="checkbox"
                                    checked={numbersAllowed}
                                    onChange={() => setNumbersAllowed((prev) => !prev)}
                                    className="w-6 h-6"
                                />
                                <label className="text-white text-2xl">Include Numbers</label>
                            </div>

                            <div className="flex items-center gap-x-4">
                                <input
                                    type="checkbox"
                                    checked={charAllowed}
                                    onChange={() => setChatAllowed((prev) => !prev)}
                                    className="w-6 h-6"
                                />
                                <label className="text-white text-2xl">Include Special Characters</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
export default PasswordGenerator