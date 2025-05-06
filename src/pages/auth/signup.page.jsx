import axios from "axios";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { storeInSession } from "../../common/session";
import { UserContext } from "../../App";
import { useContext } from "react";



const SignUp = () => {


    let { userAuth: { access_token }, setuserAuth } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData(signUpForm);
        let formData = {};
        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        let { fullname, email, password } = formData;

        console.log(formData);

        if (fullname.length < 3) {
            return toast.error("Full name must be 3 letters long");
        }

        if (!email.length) {
            return toast.error("Enter email");
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid");
        }

        if (!passwordRegex.test(password)) {
            return toast.error("Password shoud be 6 to 20 characters long with a numeric, 1 upper and lower and uppercase letters.");
        }

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/signup", formData)
            .then(({ data }) => {
                toast.success("SignUp successful");
                storeInSession("user", JSON.stringify(data));
                setuserAuth(data);
            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            });
    }

    return (
        access_token ?
            <Navigate to="/pathwheel" /> :
            <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                <Toaster />
                <form id="signUpForm" className="md:w-1/3 max-w-sm">
                    <div className="text-center md:text-left">
                        <h3 className="mr-1 mb-10 text-2xl">SignUp</h3>

                    </div>
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" name="fullname" placeholder="Full Name" />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="text" name="email" placeholder="Email Address" />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" name="password" placeholder="Password" />

                    <div className="text-center md:text-left">
                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                            onClick={handleSubmit}
                            type="submit"
                        >SignUp</button>
                    </div>
                    <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                        Already a member?
                        <Link to="/signin">
                            <span className="text-purple-800 hover:underline hover:underline-offset-4">SignIn</span>
                        </Link>
                    </div>
                </form>
                <div className="md:w-1/3 max-w-sm">
                    <img
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        alt="Sample image" />
                </div>
            </section>

    );
};

export default SignUp;