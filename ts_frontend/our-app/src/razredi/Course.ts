interface Course {
    naziv: string,
    slika: number,
    opis: string,
    velikost:{ type : Array<number> , "default" : [] },
    zdrastvenoStanje:{ type : Array<string> , "default" : [] }
}

export type {Course};


