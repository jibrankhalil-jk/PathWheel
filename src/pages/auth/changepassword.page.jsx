import { useContext, useRef } from "react";
import InputBox from "../../components/inputbox.component";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../App";



const ChangePassword = () => {


    let ChangePasswordForRef = useRef(null);

    let { userAuth: { access_token } } = useContext(UserContext);


    // const handelSubmit = async (e) => {
    //     e.preventDefault();
    //     let form = new FormData(ChangePasswordForRef.current);
    //     let formData = {};
    //     for (let [key, value] of form.entries()) {
    //         formData[key] = value;
    //     }

    //     let { currentPassword, newPassword } = formData;

    //     if (!currentPassword.length || !newPassword.length) {
    //         return toast.error("Please fill all fields");
    //     }

    //     let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    //     if (!passwordRegex.test(currentPassword) || !passwordRegex.test(newPassword)) {
    //         return toast.error("Password must be 6 to 20 characters long and contain at least one numeric digit, one uppercase and one lowercase letter");
    //     }

    //     e.target.setAttribute("disabled", "true");

    //     let loadingToast = toast.loading("Updating password...");

    //     await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/change-password",
    //         formData, {
    //         headers: { authorization: `Bearer ${access_token}` }
    //     })
    //         .then(() => {
    //             toast.dismiss(loadingToast);
    //             e.target.removeAttribute("disabled");
    //             return toast.success("Password updated successfully");
    //         })
    //         .catch((response) => {
    //             toast.dismiss(loadingToast);
    //             e.target.removeAttribute("disabled");
    //             // return toast.error(response.data.message);
    //             console.log(response);
    //             return toast.error("error ");

    //         })





    // }

    const handelSubmit = async (e) => {

    }

    return (

        <>
            <Toaster />
            <form ref={ChangePasswordForRef}>
                <h1 className="max-md:hidden ">Change Password</h1>

                <div className="py-10 w-full md:max-w-[400px]">
                    <InputBox
                        name="currentPassword"
                        type="password"
                        className="profile-edit-input"
                        placeholder="Current Password"
                        icon="fi-rr-lock"
                    />
                    <InputBox
                        name="newPassword"
                        type="password"
                        className="profile-edit-input"
                        placeholder="New Password"
                        icon="fi-rr-lock"
                    />

                    <button
                        onClick={handelSubmit}
                        className="whitespace-nowrap bg-black text-white rounded-full py-3 text-xl capitalize hover:bg-black/80 px-10">
                        Change Password
                    </button>
                </div>

            </form>


        </>
    );
}

export default ChangePassword;