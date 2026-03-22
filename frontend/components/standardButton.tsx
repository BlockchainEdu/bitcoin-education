import { useRouter } from "next/router";

export default function StandardButton(props) {
  const router = useRouter();

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

  const handleClick = (e) => {
    if (props.onClick) {
      props.onClick(e);
    }
    if (props.link) {
      router.push(props.link);
    }
  };

  return (
    <span
      onClick={handleClick}
      className={`${props.linkStyling || ""} cursor-pointer`}
    >
      <button className={`${buttonStyle()} ${props.styling || ""}`}>
        {props.text}
      </button>
    </span>
  );
}
