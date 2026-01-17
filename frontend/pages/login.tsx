import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "@/utils/api";
import { setToken } from "@/utils/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      // @ts-ignore
      setToken(data.token);
      router.push("/generate");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('5382404.jpg')" }}
    >
      {/* STRONG BACKDROP */}
      <div className="absolute inset-0 bg-black/70" />

      {/* LOGIN CARD */}
      <div className="relative w-[380px] rounded-2xl bg-black/80 backdrop-blur-xl border border-cyan-400/40 shadow-[0_0_60px_rgba(0,255,255,0.35)]">

        {/* HEADER GLASS PLATE */}
        <div className="rounded-t-2xl bg-black/90 px-6 py-5 text-center border-b border-cyan-400/30">
          <h1 className="text-2xl font-bold text-cyan-300">
            Article Generator
          </h1>
          <p className="text-xs text-cyan-200/70 mt-1">
            AI-powered content engine
          </p>
        </div>

        {/* BODY */}
        <div className="px-6 py-6 space-y-4">

          {/* USERNAME */}
          <div className="rounded-lg bg-black/70 border border-cyan-300/30">
            <input
              className="
                w-full bg-transparent px-3 py-2
                text-white placeholder-gray-400
                focus:outline-yes
              "
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="rounded-lg bg-black/70 border border-pink-300/30">
            <input
              type="password"
              className="
                w-full bg-transparent px-3 py-2
                text-white placeholder-gray-400
                focus:outline-none
              "
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="
              w-full rounded-lg py-2.5 font-semibold
              bg-gradient-to-r from-cyan-400 to-pink-500
              text-black
              hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]
              hover:scale-[1.02]
              transition
            "
          >
            Login
          </button>
        </div>

        {/* FOOTER */}
        <div className="rounded-b-2xl bg-black/90 px-6 py-3 text-center text-xs text-gray-400 border-t border-cyan-400/20">
          made by Sachin Kumar
        </div>
      </div>
    </div>
  );
}
