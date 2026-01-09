'use client'
import LoginForm from "@/app/login/components/LoginForm";
import { useState } from "react";
import SignInForm from "@/app/login/components/SignIn";

export default function AuthCard() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="relative w-full max-w-[900px] min-h-[500px]">
            {/* 1. The Outer Glow Layer */}
            <div className="absolute -inset-1 rounded-2xl bg-card-border blur opacity-40"></div>

            {/* 2. Main Container */}
            <div className="relative w-full h-full min-h-[500px] bg-background rounded-2xl border border-card-border/50 shadow-neon overflow-hidden">

                {/* --- FORM LAYER (Static Background) --- */}
                <div className="flex w-full h-full relative z-10">

                    {/* Left Side: Login Form (Visible when Overlay is on Right) */}
                    <div className={`w-1/2 h-full p-12 flex flex-col justify-center transition-all duration-700 ${!isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <LoginForm onSwitch={() => setIsLogin(false)} />
                    </div>

                    {/* Right Side: Register Form (Visible when Overlay is on Left) */}
                    <div className={`absolute right-0 top-0 w-1/2 h-full p-12 flex flex-col justify-center transition-all duration-700 ${isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <SignInForm onSwitch={() => setIsLogin(true)} />
                    </div>

                </div>

                {/* --- OVERLAY LAYER (The Moving Part) --- */}
                {/* We use translate-x-full to move it to the right side */}
                <div
                    className={`absolute top-0 left-0 w-[55%] h-full bg-cyber-gradient z-20 transition-transform duration-700 ease-in-out -skew-x-6 origin-bottom
            ${isLogin ? 'translate-x-[85%]' : '-translate-x-[10%]'}`}
                >
                    {/* Inner Content (Un-skewed to keep text straight) */}
                    <div className="w-full h-full skew-x-6 flex items-center justify-center relative">

                        {/* Glass/Noise Texture Overlay */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

                        {/* Text: Welcome Back (Shows when Login mode/Overlay Right) */}
                        <div className={`absolute text-center p-8 transition-opacity duration-700 ${isLogin ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(0,238,255,0.5)]">
                                Welcome Back!
                            </h1>
                            <p className="text-gray-200 mb-6">To keep connected with us please login with your personal info</p>
                            <button
                                onClick={() => setIsLogin(false)}
                                className="px-8 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-background transition-colors"
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Text: Hello Friend (Shows when Register mode/Overlay Left) */}
                        <div className={`absolute text-center p-8 transition-opacity duration-700 ${!isLogin ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(0,238,255,0.5)]">
                                Hello, Friend!
                            </h1>
                            <p className="text-gray-200 mb-6">Enter your personal details and start your journey with us</p>
                            <button
                                onClick={() => setIsLogin(true)}
                                className="px-8 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-background transition-colors"
                            >
                                Sign In
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}