import patients from '../../data/patients-full';

import { Patient, NonSensitivePatient, NewPatient } from '../types'

import { v1 as uuid } from 'uuid'
const id = uuid()

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const getPatientInfo = (id: string): NonSensitivePatient | undefined => {
  let patient = patients.find(p => p.id === id)

  if (patient) {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
    }
  }
  return;
}

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
  getPatientInfo,
};