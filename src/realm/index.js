import {MedicineSchema, VisitSchema} from './schema';

const Realm = require('realm');

const RealmInstance = new Realm({schema: [VisitSchema, MedicineSchema]});
/*
    export instance of Realm
 */
export default RealmInstance;
