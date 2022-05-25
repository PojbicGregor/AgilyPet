import React from 'react';
import {ChangeEvent} from 'react';
import {FormEvent} from 'react';
import {Pes} from './razredi/Pes';
import { Link } from 'react-router-dom';
//import Menu from './Menu';
import './koledar.css';

interface DodajPsaProps {
    onAdd: (pes: Pes) => any;
}

let DodajPsa = (props: DodajPsaProps) => {

    const [lastnosti, setLastnosti] = React.useState({
        ime: "",
        pasma: "",
        visina: 0,
        starost: 0
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        let data = {
            ime: lastnosti.ime,
            pasma: lastnosti.pasma,
            visina: lastnosti.visina,
            starost: lastnosti.starost
        }

        fetch("http://localhost:3001/dodan_pes", {
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
        <h2 className='podnaslov'>Vnesite podatke o psu:</h2>
        <form id="form" onSubmit = {handleSubmit}>
            
            <label>Ime:</label>
            <input name="ime" type="text" value={lastnosti.ime} onChange={handleChange}/>
            <br />
            <label>Pasma:</label>
            <input name="pasma" type="text" value={lastnosti.pasma} onChange={handleChange}/>
            <br />
            <label>Visina:</label>
            <input name="visina" type="number" value={lastnosti.visina} onChange={handleChange}/>
            <br />
            <label>Starost:</label>
            <input name="starost" type="number" value={lastnosti.starost} onChange={handleChange}/>
            <br />
            
            <input type="submit" value="Dodaj"/>
        </form>
        <button>{<Link className="domov" to={`/`}>Domov</Link>}</button>
      <h1 className='proba'>koledar za course</h1>
        <iframe className='koledar' src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23039BE5&ctz=Europe%2FBelgrade&src=YmxhemhlbWFuZXZyaXNAZ21haWwuY29t&src=ZW4uc2xvdmVuaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043" ></iframe>
    </div>);
}

export default DodajPsa;