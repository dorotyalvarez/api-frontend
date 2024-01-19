import React from 'react';


const Header: React.FC = () => {
  return (
    <header>
      <div className='logo'> logo</div>
      <div className='bars'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      
      </div>
      
    <nav className='nav-bar'>
      <ul>
        <li>
          <a href="#" className='active'>INICIO</a>
        </li>
        <li>
          <a href="#" >INFORMACION</a>
        </li>
        <li>
          <a href="#" >PORTAFOLIO</a>
        </li>
        <li>
          <a href="#" >CONTACTO</a>
        </li>
      </ul>

    </nav>
    </header>
 
  );
};
export default Header;