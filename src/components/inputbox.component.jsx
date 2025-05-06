import { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon, disable = false }) => {
    const [passwordVisibility, setpasswordVisibility] = useState(false);
    return (
        <div className="relative w-[100%] mb-4" >
            <input
                name={name}
                type={type == 'password' ? passwordVisibility ? 'text' : 'password' : type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box"
                disabled={disable} />
            <i className={'fi input-icon ' + icon} ></i>
            {
                type == 'password' ?
                    <i
                        onClick={() => setpasswordVisibility(currentvalue => !currentvalue)}
                        className={'fi fi-rr-eye' + (passwordVisibility ? '-crossed' : '') + ' input-icon left-[auto] right-6 cursor-pointer'}
                    ></i>
                    : ""
            }
        </div>
    );
}

export default InputBox;