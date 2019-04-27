import React, {useState} from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import { resolve } from 'uri-js';
import { Promise } from 'q';

export default function DbUpdate(props){
    var db = props.database;
    const [isSuccess,setSuccess] = useState("");

    const alterDB = () => {
        let promise = new Promise((resolve, reject) => {
            
            resolve("done");
        }.then(() => setSuccess("Database alter successfully!"),err => setSuccess("Error : "+err));
    }

    const cleartext = () => {
        setSuccess(false);
    }
    return (
        <div>
            <Button variant="contained" color="primary" onClick={alterDB}>Activated!</Button>
            <Button variant="contained" color="secondary" onClick={cleartext}>Clear</Button>
            <br></br>
            {isSuccess}
        </div>
    )
}