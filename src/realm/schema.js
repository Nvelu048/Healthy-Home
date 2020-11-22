/*
  Visit Schema
 */
const VisitSchema = {
  name: 'Visit',
  primaryKey: 'id',
  properties: {
    id: 'int',
    hospitalName: 'string',
    doctorName: 'string',
    dateOfVisit: 'int',
    medication: 'Medicine[]',
    doctorStatement: 'string',
    reason: 'string',
  },
};
/*
  Medicine Schema
 */
const MedicineSchema = {
  name: 'Medicine',
  properties: {
    id: 'int',
    name: 'string',
    dosage: 'string',
  },
};

export {VisitSchema, MedicineSchema};
