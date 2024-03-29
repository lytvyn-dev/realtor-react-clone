//* pages
import GAuth from "../components/GAuth";
//* react
import { useState } from "react";
import { Link, Form, redirect } from "react-router-dom";
//* firebase auth
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
//* react toasts
import { toast } from "react-toastify";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const changeInputHandler = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  return (
    <section>
      <h1 className="text-center text-3xl w-full mt-6 font-bold">Forgot Password</h1>
      <div className="container px-6 py-12 h-full max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center">
          <div className="md:w-[67%] lg:w-[50%]">
            <img
              className="rounded-2xl w-full max-lg:mb-12"
              src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
              alt="keys in hand"
            />
          </div>
          <Form className="md:w-[67%] lg:w-[40%] lg:ml-20" action="/forgot-password" method="POST">
            <input
              className="py-2 px-4 bg-white border-violet-400 border w-full mb-6"
              type="email"
              name="email"
              placeholder="Email address"
              id="email"
              value={email}
              onChange={changeInputHandler}
            />
            <div className="flex flex-col sm:flex-row sm:justify-between whitespace-nowrap text-sm sm:text-lg my-4">
              <p>
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="ml-1 cursor-pointer text-red-600 font-semibold hover:text-red-700"
                >
                  Register
                </Link>
              </p>
              <Link to={"/sign-in"} className="cursor-pointer text-blue-600 hover:text-blue-700">
                Sign in instead
              </Link>
            </div>
            <div className="text-white font-semibold space-y-4 uppercase">
              <button
                className="cursor-pointer bg-blue-600 w-full px-7 py-3 uppercase hover:bg-blue-700 hover:shadow-xl transition ease-in-out duration-300 active:shadow-xl"
                type="submit"
              >
                Send reset email
              </button>
              <span className="form--span">OR</span>
              <GAuth />
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;

export const action = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get("email");
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    toast.success("Password was send to your email!", {
      autoClose: 3000,
      position: "bottom-center",
    });
    return redirect("/sign-in");
  } catch (error) {
    toast.error("Could not send new password!", {
      position: "bottom-center",
    });
    return null;
  }
};
