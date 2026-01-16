import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import Monk from "../assets/monk.png";
import Cloud from "../assets/cloud.png";
import { SparklesCore } from "@/components/ui/sparkles";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";

const TRANSITION_DURATION_MS = 300;

const Auth = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={10}
        className="w-full h-full absolute -z-40"
      />
      <div className="py-10 px-5 xl:px-0 flex gap-10 flex-col h-dvh max-w-7xl mx-auto">
        <Header />
        <Main />
      </div>
    </div>
  );
};

const Main = () => {
  const [visibleBlock, setVisibleBlock] = useState("left");
  const { clearError } = useAuthStore();

  return (
    <main className="flex flex-1 items-center xl:px-20">
      <div className="w-full bg-primary/5 backdrop-blur-xs rounded-4xl border overflow-hidden">
        {/* Sliding strip */}
        <div
          className="flex transition-transform ease-in-out w-[200%] lg:w-[150%]"
          style={{
            transitionDuration: `${TRANSITION_DURATION_MS}ms`,
            transform:
              visibleBlock === "left"
                ? "translateX(0%)"
                : window.innerWidth >= 1024
                ? "translateX(-33.3333%)"
                : "translateX(-50%)",
          }}
        >
          {/* Login */}
          <div className="w-1/2 lg:w-1/3 flex flex-col justify-center p-20">
            <h2 className="font-jomolhari text-lg">Welcome Back!</h2>
            <h2 className="font-jomhuria text-3xl opacity-80 mt-2">
              Find your inner
            </h2>
            <h2 className="font-jomhuria text-9xl -mt-7">PEACE</h2>

            <LoginForm />

            <p className="font-jomolhari mt-5 text-center">
              Don&apos;t have an account?{" "}
              <span
                className="font-bold border-b cursor-pointer"
                onClick={() => {
                  clearError();
                  setVisibleBlock("right");
                }}
              >
                Sign Up
              </span>
            </p>
          </div>

          {/* Monk */}
          <div className="w-1/3 justify-center items-center border-x hidden lg:flex">
            <div className="relative">
              <div className="absolute w-full flex justify-center -z-20">
                <img className="w-80" src={Cloud} />
              </div>
              <img className="w-full" src={Monk} />
            </div>
          </div>

          {/* Register */}
          <div className="w-1/2 lg:w-1/3 p-20 flex flex-col justify-center">
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
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
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
    <div className="border-b-2 pb-5 -mt-5">
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
    <div className="border-b-2 pb-5 -mt-5">
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
