import React from 'react';
import { Button } from 'react-bootstrap';
import { Pes } from '../razredi/Pes';
import Noga from './Noga';
import UserNav from './UserNav';
import { MouseEvent } from 'react';
const MojiPsi: React.FC = () => {
    const [elements, setElements] = React.useState<Pes[]>();
    let preveri;



    React.useEffect(function () {
        const getPsi = async function () {
            const res = await fetch("http://localhost:3001/token/" + localStorage.getItem("token"));
            const data = await res.json();
            setElements(data);
        }
        getPsi();
    }, [])
    
    async function deleteDog(dataForBackend: { id: any; token?: string | null; }) {
        await fetch("http://localhost:3001/token/deleteDog", {
            method: 'POST',
            body: JSON.stringify(dataForBackend),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setElements(data.reverse())
                })
            }
        })

    }
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let dataForBackend = {
            id: e.currentTarget.id,
            token: localStorage.getItem("token"),
        }
        deleteDog(dataForBackend)
    }
    if (elements === undefined || elements.length == 0) {
        return (<>            <UserNav />
            <h1 className="text-center">
                You have not added a Dog yet, click on the button to add a Dog</h1>
            <Button href='/dodajPsa'>ADD</Button>
            <Noga />
        </>)
    }
    else {
        return (

            <><UserNav />
                    <h1 className="text-center">Dogs added by me</h1>

                <div className='container' style={{ backgroundColor: "white", borderRadius: "15px" }}>

                    <div className='container-md' >

                        {elements?.map(psi => (<div style={{ border: "solid 4px whiteSmoke", borderRadius: "10px", margin: "15px" }} key={psi.ime}>

                            <span><h3>{psi.ime}</h3></span><br />

                            <span>{psi.pasma}</span><br />

                            <span>{psi.visina}</span><br />

                            <span>{psi.starost}</span><br />
                            <span>Missing a limb:{JSON.stringify(psi.manjkaEna)}</span><br />
                            <span>Missing two limbs:{JSON.stringify(psi.manjkataDve)}</span><br />
                            <span>Dog with joint issues:{JSON.stringify(psi.sklepi)}</span><br />
                            <Button variant='danger' id={psi._id.toString()} onClick={handleClick}>Delete</Button>
                        </div>))}

                    </div>

                </div>

                <Noga />
            </>



        )
    }
}
export default MojiPsi;