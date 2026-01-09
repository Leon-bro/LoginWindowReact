'use client'
import { ButtonHTMLAttributes, Children, isValidElement, ReactNode, useState } from 'react';
import { Button } from "@/app/ui/button";
import { User, LockKeyhole, Mail } from "lucide-react";

export default function AuthCard() {
    const [isLogin, setIsLogin] = useState(true);
    const [hasAnimated, setHasAnimated] = useState(false);

    const handleSwitch = (status: boolean) => {
        setIsLogin(status);
        setHasAnimated(true);
    };

    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-center p-4 bg-void">

            <div className="relative w-full max-w-5xl min-w-2xl h-[550px] bg-void">

                {/* --- LAYER 1: The Glow --- */}
                <div className="absolute -inset-3 rounded-[30px] bg-neon-cyan/40 blur-2xl opacity-80"></div>

                {/* --- LAYER 2: The Main Card --- */}
                <div className="relative h-full w-full bg-void-dark rounded-[12px] border border-neon-cyan/30 overflow-hidden shadow-sm flex">

                    <div className="absolute inset-0 flex z-10">
                        {/* LEFT SIDE: Login Form */}
                        <div className="w-1/2 h-full flex items-center justify-center">
                            <div className={`transition-all w-full max-w-[300px]`}>
                                <LoginForm handleSwitch={handleSwitch} isLogin={isLogin}/>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Register Form */}
                        <div className="w-1/2 h-full flex items-center justify-center p-2">
                            <div className={`transition-all w-full max-w-[300px]`}>
                                <RegisterForm handleSwitch={handleSwitch} isLogin={isLogin}/>
                            </div>
                        </div>
                    </div>

                    {/* --- LAYER 3: The Sliding Overlay --- */}
                    <div
                        // 1. PARENT: Handles Geometry & Swing Animation ONLY
                        className={`absolute z-20 
                        ${hasAnimated ? (isLogin ? 'anim-to-login' : 'anim-to-register') : ''}`}

                        style={{
                            width: '200%',
                            height: '200%',
                            left: "50%",
                            top: "0",
                            transform: 'translateX(-50%) translateY(-50%)',

                            // Initial Static State logic
                            ...(!hasAnimated && {
                                transformOrigin: isLogin ? "14% 50%" : "-14% 50%",
                                rotate: isLogin ? "70deg" : "-70deg"
                            })
                        }}
                    >
                        {/* 2. CHILD: Handles Appearance & Neon Animation ONLY */}
                        {/* We move 'overlay' and 'animate-neon-flow' here.
        'inset-0' makes it fill the parent perfectly. */}
                        <div className="absolute inset-0 overlay animate-neon-flow"></div>
                    </div>
                    <div className="absolute inset-0 flex z-30 pointer-events-none justify-between">

                        {/* LEFT MESSAGE AREA (Visible when Overlay is on Left) */}
                        <div className="w-1/3 h-full flex items-center justify-start p-10">
                            {/* "Hello Friend" - Visible during Register State */}
                            {/* Pointer events must be 'auto' for the button to work */}
                            <div className={`flex flex-col items-start text-white pointer-events-auto transition-all duration-500 ${isLogin ? "delay-200" : "delay-1500"}  ${!isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                                <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
                            </div>
                        </div>

                        {/* RIGHT MESSAGE AREA (Visible when Overlay is on Right) */}
                        <div className="w-1/3 h-full flex items-center justify-end p-10">
                            {/* "Welcome Back" - Visible during Login State */}
                            <div className={`flex flex-col text-white pointer-events-auto transition-all duration-500 ${isLogin ? "delay-1500" : "delay-200"} ${isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
                                <h2 className="text-4xl font-bold mb-4 text-wrap text-end">Welcome Back!</h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export function StaggerContainer({
                                     children,
                                     isActive,
                                     direction = "left",
                                     totalDuration = 900, // The constraint: "It happens within this general duration"
                                     delayEnter = 700,
                                     delayExit = 0
                                 }: {
    children: ReactNode,
    isActive: boolean,
    direction?: "left" | "right",
    totalDuration?: number,
    delayEnter?: number,
    delayExit?: number
}) {

    const offsetDistance = "120px";
    const exitValue = direction === "left" ? `-${offsetDistance}` : offsetDistance;
    const transformStyle = isActive ? "translateX(0px)" : `translateX(${exitValue})`;
    const baseDelay = isActive ? delayEnter : delayExit;

    // 1. Count valid children to calculate timings
    const validChildren = Children.toArray(children).filter(isValidElement);
    const count = validChildren.length;

    // 2. Define the "Small Duration" for one item
    // It must be faster than the total duration to feel "independent"
    // e.g., if total is 600ms, let's give each item 300ms to move.
    const childDuration = 500;

    // 3. Calculate Stagger Delay dynamically
    // We have (Total Time - Item Time) remaining to spread the delays across children.
    // Formula: available_delay_space / (items - 1)
    const availableDelay = Math.max(0, totalDuration - childDuration);
    const staggerDelay = count > 1 ? availableDelay / (count - 1) : 0;

    return (
        <div className="w-full flex flex-col gap-6">
            {validChildren.map((child, index) => {

                // 4. Calculate this specific child's timing
                const currentStagger = index * staggerDelay;
                const totalDelay = baseDelay + currentStagger;

                return (
                    <div
                        key={index}
                        style={{
                            // TIMING LOGIC:
                            // Delay: specific to index
                            transitionDelay: `${totalDelay}ms`,
                            // Duration: Fixed "Small" duration (300ms), NOT the total 600ms
                            transitionDuration: `${childDuration}ms`,

                            transitionProperty: "opacity, transform",
                            transitionTimingFunction: "ease-out",

                            // VISUAL STATES:
                            transform: transformStyle,
                            opacity: isActive ? 1 : 0
                        }}
                        className="will-change-[transform,opacity]"
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
}
// --- SUBCOMPONENTS ---

function LoginForm({handleSwitch, isLogin}: {handleSwitch: (status: boolean) => void, isLogin: boolean}) {
    return (
        <form className="w-full flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
            <StaggerContainer isActive={isLogin} direction="left" delayEnter={1700}
                              delayExit={0}>
                <h1 className="text-3xl font-bold text-white mb-2 text-center">Login</h1>
                <InputGroup label="Username" id="login-user" icon={<User size={20}/>}/>
                <InputGroup label="Password" id="login-pass" type="password" icon={<LockKeyhole size={20}/>} />
                <Button mode={"primary"}>LOGIN</Button>
                <div className={"flex flex-col gap-1"}>
                    <span className={"text-center"}>Don`t have an account?</span>
                    <Button mode={"link"} onClick={() => handleSwitch(false)}>Sign up</Button>
                </div>
            </StaggerContainer>
        </form>
    );
}

function RegisterForm({handleSwitch, isLogin}: {handleSwitch: (status: boolean) => void, isLogin: boolean}) {
    return (
        <form className="w-full flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
            <StaggerContainer isActive={!isLogin} direction="right" delayEnter={1700}
                              delayExit={0}>
                <h1 className="text-3xl font-bold text-white mb-2 text-center">Register</h1>
                <InputGroup label="Email" id="reg-email" icon={<Mail size={20}/>}/>
                <InputGroup label="Username" id="reg-user" icon={<User size={20}/>}/>
                <InputGroup label="Password" id="reg-pass" type="password" icon={<LockKeyhole size={20}/>}/>
                <Button mode={"primary"}>REGISTER</Button>
                <div className={"flex flex-col gap-1"}>
                    <span className={"text-center"}>Already have an account?</span>
                    <Button mode={"link"} onClick={() => handleSwitch(true)}>Sign in</Button>
                </div>
            </StaggerContainer>
        </form>
    );
}
// Optional: Add an 'icon' prop
interface InputGroupProps {
    label: string;
    id: string;
    type?: string;
    icon?: ReactNode; // Pass an SVG or Icon component here
}
function InputGroup({ label, id, type = "text", icon }: InputGroupProps) {
    return (
        <div className="relative group w-full">
            <input
                type={type}
                id={id}
                placeholder=" "
                // 1. Add 'pr-10' to stop text before it hits the icon area
                className="peer w-full bg-transparent border-b-2 border-gray-600 py-2 pr-10 text-white outline-none focus:border-neon-cyan transition-colors"
            />

            <label
                htmlFor={id}
                className="absolute left-0 top-2 text-gray-400 text-lg transition-all duration-300
                           peer-focus:-top-4 peer-focus:text-sm peer-focus:text-neon-cyan
                           peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs"
            >
                {label}
            </label>

            {/* 2. Position the Icon at the end */}
            {icon && (
                <div className="absolute right-0 top-2 text-gray-400 peer-focus:text-neon-cyan transition-colors">
                    {icon}
                </div>
            )}
        </div>
    );
}