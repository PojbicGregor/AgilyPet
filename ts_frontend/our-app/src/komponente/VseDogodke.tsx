import React from 'react';
import { Button } from 'react-bootstrap';

//import { Course } from './razredi/Course';
import { Event } from '../razredi/Event';
import Koledar from './Koledar';
import Navigacija from './Navigacija';
import Noga from './Noga';
import UserNav from './UserNav';
import Vsebina_prijavljen from './Vsebina_prijavljen';

const VseDogodke: React.FC = () => {

    const [elements, setElements] = React.useState<Event[]>();

    let prijavljen;

    

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    }else{
        prijavljen = false;
    }

    React.useEffect(function () {

        const getEvents = async function () {
            const res = await fetch("http://localhost:3001/event/vseDogodke")
            const data = await res.json();
            setElements(data);
        }
        getEvents();

    }, [])
    return (

        <div >
            {prijavljen ? <UserNav /> : <Navigacija />}
            <div className='container-md' >

                {elements?.map(event => (<div style={{ border: "solid 4px whiteSmoke", borderRadius: "10px", margin: "15px" }} key={event.ime}>

                    <span><h3>{event.ime}</h3></span><br />

                    <span>{event.opis}</span><br />

                    <span>{event.naslov}</span><br />

                    <span>{event.datum}</span><br />

                </div>))}
             
                    <Koledar />
                <Noga />
            </div>

        </div>

    );

}

export default VseDogodke;
