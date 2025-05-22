// Spinner.jsx
const LoadingSpinner = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[70px] h-[70px] border-[5px] border-gray-300 border-t-blue-900 rounded-full animate-spin" />
        </div>
    );
};

export default LoadingSpinner;
