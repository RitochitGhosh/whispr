import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const firestore = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const GetStarted: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const toggleMode = (): void => {
    setIsSignUp((prevMode) => !prevMode);
  };

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(firestore, "users", user.uid), {
        messages: [],
      });

      Swal.fire({
        title: "Success",
        text: `Google sign-in successful! Welcome, ${user.email}`,
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/");
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: `Google sign-in failed: ${error.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (isSignUp) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(firestore, "users", user.uid), {
          messages: [],
        });

        Swal.fire({
          title: "Success",
          text: `Sign-up successful! Welcome, ${userCredential.user.email}`,
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: `Sign-up failed: ${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        Swal.fire({
          title: "Success",
          text: `Sign-in successful! Welcome back, ${userCredential.user.email}`,
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: `Sign-in failed: ${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-1 text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <button
            onClick={signUpWithGoogle}
            className="w-full border-2 border-indigo-600 transition text-gray-600 hover:text-black py-2 rounded"
          >
            Authenticate Using Google
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account yet?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-indigo-500 hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
