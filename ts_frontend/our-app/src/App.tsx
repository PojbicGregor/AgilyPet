import React from 'react';
import './App.css';

import {Routes} from 'react-router-dom';     //TO JE NAMESTO SWITCH
import {Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';   //TO JE NAMESTO REDIRECT
import {BrowserRouter as Router} from 'react-router-dom';

import DodajPsa from './DodajPsa';
import DodajCourse from './DodajCourse';
import {Pes} from './razredi/Pes';
import {Course} from './razredi/Course';
import { Uporabnik } from './razredi/Uporabnik';
import SeznamPsov from './SeznamPsov';
import Osnovna from './komponente/Osnovna';
import Registracija from './komponente/Registracija';
import Prijava from './komponente/Prijava';
import Dogodki from './komponente/Dogodki';
import DodajEvent from './DodajEvent';
import {Event} from './razredi/Event';
import VsedDogodke from './komponente/VseDogodke';

import SeznamCourse from './SeznamCourse';
function App() {

  const [seznamPsov, setSeznamPsov] = React.useState<Pes[]>([]);
  const [seznamCourses, setSeznamCourses] = React.useState<Course[]>([]);
  const [seznamEvents, setSeznamEvents] = React.useState<Event[]>([]);

  const handleDodajPsa = (pes: Pes) => {
    let nov = Array.from(seznamPsov);
    nov.push(pes);
    setSeznamPsov(nov);
  }
  const handleDodajCourse = (course: Course) => {
    let nov = Array.from(seznamCourses);
    nov.push(course);
    setSeznamCourses(nov);
  }

  const handleDodajEvent = (event: Event) => {
    let nov = Array.from(seznamEvents);
    nov.push(event);
    setSeznamEvents(nov);
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

          <Route path="/dogodki" element={<Dogodki></Dogodki>} />

          <Route path="/registracija" element={<Registracija onAdd={handleRegistracija}></Registracija>} />

          <Route path="/prijava" element={<Prijava onAdd={handlePrijava}></Prijava>} />

          <Route path='/psi' element ={<SeznamPsov seznam = {seznamPsov} />} />
        
          <Route path='/dodajPsa' element={<DodajPsa onAdd={handleDodajPsa}/>} />
          
          <Route path='/vseDogodkev' element={<VsedDogodke  />} />

          <Route path='/dodajCourse' element={<DodajCourse onAdd={handleDodajCourse}/>} />

          <Route path='/dodajEvent' element={<DodajEvent onAdd={handleDodajEvent}/> } />
          <Route path='/seznamCourse' element={<SeznamCourse/>} />

          <Route path="/404" element={<h2>404 - Not found</h2>}/>

          <Route  path="*" element={<Navigate to="/404"/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
