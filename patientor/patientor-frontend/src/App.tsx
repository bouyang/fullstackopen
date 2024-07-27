import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, PatientFormValues, FullPatient, Entry } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const PatientPage = (props: any) => {
  const id = useParams().id

  let info = props.infoFunc(id)
  return (
    <div>
      <h2>{info.name} {info.gender}</h2>
      <div>DOB: {info.dateOfBirth}</div>
      <div>Occupation: {info.occupation}</div>
      <h3>Entries</h3>
        {info.entries.map((entry: Entry) => {
          return <EntryEntry key={entry.id} entry={entry} />
        })}
    </div>
  )
}

const EntryEntry = (props: any) => {
  return (
    <div>
      {props.entry.date}: <i>{props.entry.description}</i>
      <ul>
        {props.entry.diagnosisCodes.map((code: string) => {
          return <Code key={code} code={code} />
        })}
        </ul>
    </div>
  )
}

const Code = (props: any) => {
  const [diagnoses, setDiagnoses] = useState<any[]>([]);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      let diagnosesList = await axios.get(`${apiBaseUrl}/diagnoses`).then(response => response.data)
      setDiagnoses(diagnosesList);
    };
    void fetchDiagnosesList();
  }, []);

  if (diagnoses.length > 0) {
    return (
      <div>
        <li>{props.code} {diagnoses.find(dc => dc.code === props.code).name}</li>
      </div>
    )
  }
}

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);


  const getPatientInfo = (id: string): FullPatient | undefined => {
    let patient = patients.find(p => p.id === id)
    let fullPatient = patient as FullPatient;
  
    if (fullPatient) {
      return {
        id: fullPatient.id,
        name: fullPatient.name,
        dateOfBirth: fullPatient.dateOfBirth,
        gender: fullPatient.gender,
        occupation: fullPatient.occupation,
        // entries: [
        //   {
        //     id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
        //     date: "2019-08-05",
        //     type: "OccupationalHealthcare",
        //     specialist: "MD House",
        //     employerName: "HyPD",
        //     diagnosisCodes: [
        //       "Z57.1",
        //       "Z74.3",
        //       "M51.2"
        //     ],
        //     description: "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ",
        //     sickLeave: {
        //       startDate: "2019-08-05",
        //       endDate: "2019-08-28"
        //     }
        //   }
        // ],
        entries: fullPatient.entries,
      }
    } else {
      return;
    }
  }
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientPage infoFunc={getPatientInfo}/>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
