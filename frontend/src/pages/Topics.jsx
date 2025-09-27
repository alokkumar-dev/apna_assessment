import React from 'react'
import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Topics() {
    const { user } = useContext(AuthContext);
    const [chapters, setChapters] = useState([]);
    const [openChapter, setOpenChapter] = useState(null);
    const [loadingProblems, setLoadingProblems] = useState(new Set());
    const [loadingChapters, setLoadingChapters] = useState(false);

    useEffect(() => {
        fetchChapters();
    }, []);

    const fetchChapters = async () => {
        if(chapters.length === 0){
            setLoadingChapters(true);
        }
        const res = await API.get("/chapters");
        setChapters(res.data);
        setLoadingChapters(false);
    };

    const handleCheckbox = async (problemId, problem) => {
        setLoadingProblems(prev => new Set(prev).add(problemId));
        
        try {
            await API.put("/problems/completed", { userId: user?._id, problemId, isCompleted: !problem?.isCompleted });
            fetchChapters();
        } catch (error) {
            console.error("Error updating problem status:", error);
        } finally {
            setLoadingProblems(prev => {
                const newSet = new Set(prev);
                newSet.delete(problemId);
                return newSet;
            });
        }
    };

    const toggleChapter = (chapterId) => {
        setOpenChapter(openChapter === chapterId ? null : chapterId);
    };

    return (
        <div className="min-h-screen bg-gray-100 mt-12">
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">Topics</h1>
                <p className="text-center text-gray-600 mb-8">Explore these exciting topics!</p>

                { chapters && chapters.length > 0 && !loadingChapters ? chapters.map((chapter) => (
                    <div key={chapter._id} className="bg-white rounded-lg shadow-xl mb-6 overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
                        <div
                            className="flex justify-between items-center p-5 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 text-white font-extrabold text-lg transition-colors duration-300 hover:from-teal-600 hover:to-teal-700"
                            onClick={() => toggleChapter(chapter._id)}
                        >
                            <span>
                                {chapter.name}{" "}
                                {
                                    chapter.problems.length > 0 && (
                                        <span
                                            className={`ml-3 px-4 py-1 text-xs font-semibold rounded-full shadow-lg ${chapter.problems.every((problem) =>
                                                problem?.isCompleted
                                            )
                                                    ? "bg-green-400" // Completed status color
                                                    : "bg-yellow-400" // Pending status color
                                                }`}
                                        >

                                            {chapter.problems.every((problem) =>
                                                problem?.isCompleted
                                            )
                                                ? "Completed"
                                                : "Pending"}
                                        </span>
                                    )
                                }

                            </span>
                            <span>
                                {openChapter === chapter._id ? (
                                    <svg className="w-6 h-6 transform rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                ) : (
                                    <svg className="w-6 h-6 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                )}
                            </span>
                        </div>

                        {openChapter === chapter._id && (
                            <div className="p-5 bg-teal-50 border-t-2 border-teal-100 animate-fade-in">
                                <h3 className="text-2xl font-bold text-teal-700 mb-5">Sub Topics</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white rounded-lg shadow-inner">
                                        <thead>
                                            <tr className="bg-teal-100 text-teal-800 uppercase text-sm leading-normal">
                                                <th className="py-3 px-6 text-left">Name</th>
                                                <th className="py-3 px-6 text-left">LeetCode Link</th>
                                                <th className="py-3 px-6 text-left">YouTube Link</th>
                                                <th className="py-3 px-6 text-left">Article Link</th>
                                                <th className="py-3 px-6 text-left">Level</th>
                                                <th className="py-3 px-6 text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-700 text-sm font-light">
                                            {chapter.problems.map((problem) => (
                                                <tr key={problem._id} className="border-b border-gray-200 hover:bg-teal-50">
                                                    <td className="py-3 px-6 text-left whitespace-nowrap flex items-center">
                                                        <div className="relative mr-3">
                                                            <input
                                                                type="checkbox"
                                                                checked={problem?.isCompleted || false}
                                                                onChange={() => handleCheckbox(problem._id, problem)}
                                                                disabled={loadingProblems.has(problem._id)}
                                                                className="h-5 w-5 text-teal-600 rounded focus:ring-teal-500 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                            />
                                                            {loadingProblems.has(problem._id) && (
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-teal-600 border-t-transparent"></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="font-medium">{problem.title}</span>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        <a href={problem.leetcodeLink} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline hover:text-teal-700 transition-colors duration-200">Practise</a>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        <a href={problem.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline hover:text-teal-700 transition-colors duration-200">Watch</a>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        <a href={problem.articleLink} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline hover:text-teal-700 transition-colors duration-200">Read</a>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">{problem.level}</td>
                                                    <td className="py-3 px-6 text-left">
                                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md ${problem?.isCompleted ? "bg-green-400" : "bg-yellow-400"}`}>
                                                            {problem?.isCompleted ? "Done" : "Pending"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ) ) : loadingChapters ? (
                    <div className="flex justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-700">No chapters found</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Topics;