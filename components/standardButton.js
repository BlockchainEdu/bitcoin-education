export default function StandardButton(props) {

    const buttonColor = () => {
        return `text-xl rounded-full py-4 font-bold transition duration-500 ${props.color === "orange" ? 'shadow-button bg-benorange-500 hover:bg-bengrey-300 text-white' : 'border text-benblack-500 hover:text-white hover:bg-bengrey-300'}`
    }

    return (
        <a href={props.link} onClick={props.onClick}>
            <button className={`${buttonColor()} ${props.styling}`}>
                {props.text}
            </button>
        </a>
    )
}
