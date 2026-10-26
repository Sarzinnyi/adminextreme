import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FiArrowUpRight, FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { Acontext } from "../Auth/Acontext";
import "../../styles/Setting/Setting.css";
export default function Setting() {
  const context = useContext(Acontext);
  const [error, setError] = useState("");
  return (
    <div className="setting">
      <h4>Workspace settings</h4>
      <section className="settingwrap">
        <Link className="settingnav" to="/setting/userprofile">
          <span>
            <FiUser /> Account profile
          </span>
          <FiArrowUpRight />
        </Link>
        <Link className="settingnav" to="/setting/generalsetting">
          <span>
            <FiSettings /> General settings
          </span>
          <FiArrowUpRight />
        </Link>
        <button
          className="settingnav"
          onClick={async () => {
            try {
              await context?.logout();
            } catch {
              setError("Unable to sign out. Please try again.");
            }
          }}
        >
          <span>
            <FiLogOut /> Sign out of workspace
          </span>
          <FiArrowUpRight />
        </button>
        {error && <p role="alert">{error}</p>}
      </section>
    </div>
  );
}
