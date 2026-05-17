import { Link } from "react-router-dom";

const AppLayout = ({ children }: any) => {
  const role = localStorage.getItem("role");

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        {/* TOP SECTION */}
        <div className="sidebar-top">

          <div>

            <h1 className="logo">
              Smart CRM
            </h1>

            <p className="sidebar-role">
              {role?.toUpperCase()}
            </p>

          </div>

          {/* LOGOUT */}
          <button
            className="sidebar-logout"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>

        </div>

        {/* NAVIGATION */}
        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className="nav-link"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/analytics"
            className="nav-link"
          >
            📈 Analytics
          </Link>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="layout-content">
        {children}
      </main>

    </div>
  );
};

export default AppLayout;