import React, { FormEvent } from 'react';
import { Button } from 'react-bootstrap';
import { MouseEvent } from 'react';
//import { Course } from './razredi/Course';
import { Event } from '../razredi/Event';
import Koledar from './Koledar';
import Noga from './Noga';
import UserNav from './UserNav';
import Vsebina_prijavljen from './Vsebina_prijavljen';

function SeznamCourse() {

    const [elements, setElements] = React.useState<Event[]>();

    React.useEffect(function () {

        const getEvents = async function () {
            const res = await fetch("http://localhost:3001/event/vseDogodke")
            const data = await res.json();
            setElements(data);
        }
        getEvents();

    }, [])

    async function getData(id: string | number) {

        const response = await fetch("http://localhost:3001/event/" + id);
        const data = await response.json();
        return data;
    }

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        const id = e.currentTarget.id;
        console.log(id);
        const data=getData(id);
        console.log(data)
    }

    return (

        <div >
            <UserNav />
            <div className='container-md' >

                {elements?.map(event => (<div style={{ border: "solid 4px whiteSmoke", borderRadius: "10px", margin: "15px" }} key={event.ime}>

                    <span><h3>{event.ime}</h3></span><br />

                    <span>{event.opis}</span><br />

                    <span>{event.naslov}</span><br />

                    <span>{event.datum}</span><br />

                    <Button id={event.id.toString()} onClick={handleClick}>Prijava</Button>
                </div>))}

                <Koledar />
                <Noga />
            </div>

        </div>

    );

}

export default SeznamCourse;
