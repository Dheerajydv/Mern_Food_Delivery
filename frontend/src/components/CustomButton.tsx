import { CustomButtonProps } from "../../types/types";

const CustomButton = ({
    title,
    containerStyles,
    handleBtnClick,
    btnType,
}: CustomButtonProps) => {
    return (
        <>
            <button
                disabled={false}
                type={btnType}
                className={`bg-orange-600 cursor-pointer hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ${containerStyles}`}
                onClick={handleBtnClick}
            >
                <span>{title}</span>
            </button>
        </>
    );
};

export default CustomButton;
