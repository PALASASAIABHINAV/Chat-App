import { useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 bg-blue-600 flex justify-center items-center shadow">
        <h1 className="text-2xl font-bold text-white tracking-wide">Chat App</h1>
      </header>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Sign in to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-blue-700">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type="email"
                  ref={emailRef}
                  className="input input-bordered w-full pl-10 bg-blue-50 focus:bg-white focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-blue-700">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type="password"
                  ref={passwordRef}
                  className="input input-bordered w-full pl-10 bg-blue-50 focus:bg-white focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 border-none text-white" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-blue-400">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
