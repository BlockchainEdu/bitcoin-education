export default function StandardButton(props) {

    const buttonColor = () => {
        return `text-xl rounded-full py-4 font-bold shadow-button transition duration-500 ${props.color === "orange" ? 'bg-benorange-500 hover:bg-bengrey-300 text-white' : 'border text-benblack-500 hover:text-white hover:bg-bengrey-300'}`
    }

    return (
        <button className={`${buttonColor()} ${props.styling}`}>
            {props.text}
        </button>
    )
}
