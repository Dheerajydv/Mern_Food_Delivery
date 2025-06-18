import { CustomInputBoxProps } from "../../types/types";

const CustomInputBox = ({
    inputType,
    inputStyles,
    placeHolder,
    label,
    inputValue,
    onChangeFunction,
}: CustomInputBoxProps) => {
    return (
        <div className="flex-center">
            <input
                id="inputBox"
                value={inputValue}
                type={inputType}
                placeholder={placeHolder}
                onChange={onChangeFunction}
                className={`border mx-4 border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${inputStyles}`}
            />
            <label htmlFor="inputBox">{label}</label>
        </div>
    );
};

export default CustomInputBox;
