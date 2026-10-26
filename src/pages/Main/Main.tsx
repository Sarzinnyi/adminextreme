import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useContext, useState } from "react";
import {
  FiArrowUpRight,
  FiBox,
  FiChevronDown,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiLayers,
  FiLogOut,
  FiMenu,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiSliders,
  FiClock,
} from "react-icons/fi";
import { Acontext } from "../Auth/Acontext";
import "../../styles/Main/Main.css";
const destinations = [
  { label: "Overview", to: "/dashboard", icon: FiGrid },
  { label: "Clothes", to: "/clothes", icon: FiShoppingBag },
  { label: "Watches", to: "/watches", icon: FiClock },
  { label: "Orders", to: "/orders", icon: FiBox },
  { label: "Stock in", to: "/history/instock", icon: FiLayers },
  { label: "Stock out", to: "/history/outstock", icon: FiLayers },
  { label: "Add clothes", to: "/addnew/clothes", icon: FiPlus },
  { label: "Add watches", to: "/addnew/watches", icon: FiPlus },
  { label: "Brands", to: "/specification/addbrand", icon: FiSliders },
  { label: "Colors", to: "/specification/addcolor", icon: FiSliders },
  { label: "Payments", to: "/topup", icon: FiCreditCard },
  { label: "Settings", to: "/setting", icon: FiSettings },
];
export default function Main() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(Acontext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Products: true,
  });
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const current =
    destinations.find((item) => item.to === pathname.toLowerCase())?.label ||
    "Store workspace";
  const userName = authContext?.auth?.name || "Store administrator";
  const results = destinations.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );
  const go = (to: string) => {
    navigate(to);
    setSearchOpen(false);
    setQuery("");
    setMobileOpen(false);
    setProfileOpen(false);
  };
  const item = (to: string, label: string, Icon: typeof FiGrid) => (
    <NavLink
      key={to}
      to={to}
      onClick={() => setMobileOpen(false)}
      className={({ isActive }) => `sidebar-link${isActive ? " selected" : ""}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
  const group = (
    label: string,
    Icon: typeof FiGrid,
    children: [string, string][],
  ) => {
    const active = children.some(([to]) => pathname.startsWith(to));
    return (
      <div className="nav-group">
        <button
          className={`sidebar-link group-toggle${active ? " group-active" : ""}`}
          aria-expanded={!!expanded[label]}
          onClick={() =>
            setExpanded({ ...expanded, [label]: !expanded[label] })
          }
        >
          <Icon size={18} />
          <span>{label}</span>
          <FiChevronDown className={expanded[label] ? "rotated" : ""} />
        </button>
        {expanded[label] && (
          <div className="nav-children">
            {children.map(([to, text]) => item(to, text, FiArrowUpRight))}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="workspace">
      {mobileOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`sidebar${mobileOpen ? " is-open" : ""}`}
        aria-label="Main navigation"
      >
        <Link
          className="brand"
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
        >
          <span className="brand-mark">
            e<span>×</span>
          </span>
          <span>
            extreme<span className="brand-caption">COMMERCE STUDIO</span>
          </span>
        </Link>
        <div className="workspace-label">
          <span className="store-dot" />
          Extreme Men <span className="workspace-badge">Admin</span>
        </div>
        <nav className="sidebar-nav">
          <p className="nav-caption">WORKSPACE</p>
          {item("/dashboard", "Overview", FiGrid)}
          {group("Products", FiShoppingBag, [
            ["/clothes", "Clothes"],
            ["/watches", "Watches"],
          ])}
          {item("/orders", "Orders", FiBox)}
          {group("Inventory", FiLayers, [
            ["/history/instock", "Stock in"],
            ["/history/outstock", "Stock out"],
          ])}
          {item("/topup", "Payments", FiCreditCard)}
          <p className="nav-caption second-caption">MANAGE</p>
          {group("Add products", FiPlus, [
            ["/addnew/clothes", "Clothes"],
            ["/addnew/watches", "Watches"],
          ])}
          {group("Specifications", FiSliders, [
            ["/specification/addbrand", "Brands"],
            ["/specification/addcolor", "Colors"],
          ])}
          {item("/setting", "Settings", FiSettings)}
        </nav>
        <div className="sidebar-bottom">
          <div className="studio-note">
            <span className="note-icon">
              <FiShoppingBag />
            </span>
            <strong>
              A little more organized.
              <br />A lot more possibility.
            </strong>
            <p>Your next best seller starts here.</p>
            <Link to="/addnew/clothes" onClick={() => setMobileOpen(false)}>
              Create a product <FiArrowUpRight />
            </Link>
          </div>
          <div className="sidebar-footer">
            <span className="store-dot" /> Your store. Your next chapter.
          </div>
        </div>
      </aside>
      <div className="workspace-body">
        <header className="topbar">
          <div className="topbar-leading">
            <button
              className="icon-button menu-button"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu size={21} />
            </button>
            <span className="breadcrumb">
              Workspace <span>/</span> <strong>{current}</strong>
            </span>
          </div>
          <div className="topbar-actions">
            <div className="workspace-search">
              <FiSearch size={17} />
              <input
                aria-label="Search pages"
                placeholder="Search your workspace…"
                value={query}
                onFocus={() => setSearchOpen(true)}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSearchOpen(true);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setSearchOpen(false);
                  if (event.key === "Enter" && results[0]) go(results[0].to);
                }}
              />
              <kbd>↵</kbd>
              {searchOpen && (
                <>
                  <button
                    className="popover-dismiss"
                    tabIndex={-1}
                    aria-label="Close search"
                    onClick={() => setSearchOpen(false)}
                  />
                  <div className="search-results">
                    <p>GO TO A PAGE</p>
                    {results.length ? (
                      results.map((result) => (
                        <button key={result.to} onClick={() => go(result.to)}>
                          <result.icon size={16} />
                          {result.label}
                          <FiArrowUpRight />
                        </button>
                      ))
                    ) : (
                      <span className="no-results">
                        No matching pages. Try “orders”.
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="topbar-popover">
              <button
                className="icon-button help-button"
                aria-label="Workspace help"
                aria-expanded={helpOpen}
                onClick={() => {
                  setHelpOpen(!helpOpen);
                  setProfileOpen(false);
                }}
              >
                <FiHelpCircle size={20} />
              </button>
              {helpOpen && (
                <div className="header-popover">
                  <strong>Your workspace, at a glance</strong>
                  <p>
                    Manage your catalog in Products, follow purchases in Orders,
                    and track stock movements in Inventory.
                  </p>
                  <button onClick={() => setHelpOpen(false)}>Got it</button>
                </div>
              )}
            </div>
            <span className="topbar-divider" />
            <div className="topbar-popover">
              <button
                className="profile-button"
                aria-label="Account menu"
                aria-expanded={profileOpen}
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setHelpOpen(false);
                }}
              >
                <span className="avatar">
                  {userName.charAt(0).toUpperCase()}
                </span>
                <span className="profile-copy">
                  <strong>{userName}</strong>
                  <small>Store admin</small>
                </span>
                <FiChevronDown size={14} />
              </button>
              {profileOpen && (
                <div className="header-popover account-popover">
                  <button onClick={() => go("/setting/userprofile")}>
                    <FiSettings />
                    My profile
                  </button>
                  <button
                    onClick={async () => {
                      setLogoutError("");
                      try {
                        await authContext?.logout();
                      } catch {
                        setLogoutError("Unable to sign out. Please try again.");
                      }
                    }}
                  >
                    <FiLogOut />
                    Sign out
                  </button>
                  {logoutError && <p role="alert">{logoutError}</p>}
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="mainoutlet">
          <Outlet />
        </main>
        <footer className="workspace-footer">
          <span>© {new Date().getFullYear()} Extreme Men</span>
          <span>
            Made for the way you work. <span className="footer-spark">✳</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
