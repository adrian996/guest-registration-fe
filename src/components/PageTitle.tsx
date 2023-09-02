import headimage from "../assets/libled_cropped.jpg";
import "./PageTitle.css";

export default function PageTitle(props: { value: string }) {
  const title = props.value;

  return (
    <>
      <div className="title_wrapper">
        <div>{title}</div>
        <img src={headimage} alt="" />
      </div>
    </>
  );
}
