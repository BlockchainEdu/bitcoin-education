export default function StandardButton(props) {
  const buttonStyle = () => {
    const forceWhiteText = props.textColor === "white";

    return `
      rounded-lg py-4 px-8
      font-semibold font-inter
      transition duration-500
      ${
        props.color === "orange"
          ? "bg-benorange-500 hover:bg-benblack-500"
          : "border border-benblack-500 hover:bg-benblack-500"
      }
      ${forceWhiteText ? "text-white" : "text-benblack-500 hover:text-white"}
    `;
  };

  return (
    <a
      href={props.link}
      onClick={props.onClick}
      target={props.target}
      className={props.linkStyling}
    >
      <button className={`${buttonStyle()} ${props.styling || ""}`}>
        {props.text}
      </button>
    </a>
  );
}
