import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="header">
      <h1 className="header-title">UEFA Euro 2024 Results</h1>
      <div className="header-links">
        <ul>
          <li className="header-links-box">
            <button
              className={`btn ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => navigate('/')}
            >
              To Kick off stage
            </button>
          </li>
          <li className="header-links-box">
            <button
              className={`btn ${location.pathname === '/group-stage' ? 'active' : ''}`}
              onClick={() => navigate('/group-stage')}
            >
              To Group stage
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
