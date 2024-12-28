import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const quizzes = {
    general: {
        title: 'Mental Health Check-In',
        questions: [
            { category: 'Mood', question: 'I feel happy and optimistic about my future.' },
            { category: 'Mood', question: 'I have energy to do the things I enjoy.' },
            { category: 'Mood', question: 'I feel generally calm and relaxed.' },
            { category: 'Stress & Anxiety', question: 'I feel overwhelmed by the demands in my life.' },
            { category: 'Stress & Anxiety', question: 'I experience feelings of worry or fear.' },
            { category: 'Stress & Anxiety', question: 'I feel irritable or easily frustrated.' },
            { category: 'Sleep', question: 'I get enough restful sleep at night.' },
            { category: 'Sleep', question: 'I feel rested and energized during the day.' },
            { category: 'Sleep', question: 'I have trouble falling or staying asleep.' },
            { category: 'Relationships', question: 'I feel connected and supported by friends or family.' },
            { category: 'Relationships', question: 'I have someone I trust to talk to about my problems.' },
            { category: 'Relationships', question: 'I feel lonely or isolated.' },
            { category: 'Self-Care', question: 'I set aside time for activities that make me happy.' },
            { category: 'Self-Care', question: 'I eat well and stay hydrated.' },
            { category: 'Self-Care', question: 'I exercise or move my body regularly.' },
            { category: 'Concentration & Motivation', question: 'I can focus on tasks or schoolwork without being easily distracted.' },
            { category: 'Concentration & Motivation', question: 'I feel motivated to accomplish things.' },
            { category: 'Concentration & Motivation', question: 'I feel confident in my ability to handle challenges.' },
        ],
        scoring: (score) => {
            if (score <= 24) return 'You’re likely feeling in good mental health, but continue healthy habits.';
            if (score <= 40) return 'You may be experiencing some challenges; consider self-care or counseling.';
            return 'High scores suggest struggling; speaking with a mental health professional may help.';
        },
    },
    selfEsteem: {
        title: 'Self-Esteem Quiz',
        questions: [
            { question: 'I feel like I am a person of worth, at least on an equal basis with others.' },
            { question: 'I am able to acknowledge my achievements and feel proud of them.' },
            { question: 'I don’t let mistakes or setbacks affect how I view myself.' },
            { question: 'I feel confident in my ability to accomplish my goals.' },
            { question: 'I often feel that I am valuable to those around me.' },
            { question: 'I believe I deserve to be treated with kindness and respect.' },
            { question: 'I can handle criticism or feedback without feeling bad about myself.' },
        ],
        scoring: (score) => {
            if (score <= 15) return 'Low self-esteem. Consider practicing self-compassion and talking to a counselor.';
            if (score <= 25) return 'Moderate self-esteem. Focus on self-acknowledgment to build confidence.';
            return 'High self-esteem. Keep nurturing your positive self-view.';
        },
    },
    socialWellBeing: {
        title: 'Social Well-Being Quiz',
        questions: [
            { question: 'I feel comfortable and relaxed around people.' },
            { question: 'I find it easy to make friends or connect with others.' },
            { question: 'I regularly engage in meaningful conversations with people.' },
            { question: 'I am satisfied with my current social circle and feel supported.' },
            { question: 'I reach out to friends or family when I need help.' },
            { question: 'I feel that I belong in my community or social groups.' },
            { question: 'I have people I can count on for companionship or support.' },
        ],
        scoring: (score) => {
            if (score <= 14) return 'You may feel isolated or disconnected; try reaching out to friends or joining social groups.';
            if (score <= 21) return 'You’re moderately social; you might benefit from building stronger connections.';
            return 'You’re socially well-adjusted! Keep up your supportive social habits.';
        },
    },
};

const QuizPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [selectedQuiz, setSelectedQuiz] = useState('general');
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [totalScore, setTotalScore] = useState(0);


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('/api/account', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else if (response.status === 401) {
                    navigate('/login');
                } else {
                    setMessage('Failed to fetch account details.');
                }
            } catch (error) {
                setMessage('Error fetching account details.');
            }
        };

        fetchUserDetails();
    }, [navigate]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-center mb-6">Loading...</h1>;
            </div>
        )
    }

    const currentQuiz = quizzes[selectedQuiz];

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = parseInt(value, 10);
        setAnswers(updatedAnswers);
    };

    const calculateResults = async () => {
        const score = answers.reduce((acc, curr) => acc + (curr || 0), 0);
        setTotalScore(score);
        console.log("Quiz Score : " + score);
        await submitQuizResults(score);
        setShowResults(true);
    };

    const resetQuiz = () => {
        setAnswers([]);
        setShowResults(false);
        setTotalScore(0);
    };

    const submitQuizResults = async (quizScore) => {
        try {
            const response = await fetch('/api/quiz/submit', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quizType: selectedQuiz,
                    score: quizScore
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(error.message || 'Failed to submit quiz results.');
            } else {
                console.log('Quiz results submitted successfully.');
            }
        } catch (error) {
            console.error('Error submitting quiz results:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">Take a Quiz</h1>
            <div className="max-w-3xl mx-auto mb-6">
                <label htmlFor="quizSelect" className="block text-gray-700 mb-2 font-semibold">
                    Select a Quiz:
                </label>
                <select
                    id="quizSelect"
                    value={selectedQuiz}
                    onChange={(e) => {
                        setSelectedQuiz(e.target.value);
                        resetQuiz();
                    }}
                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                >
                    <option value="general">Mental Health Check-In</option>
                    <option value="selfEsteem">Self-Esteem Quiz</option>
                    <option value="socialWellBeing">Social Well-Being Quiz</option>
                </select>
            </div>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {!showResults ? (
                    <>
                        {currentQuiz.questions.map((item, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-gray-700 mb-2">{item.category ? `${item.category}: ` : ''}{item.question}</p>
                                <select
                                    value={answers[index] || 0}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                                >
                                    <option value="0">Select your answer</option>
                                    <option value="1">Rarely or Never (1)</option>
                                    <option value="2">Sometimes (2)</option>
                                    <option value="3">Often (3)</option>
                                    <option value="4">Always (4)</option>
                                </select>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={calculateResults}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Submit Quiz
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-4">Your Results</h2>
                        <p className="text-gray-700 text-lg text-center mb-6">Your total score: <strong>{totalScore}</strong></p>
                        <p className="text-gray-700 text-center">{currentQuiz.scoring(totalScore)}</p>
                        <button
                            onClick={resetQuiz}
                            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Take Quiz Again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
