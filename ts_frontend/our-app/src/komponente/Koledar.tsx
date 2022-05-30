import React from 'react';
import '../koledar.css'

function Koledar() {
    return (

        <div>

            <iframe className='koledar' src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23039BE5&ctz=Europe%2FBelgrade&showPrint=1&showDate=1&showNav=1&showTitle=0&src=YmxhemhlbWFuZXZyaXNAZ21haWwuY29t&color=%23039BE5"></iframe>
        </div>
    )
}

export default Koledar;