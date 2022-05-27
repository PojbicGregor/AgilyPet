import React from 'react';
import {ChangeEvent} from 'react';
import {FormEvent} from 'react';
import {Course} from './razredi/Course';
import { Link } from 'react-router-dom';
//import Menu from './Menu';

interface DodajCourseProps {
    onAdd: (course: Course) => any;
}

let DodajCourse = (props: DodajCourseProps) => {

    const [lastnosti, setLastnosti] = React.useState({
        naziv: "",
        slika: 0,
        opis: "",
        velikostiString: "",
        zdrastvenoStanjeString:""
    });

    


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        var velikostiArray = Array<number>();
        var zdrastvenoStanjeArray = Array<string>();

        zdrastvenoStanjeArray = lastnosti.zdrastvenoStanjeString.split(" ");
        
        var numString = "";
        for(let i=0; i<lastnosti.velikostiString.length; i++){
            if(lastnosti.velikostiString[i] != ' '){
                numString+=lastnosti.velikostiString[i];
            } else {
                var myNum : number = +numString;
                velikostiArray.push(myNum);
                numString = "";
            }
        }
        let myNum1 : number = +numString;
        velikostiArray.push(myNum1);
        numString = "";


        let data = {
            naziv: lastnosti.naziv,
            slika: lastnosti.slika,
            opis: lastnosti.opis,
            velikost: velikostiArray,
            zdrastvenoStanje : zdrastvenoStanjeArray
        }
      
        fetch("http://localhost:3001/course/dodan_course", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastnosti({...lastnosti, [e.target.name]: e.target.value});
    }
    


    return(<div> 
        
        <h2 className='podnaslov'>Vnesite podatke o course:</h2>
        <form id="form" onSubmit = {handleSubmit}>
            
            <label>Naziv:</label>
            <input name="naziv" type="text" onChange={handleChange}/>
            <br />
            <label>Slika:</label>
            <input name="slika" type="file"/>
            <br />
            <label>Opis:</label>
            <input name="opis" type="text" onChange={handleChange}/>
            <br />
            <label>Velikost:</label>
            <input name="velikostiString" type="text"  onChange={handleChange}/>
            <br/>
            <label>zdrastveno stanje:</label>
            <input name="zdrastvenoStanjeString" type="text" onChange={handleChange}/>
            <br/>
            <input type="submit" value="Dodaj"/>
        </form>
        <button>{<Link className="domov" to={`/`}>Domov</Link>}</button>
    </div>);
}

export default DodajCourse;