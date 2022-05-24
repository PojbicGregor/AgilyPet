import React from 'react';

import Navigacija from './Navigacija';
import Noga from './Noga';
import UserNav from './UserNav';
import Vsebina from './Vsebina';

const Osnovna: React.FC = (props: any) => {

    let prijavljen = false;

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    }

    return(
        <>
            {prijavljen ? <UserNav /> : <Navigacija />}
            {prijavljen ? <UserNav /> : <Vsebina />}
            <Noga></Noga>
        </>
    );
}

export default Osnovna;