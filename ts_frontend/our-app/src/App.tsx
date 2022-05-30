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
import SeznamPsov from './SeznamPsov';
import SeznamCourse from './SeznamCourse';
function App() {

  const [seznamPsov, setSeznamPsov] = React.useState<Pes[]>([]);
  const [seznamCourses, setSeznamCourses] = React.useState<Course[]>([]);

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

  return (
    <Router>
      <div className = "App">
        <Routes>

          <Route path='/' element ={<SeznamPsov seznam = {seznamPsov} />} />
        
          <Route path='/dodajPsa' element={<DodajPsa onAdd={handleDodajPsa}/>} />
          
          <Route path='/dodajCourse' element={<DodajCourse onAdd={handleDodajCourse}/>} />

          <Route path='/seznamCourse' element={<SeznamCourse/>} />

          <Route path="/404" element={<h2>404 - Not found</h2>}/>

          <Route  path="*" element={<Navigate to="/404"/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
