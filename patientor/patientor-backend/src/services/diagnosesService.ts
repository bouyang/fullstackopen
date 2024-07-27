import diagnoses from '../../data/diagnoses';

import { DiagnosesEntry } from '../types'

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};