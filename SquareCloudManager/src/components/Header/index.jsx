import { Link } from "react-router-dom";
import "./header.scss";
export default function Header() {
  return (
    <div className="header-container">
      <Link to={"/"}>
        <img src="logo.webp" alt="" />
      </Link>
    </div>
  );
}
