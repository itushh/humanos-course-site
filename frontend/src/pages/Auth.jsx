import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import Monk from "../assets/monk.png";
import Cloud from "../assets/cloud.png";
import { SparklesCore } from "@/components/ui/sparkles";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const ANIMATION_DURATIONS_SEC = 0.5;

const Auth = () => {
  const [visibleBlock, setVisibleBlock] = useState("left");
  const { isAuthenticated, clearError } = useAuthStore();

  if(isAuthenticated) {
    return (
      <Navigate to="/" />
    )
  }

  return (
    <div className="flex flex-col h-dvh">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={25}
        className="w-full h-full absolute -z-40"
        particleColor="#FFFFFF"
      />
      <header className="flex justify-center w-full py-10 fixed">
        <img src="/logo.svg" className="w-32" />
      </header>
      <main className="px-120 flex flex-1 items-center">
        <div className="w-full bg-white/2 backdrop-blur-xs flex p-20 rounded-md items-center">
          {/* Left */}
          <div
            className="overflow-hidden text-nowrap ease-in-out"
            style={{
              transitionDuration: `${ANIMATION_DURATIONS_SEC}s`,
              width: visibleBlock === "left" ? "100%" : "0px",
            }}
          >
            <h2 className="font-jomolhari text-lg">Welcome Back!</h2>
            <h2 className="font-jomhuria text-3xl opacity-80 mt-2">
              Find your inner
            </h2>
            <h2 className="font-jomhuria text-9xl -mt-7">PEACE</h2>
            <LoginForm />
            <p className="font-jomolhari mt-5 text-center">
              Don't have an account?{" "}
              <span
                className="font-bold border-b cursor-pointer"
                onClick={() => {
                  clearError();
                  setVisibleBlock("right");
                }}
              >
                {" "}
                Sign Up
              </span>
            </p>
          </div>

          {/* Middle */}
          <div className="w-5xl relative">
            <div className="absolute w-full flex justify-center -z-20">
              <img className="w-80" src={Cloud} />
            </div>
            <img className="w-full" src={Monk} />
          </div>

          {/* Right */}
          <div
            className="overflow-hidden text-nowrap ease-in-out"
            style={{
              transitionDuration: `${ANIMATION_DURATIONS_SEC}s`,
              width: visibleBlock === "right" ? "100%" : "0px",
            }}
          >
            <h2 className="font-jomolhari text-lg">Welcome!</h2>
            <h2 className="font-jomhuria text-3xl opacity-80 mt-2">
              Find your inner
            </h2>
            <h2 className="font-jomhuria text-9xl -mt-7">PEACE</h2>
            <RegistrationForm />
            <p className="font-jomolhari mt-5 text-center">
              Already have an account?{" "}
              <span
                className="font-bold border-b cursor-pointer"
                onClick={() => {
                  clearError();
                  setVisibleBlock("left");
                }}
              >
                {" "}
                Log In
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { login, error } = useAuthStore();

  const handleSubmit = () => {
    login(loginData);
  };

  return (
    <div className="border-b-2 pb-5">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="border-2 flex gap-3 items-center px-3 py-2 rounded-xs mt-3">
        <Mail size={18} />
        <input
          type="email"
          value={loginData.email}
          placeholder="Email Address"
          autoComplete="new-password"
          className="font-jomolhari border-0 outline-0 w-full"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
      </div>
      <div className="border-2 flex gap-3 items-center px-3 py-2 rounded-xs mt-3">
        <Lock size={18} />
        <input
          type="password"
          value={loginData.password}
          placeholder="Password"
          autoComplete="new-password"
          className="font-jomolhari border-0 outline-0 w-full"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
      </div>
      <p className="font-jomolhari text-sm mt-1 text-muted-foreground">
        Forgot Password?
      </p>
      <div
        className="border-2 font-jomolhari bg-green-700 px-3 py-2 rounded-xs text-center mt-5"
        onClick={handleSubmit}
      >
        Login
      </div>
    </div>
  );
};

const RegistrationForm = () => {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, error } = useAuthStore();

  const handleSubmit = () => {
    register(registrationData);
  };

  return (
    <div className="border-b-2 pb-5">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="border-2 flex gap-3 items-center px-3 py-2 rounded-xs mt-3">
        <User size={18} />
        <input
          type="text"
          value={registrationData.name}
          placeholder="Full Name"
          autoComplete="new-password"
          className="font-jomolhari border-0 outline-0 w-full"
          onChange={(e) =>
            setRegistrationData({ ...registrationData, name: e.target.value })
          }
        />
      </div>
      <div className="border-2 flex gap-3 items-center px-3 py-2 rounded-xs mt-3">
        <Mail size={18} />
        <input
          type="email"
          value={registrationData.email}
          placeholder="Email Address"
          autoComplete="new-password"
          className="font-jomolhari border-0 outline-0 w-full"
          onChange={(e) =>
            setRegistrationData({ ...registrationData, email: e.target.value })
          }
        />
      </div>
      <div className="border-2 flex gap-3 items-center px-3 py-2 rounded-xs mt-3">
        <Lock size={18} />
        <input
          type="password"
          value={registrationData.password}
          placeholder="Password"
          autoComplete="new-password"
          className="font-jomolhari border-0 outline-0 w-full"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              password: e.target.value,
            })
          }
        />
      </div>
      <div
        className="border-2 font-jomolhari bg-green-700 px-3 py-2 rounded-xs text-center mt-5"
        onClick={handleSubmit}
      >
        Sign Up
      </div>
    </div>
  );
};

export default Auth;
