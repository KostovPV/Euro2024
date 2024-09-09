import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate();
  return (
    <nav className="header">
         <h1 className='header-title'>UEFA Euro 2024 Results</h1>
         <div className="header-links">
          <ul >
            <li className="header-links-box"> <button className="btn" onClick={()=> navigate('/')}>To Kick off stage</button></li>
            <li className="header-links-box"> <button className="btn" onClick={()=> navigate('/group-stage')}>To Group stage</button></li>
          </ul>
         
         
         </div>
    </nav>
  )
}
