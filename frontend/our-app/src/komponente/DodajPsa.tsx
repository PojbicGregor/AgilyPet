import React from 'react';
import {ChangeEvent} from 'react';
import {FormEvent} from 'react';
import {Pes} from './razredi/Pes';
import { Link } from 'react-router-dom';
//import Menu from './Menu';

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
        props.onAdd({ime: lastnosti.ime, pasma: lastnosti.pasma, visina: lastnosti.visina, starost: lastnosti.starost});
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
    </div>);
}

export default DodajPsa;