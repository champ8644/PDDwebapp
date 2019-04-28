import React, { useState } from "react";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
import DatabaseMed from "database/DatabaseMed.json"

export default function DbUpdate(props) {
  var db = firebase.firestore();
  var medicineRef = db.collection("medicines");
  const [isSuccess, setSuccess] = useState("");

  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
    }

  const alterDB = () => {
    var time = Date.now();
    console.log(DatabaseMed);
    var adding = DatabaseMed[0];
    console.log(adding);
    console.log(pad(1,3)+'_'+adding.tradeName);
    var i;

    for (i=0;i<DatabaseMed.length;i++) {
        medicineRef.doc(pad(i,3)+'_'+DatabaseMed[i].tradeName).set(DatabaseMed[i],{merge:true})

    }
    setSuccess("Finished!");

    /*
    var updateTimestamp = medicineRef.set({
        serverTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        database: firebase.database.ServerValue.TIMESTAMP,
        latency: Date.now()
    })*/
    /*
    medicineRef.set({
        name: "Marijuana",
        //does: "20",
        unit: "mg",
        route: "IV"
      },{merge:true})*//*
      .then(() => {
        console.log("Document successfully written!");
        console.log(firebase.firestore.FieldValue.serverTimestamp());
        console.log(Date.now()-firebase.firestore.FieldValue.serverTimestamp());
        setSuccess("Database alter successfully!, ");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        setSuccess("Error : " + error);
      });*/
  };

  const cleartext = () => {
    setSuccess(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={alterDB}>
        Upload to Database
      </Button>
      <Button variant="contained" color="secondary" onClick={cleartext}>
        Clear
      </Button>
      <br />
      {isSuccess}
    </div>
  );
}
