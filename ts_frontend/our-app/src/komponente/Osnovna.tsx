import React from 'react';

import Navigacija from './Navigacija';
import Noga from './Noga';

const Osnovna: React.FC = (props: any) => {

    return(
        <>
            <Navigacija></Navigacija>
            
            <Noga></Noga>
        </>
    );
}

export default Osnovna;