import React from 'react';
import {ChangeEvent} from 'react';
import {FormEvent} from 'react';
import {Event} from './razredi/Event';
import { Link } from 'react-router-dom';
import UserNav from './komponente/UserNav';
import Noga from './komponente/Noga';
import Koledar from './komponente/Koledar';
//import Menu from './Menu';

interface DodajEventProps {
    onAdd: (event: Event) => any;
}

let DodajEvent = (props: DodajEventProps) => {

    const [lastnosti, setLastnosti] = React.useState({
        naziv: "",
        datum: "",
        opis: "",
        naslov:""
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let data = {
         ime:lastnosti.naziv,
         datum:lastnosti.datum,
         opis : lastnosti.opis,
         naslov: lastnosti.naslov
        } 
         console.log(data)
        fetch("http://localhost:3001/event/dodajEvent", {
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
    


    return(
    <div> 
            <UserNav></UserNav>

        <h2 className='podnaslov'>Vnesite podatke o eventu:</h2>
        <form id="form" onSubmit = {handleSubmit}>
            
            <label>ime:</label>
            <input name="naziv" type="text" onChange={handleChange}/>
            <br />
            <label>datum:</label>
            <input name="datum" type="date" onChange={handleChange}/>
            <br />
            <label>Opis:</label>
            <input name="opis" type="text" onChange={handleChange}/>
            <br />
            <label>naslov:</label>
            <input name="naslov" type="text"  onChange={handleChange}/>
            <br/>
            <br/>
            <input type="submit" value="Dodaj"/>
        </form>
         <Koledar/>
        <Noga></Noga>
    </div>);
}

export default DodajEvent;