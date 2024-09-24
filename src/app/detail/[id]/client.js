'use client';
import { useState } from 'react';

export default function ClientPage({ response }) {
    const { url, id, name } = response; // Extracting values from the response prop

    const [inp1, setInp1] = useState('');
    const [inp2, setInp2] = useState('');
    const [generatedMeme, setGeneratedMeme] = useState(null);

    const userName = 'wajawaja';
    const password = 'wajawaja';

    const onSubmit = async () => {
        if (!response || !inp1 || !inp2) {
            alert('Please enter all the fields');
            return;
        }

        const mainUrl = `https://api.imgflip.com/caption_image?username=${userName}&password=${password}&template_id=${id}&text0=${inp1}&text1=${inp2}`;
        try {
            const res = await fetch(mainUrl, {
                method: 'POST', // Corrected method
            });

            const newData = await res.json();
            if (newData.success) {
                setGeneratedMeme(newData.data);
            } else {
                alert('Unknown error occurred');
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-200 to-blue-500 py-12 flex flex-col items-center justify-center">

            {!generatedMeme ? (
                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full transform transition-transform duration-500 hover:scale-105">

                    <div className='flex'>
                        <img
                            src={url}
                            alt={name}
                            className="w-48 h-full object-cover rounded-2xl mb-6 shadow-md"
                        />
                        <h3 className='font-semibold text-3xl m-4'>{name}</h3></div>
                    <div className="space-y-6">
                        <input
                            type="text"
                            onChange={(e) => setInp1(e.target.value)}
                            placeholder="Enter top text"
                            className="w-full px-5 py-3 bg-cyan-100 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
                        />
                        <input
                            type="text"
                            onChange={(e) => setInp2(e.target.value)}
                            placeholder="Enter bottom text"
                            className="w-full px-5 py-3 bg-cyan-100 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
                        />
                        <button
                            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300"
                            onClick={onSubmit}
                        >
                            Create Meme
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full transform transition-transform duration-500 hover:scale-105">
                    <img
                        src={generatedMeme.url}
                        alt="Generated Meme"
                        className="w-64 h-full object-cover rounded-2xl mb-6 shadow-md"
                    />
                    <button
                        onClick={() => setGeneratedMeme(null)}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-cyan-500 hover:to-blue-600 transition duration-300"
                    >
                        Back
                    </button>
                </div>
            )}
        </div>

    )
}
