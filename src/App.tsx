import React, { Fragment } from 'react';
import './App.css';
import Header from './componetes/Header';
import Footer from './componetes/Footer';
import Obtener from './funciones/obtener';
import Crear from './funciones/crear';
import { ApiProvider } from './context/ApiContext';
import Sidebar from './componetes/Sidebar';



function App() {
  return (
    <ApiProvider>
    <div className='app'>
        <section className='conatiner-md'>
        
          <Header></Header>
          <Sidebar></Sidebar>
          <Obtener />
          <Crear/>
          
          <Footer></Footer>
          
        </section>
    </div>
    </ApiProvider>

  );
}

export default App;
