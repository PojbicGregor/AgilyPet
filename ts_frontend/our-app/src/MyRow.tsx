import React from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Course } from './razredi/Course';
import { Link } from 'react-router-dom';

interface MyProps {
    rowNum: number;
    handleAddObstacle: (x: number, y: number, e : React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void;
}

let MyRow = (props: MyProps) => {

    return (<tr>
        <td style={{maxWidth:"50px", maxHeight:"50px",border:'1px solid rgb(97,96,96)'}} onClick={(e) => props.handleAddObstacle(props.rowNum, 0, e)} ></td>
        <td style={{maxWidth:"50px", maxHeight:"50px",border:'1px solid rgb(97,96,96)'}} onClick={(e) => props.handleAddObstacle(props.rowNum, 1, e)}></td>
        <td style={{maxWidth:"50px", maxHeight:"50px",border:'1px solid rgb(97,96,96)'}} onClick={(e) => props.handleAddObstacle(props.rowNum, 2, e)}></td>
        <td style={{maxWidth:"50px", maxHeight:"50px",border:'1px solid rgb(97,96,96)'}} onClick={(e) => props.handleAddObstacle(props.rowNum, 3, e)}></td>
        <td style={{maxWidth:"50px", maxHeight:"50px",border:'1px solid rgb(97,96,96)'}} onClick={(e) => props.handleAddObstacle(props.rowNum, 4, e)}></td>
        <td style={{maxWidth:"50px", maxHeight:"50px",border:'1px solid rgb(97,96,96)'}} onClick={(e) => props.handleAddObstacle(props.rowNum, 5, e)}></td>
    </tr>);
}

export default MyRow;
