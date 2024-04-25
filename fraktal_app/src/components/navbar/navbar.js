import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';  // Assurez-vous que vos styles sont correctement liés



export default function Navbar() {
  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");

    const toggleSidebar = () => {
      sidebar.classList.toggle("open");
      menuBtnChange();
    };

    if (closeBtn && searchBtn) {
      closeBtn.addEventListener("click", toggleSidebar);
      searchBtn.addEventListener("click", toggleSidebar);

      // Cleanup function to remove event listeners
      return () => {
        closeBtn.removeEventListener("click", toggleSidebar);
        searchBtn.removeEventListener("click", toggleSidebar);
      };
    }
  }, []);

  function menuBtnChange() {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }

  


  return (
    <React.Fragment>
    <div className="sidebar">
      <div className="logo-details">
        <i className='bx bxl-codepen icon'></i>
        <div className="logo_name">FRAKTAL</div>
        <i className='bx bx-menu' id="btn"></i>
      </div>
      <ul className="nav-list">
        <li>
          <i className='bx bx-search'></i>
          <input type="text" placeholder="Rechercher..."/>
          <span className="tooltip">Rechercher</span>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-grid-alt'></i>
            <span className="links_name">Dashboard</span>
          </a>
          <span className="tooltip">Dashboard</span>
        </li>
        <li>
        <Link to="/connexion" className="nav-link">
            <i className='bx bx-user'></i>
            <span className="links_name">Connexion</span>
        </Link>

          <span className="tooltip">Connexion</span>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-chat'></i>
            <span className="links_name">Messages</span>
          </a>
          <span className="tooltip">Messages</span>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-pie-chart-alt-2'></i>
            <span className="links_name">Analytics</span>
          </a>
          <span className="tooltip">Analytics</span>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-folder'></i>
            <span className="links_name">File Manager</span>
          </a>
          <span className="tooltip">Files</span>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-cart-alt'></i>
            <span className="links_name">Order</span>
          </a>
          <span className="tooltip">Order</span>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-heart'></i>
            <span className="links_name">Saved</span>
          </a>
          <span className="tooltip">Saved</span>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-cog'></i>
            <span className="links_name">Setting</span>
          </a>
          <span className="tooltip">Setting</span>
        </li>
        <li className="profile">
          <div className="profile-details">
            <i className='bx bx-export'></i>
            <div className="name_job">
              <div className="name">Logout</div>
            </div>
          </div>
          <i className='bx bx-log-out' id="log_out"></i>
        </li>
      </ul>
    </div>
    </React.Fragment>
  );
}
