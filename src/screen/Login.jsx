import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../lottie/chat1.json';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const { SignUp, Login } = useAuth();
    const [isSignup, setIsSignup] = useState(true);
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result); // Base64-encoded string
        };
        reader.readAsDataURL(file); // Converts the file to a base64 string
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                await SignUp(email, password, name, profileImage)
                setIsSignup(false);
            } else {
                await Login(email, password);
                navigate('/Home');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex h-screen bg-[#CCD3D5]">
            <div className="flex items-center justify-center w-full m-10">
                <div className="w-full max-w-[40%] h-[100%] bg-white bg-opacity-80 p-8 rounded-sm shadow-lg">
                    <i className="fa-solid fa-arrow-left cursor-pointer" onClick={() => setIsSignup(!isSignup)}></i>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col p-12">
                        <p className="text-2xl font-bold mb-4">{isSignup ? 'Signup' : 'Login'}</p>
                        <p className="text-base mb-4">Welcome! Please fill the username and password to sign in into your account.</p>
                        {isSignup && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="p-2 pl-4 my-2 border rounded w-full bg-gray-200"
                                    required
                                />
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="p-2 pl-4 my-2 border rounded w-full bg-gray-200"
                                    required
                                />

                            </>
                        )}
                        <input
                            type="email"
                            placeholder="Type your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 pl-4 my-2 border rounded w-full bg-gray-200"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Type your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 pl-4 my-2 border rounded w-full bg-gray-200"
                            required
                        />
                        <p className="text-right font-medium text-gray-600 cursor-pointer" onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ? 'Already have an account? Login' : 'Not have an Account? Signup'}
                        </p>
                        <button type="submit" className="p-3 mt-4 bg-[#304A5E] font-semibold text-white rounded-full w-full">
                            {isSignup ? 'Signup Now' : 'Login Now'}
                        </button>

                        {!isSignup && (
                            <>
                                <p className="h-1 bg-gray-300 m-5"></p>
                                <div>
                                    <p className="text-center">You can also login with:</p>
                                    <div className="text-center p-2">
                                        <i className="fa-brands fa-square-facebook text-xl text-[#4495AA]"></i>
                                        <i className="fa-brands fa-google text-xl mx-2 text-[#4495AA]"></i>
                                        <i className="fa-brands fa-square-twitter text-xl text-[#4495AA]"></i>
                                    </div>
                                </div>
                            </>
                        )}

                    </form>
                </div>
                <div className="flex-1 w-full max-w-[40%] h-[100%] relative border">
                    <Lottie animationData={animationData} loop={true} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
                    <div className="flex items-end justify-end h-full p-4 relative" style={{ zIndex: 1 }}>
                        {/* <div className="bg-black bg-opacity-50 p-4 rounded">
                            <p className="text-white text-xl font-bold mb-2">Start your journey now!</p>
                            <p className="text-white text-base">Unlock endless possibilities. Sign in to embark on your adventure.</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
