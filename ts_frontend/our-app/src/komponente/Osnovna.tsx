import React from 'react';

import Navigacija from './Navigacija';
import Noga from './Noga';
import UserNav from './UserNav';
import Vsebina from './Vsebina';
import Vsebina_prijavljen from './Vsebina_prijavljen';

const Osnovna: React.FC = (props: any) => {

    let prijavljen = false;

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    }

    return(
        <>
            {prijavljen ? <UserNav /> : <Navigacija />}
            {prijavljen ? <Vsebina_prijavljen /> : <Vsebina />}
            <Noga></Noga>
        </>
    );
}

export default Osnovna;