import AuthCard from "@/app/login/components/AuthCard";
import CyberpunkAuth from "@/app/login/components/CyberAuth";

export default function Login() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center">
            <CyberpunkAuth></CyberpunkAuth>
        </main>
    );
}
