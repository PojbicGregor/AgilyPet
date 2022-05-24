import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Routes} from 'react-router-dom';     //TO JE NAMESTO SWITCH
import {Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';   //TO JE NAMESTO REDIRECT
import {BrowserRouter as Router} from 'react-router-dom';

import DodajPsa from './DodajPsa';
import {Pes} from './razredi/Pes';
import { Uporabnik } from './razredi/Uporabnik';
import SeznamPsov from './SeznamPsov';
import Osnovna from './komponente/Osnovna';
import Registracija from './komponente/Registracija';
import Prijava from './komponente/Prijava';

function App() {

  const [seznamPsov, setSeznamPsov] = React.useState<Pes[]>([]);

  const handleDodajPsa = (pes: Pes) => {
    let nov = Array.from(seznamPsov);
    nov.push(pes);
    setSeznamPsov(nov);
  }

  // spremeni handle
  const handleRegistracija = (uporabnik: Uporabnik) => {
    console.log(uporabnik);
  }

  // spremeni handle
  const handlePrijava = (uporabnik: Uporabnik) => {
    console.log(uporabnik);
  }


  return (
    <Router>
      <div className = "App">
        <Routes>

          <Route path="/" element={<Osnovna></Osnovna>} />

          <Route path="/registracija" element={<Registracija onAdd={handleRegistracija}></Registracija>} />

          <Route path="/prijava" element={<Prijava onAdd={handlePrijava}></Prijava>} />

          <Route path='/psi' element ={<SeznamPsov seznam = {seznamPsov} />} />
        
          <Route path='/dodajPsa' element={<DodajPsa onAdd={handleDodajPsa}/>} />

          <Route path="/404" element={<h2>404 - Not found</h2>}/>

          <Route  path="*" element={<Navigate to="/404"/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
