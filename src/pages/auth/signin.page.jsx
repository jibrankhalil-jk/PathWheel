import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../../common/session";



const SignIn = () => {

  let { userAuth: { access_token }, setuserAuth } = useContext(UserContext);

  const handelSubmit = async (e) => {
    e.preventDefault();
    let form = new FormData(signInForm);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    console.log(formData);

    let { email, password } = formData;

    if (!email.length) {
      return toast.error("Enter email");
    }
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (password.length < 3) {
      return toast.error("Invalid Password");
    }

    await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/signin", formData)
      .then(({ data }) => {
        toast.success("SignIn successful");
        storeInSession("user", JSON.stringify(data));
        setuserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });

  }

  return (
    access_token ?
      <Navigate to="/pathwheel" /> :
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <Toaster />
        <div className="md:w-1/3 max-w-sm">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image" />
        </div>
        <div className="md:w-1/3 max-w-sm">
          <div className="text-center md:text-left">
            <h3 className="mr-1 mb-10 text-2xl">SignIn</h3>

          </div>
          <form id="signInForm">
            <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" name="email" placeholder="Email Address" />
            <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" name="password" placeholder="Password" />
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
              <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
            </div>
            <div className="text-center md:text-left">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
                onClick={handelSubmit}
              >Login</button>
            </div>
          </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don't have an account?
            <Link to="/signup">
              <span className="text-red-600 hover:underline hover:underline-offset-4" href="#">Register</span>
            </Link>
          </div>
        </div>
      </section>

  );
};

export default SignIn;