import React, { FormEvent, useState } from 'react';
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
    async function getEvents () {
        const res = await fetch("http://localhost:3001/event/vseDogodke")
        let dataEventi = await res.json();
        const dataRefresh= await refreshData(dataEventi)
        setTimeout(async () => {

         setElements(dataRefresh)
        }, 500);

    }
    React.useEffect(function () {

  
        getEvents();

    }, [])


    const handleClickOdjava = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let dataBack = {
            id: e.currentTarget.id,
            token: localStorage.getItem("token")
        }
        odjavaZaEvent(dataBack)
    }
    async function odjavaZaEvent(dataBack: { id: any; token?: string | null; }) {
        const response = await fetch("http://localhost:3001/event/" + dataBack.id);
        const dataEvent = await response.json();


        let dataForBackend = {
            id: dataBack.id,
            token: localStorage.getItem("token"),
        }
        await fetch("http://localhost:3001/token/odjavaEvent", {
            method: 'POST',
            body: JSON.stringify(dataForBackend),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                            getEvents();
                })
            }
        })
        return dataEvent;
    
    }
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let dataBack = {
            id: e.currentTarget.id,
            token: localStorage.getItem("token")
        }
        const data = prijavaZaEvent(dataBack);
    }
           
    async function prijavaZaEvent(dataBack: { id: any; token?: string | null; }) {
        const response = await fetch("http://localhost:3001/event/" + dataBack.id);
        const dataEvent = await response.json();


        let dataForBackend = {
            id: dataBack.id,
            token: localStorage.getItem("token"),
        }
        await fetch("http://localhost:3001/token/prijava", {
            method: 'POST',
            body: JSON.stringify(dataForBackend),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                            getEvents();
                })
            }
        })



        return dataEvent;
    }

    async function refreshData(siteEventi: any[]) {
        let dataForBackend = {
            token: localStorage.getItem("token")
        }
        await fetch("http://localhost:3001/token/userLogged", {
            method: 'POST',
            body: JSON.stringify(dataForBackend),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    for (let i = 0; i <= siteEventi.length - 1; i++) {
                        if (siteEventi[i].prijavljeni_Users.length > 0) {

                            for (let j = 0; j <= siteEventi[i].prijavljeni_Users.length - 1; j++) {
                                if (siteEventi[i].prijavljeni_Users[j] === data.id) {
                                    console.log("prijaven na eventot")
                                    console.log(siteEventi[i].ime)
                                    siteEventi[i].daIliNe = true;

                                    break;
                                }
                            }
                        } else {
                            siteEventi[i].daIliNe = false;

                        }

                    }
                    return siteEventi
                })}
        })
        return siteEventi

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

                    {event.daIliNe ? <Button variant="danger" id={event.id.toString()} onClick={handleClickOdjava}>Odjava</Button> :
                        <Button   id={event.id.toString()} onClick={handleClick}>Prijava</Button>
                    }

                </div>))}

                <Koledar />
                <Noga />
            </div>

        </div>

    );

}

export default SeznamCourse;
