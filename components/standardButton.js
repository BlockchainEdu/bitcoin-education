export default function StandardButton(props) {

    const buttonColor = () => {
        return `rounded-lg py-4 px-8 font-semibold font-inter transition duration-500 ${props.color === "orange" ? 'bg-benorange-500 hover:bg-benblack-500 text-white' : 'border border-benblack-500 text-benblack-500 hover:text-white hover:bg-benblack-500'}`
    }

    return (
        <a href={props.link} onClick={props.onClick} target={props.target}>
            <button className={`${buttonColor()} ${props.styling}`}>
                {props.text}
            </button>
        </a>
    )
}
