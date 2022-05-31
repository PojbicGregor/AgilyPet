interface Course {
    naziv: string,
    slika: string,
    opis: string,
    velikost:{ type : Array<number> , "default" : [] },
    zdrastvenoStanje:{ type : Array<string> , "default" : [] }
}

export type {Course};


