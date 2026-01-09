
export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
    return (
        <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-3xl font-bold text-white mb-4 tracking-wider">Login</h1>

            <div className="space-y-4">
                <input type="text" placeholder="Username" className="w-full bg-transparent border-b border-gray-600 focus:border-card-border outline-none py-2 text-white placeholder-gray-500 transition-colors"/>
                <input type="password" placeholder="Password" className="w-full bg-transparent border-b border-gray-600 focus:border-card-border outline-none py-2 text-white placeholder-gray-500 transition-colors"/>
            </div>

            <button className="w-full mt-6 py-3 rounded-full bg-btn-gradient text-background font-bold text-lg hover:shadow-[0_0_15px_#00EEFF] transition-shadow">
                Login
            </button>

            <p className="text-xs text-center text-gray-400 mt-4 md:hidden">
                Don't have an account? <button type="button" onClick={onSwitch} className="text-card-border underline">Sign Up</button>
            </p>
        </form>
    );
}