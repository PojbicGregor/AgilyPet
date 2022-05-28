import React from 'react';
import {ChangeEvent} from 'react';
import {FormEvent} from 'react';
import {Event} from './razredi/Event';
import { Link } from 'react-router-dom';
import UserNav from './komponente/UserNav';
import Noga from './komponente/Noga';
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
        <button>{<Link className="domov" to={`/`}>Domov</Link>}</button>
        <iframe className='koledar'  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23039BE5&ctz=Europe%2FBelgrade&showPrint=1&showDate=1&showNav=1&showTitle=0&src=YmxhemhlbWFuZXZyaXNAZ21haWwuY29t&color=%23039BE5"></iframe>
        <Noga></Noga>
    </div>);
}

export default DodajEvent;