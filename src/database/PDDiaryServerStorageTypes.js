/**
 * This class represents a FIRDocumentRef on the Firebase Storage
 */
class PDDiaryMedication {
    /**
     * 
     * @param id {Number} index (the index of the object, as seen on Firebase Storage)
     * @param dosage {String} dosage form of the drug, e.g. "tablet"
     * @param dose {String}  The dose of the drug, e.g. "100", "200/50"
     * @param doseUnit {String} The dose's unit, e.g. "mg", "mg/U"
     * @param tradeName {String} The drug's trade name
     * @param drugImagePath {String} : Represented as a string with field name as "imgsrc" on the database, 
     * as Firebase Storage link starting with "gs://" Retrieve actual image from Firebase 
     * Storage using the link.
     * 
     */
    constructor(id, dosage, dose, doseUnit, tradeName, drugImagePath) {
        /** @type {Number} index (the index of the object, as seen on Firebase Storage) */
        this.id = id;
        /** @type {String} dosage form of the drug, e.g. "tablet" */
        this.dosage = dosage;
        /** @type {String}  The dose of the drug, e.g. "100", "200/50" */
        this.dose = dose;
        /** @type {String} The dose's unit, e.g. "mg", "mg/U" */
        this.doseUnit = doseUnit;
        /** @type {String} The drug's trade name */
        this.tradeName = tradeName;
        /** @type {String} : Represented as a string with field name of "imgsrc" on the database*/
        this.drugImagePath = drugImagePath;
    }

    medicationDocumentString() {
        /**
         * @param integernumber {Number}
         * @param length {Number}
         */
        function padZero(integernumber, length) {
            var str = ""+integernumber;
            while(str.length < length) {
                str = "0"+str;
            }
            return str;
        }

        return padZero(this.id, 3)+"_"+this.tradeName;
    }
    databasePath() {
        return "medicines/"+this.medicationDocumentString();
    }
}

/**
 * Use this to reference a medication
 */
class PDDiaryMedicationReference {
    /**
     * 
     * @param {Number} drugId 
     * @param {String} tradeName 
     * @param {String} dose
     * @param {String} doseUnit
     */
    constructor(drugId, tradeName, dose, doseUnit) {
        /** @type {Number} index (the index of the object, as seen on Firebase Storage) */
        this.drugId = drugId;
        /** @type {String} The drug's trade name */
        this.tradeName = tradeName;
        /** @type {String} The drug's dose*/
        this.dose = dose;
        /** @type {String} the drug's doseUnit*/
        this.doseUnit = doseUnit;
    }
    medicationDocumentString() {
        /**
         * @param {Number} integernumber 
         * @param {Number} length 
         */
        function padZero(integernumber, length) {
            var str = ""+integernumber;
            while(str.length < length) {
                str = "0"+str;
            }
            return str;
        }

        return padZero(this.id, 3)+"_"+this.tradeName;
    }
    databasePath() {
        return "medicines/"+this.medicationDocumentString();
    }
}

class PDDiaryMedicationPrescription {
    /**
     * 
     * @param {PDDiaryMedicationReference} medicationReference The medicationReference
     * @param {Number} amount The amount to prescribe, usually in tablets (e.g. 3)
     */
    constructor(medicationReference, amount) {
        /** @type {PDDiaryMedicationReference} The medicationReference */
        this.medicationReference = medicationReference;
        /** @type {Number} The amount to prescribe, usually in tablets (e.g. 3) */
        this.amount = amount;
    }
}

/**
 * A medication set is a set of medications to be taken at a specific time, as specified in the timeOfDay variable
 */
class PDDiaryMedicationSet {
    /**
     * 
     * @param {Number} timeOfDay The time of day in seconds, probably double in value
     * @param {Array.<PDDiaryMedicationPrescription>} medications prescription dosages for this medication set
     */
    constructor(timeOfDay, medications) {
        /** @type {Number} The time of day in seconds, probably double in value */
        this.timeOfDay = timeOfDay;
        /** @type {Array.<PDDiaryMedicationPrescription>} prescription dosages for this medication set */
        this.medications = medications;
    }
}

/**
 * A medication schedule is a schedule showing medication sets to take at each time of day.
 */
class PDDiaryMedicationSchedule {
    /**
     * 
     * @param {Number} startUsageTime The time that this medication schedule is first used
     * @param {Number} endUsageTime The time that this medication schedule is invalidated, 
     * this should be set when a new schedule is created, specify 0 if this schedule is current
     * @param {Array.<PDDiaryMedicationSet>} scheduledMedications Medication sets to take
     */
    constructor(startUsageTime, endUsageTime, scheduledMedications) {
        /** @type {Number} The time that this medication schedule is first used*/
        this.startUsageTime = startUsageTime;
        /** @type {Number}  The time that this medication schedule is invalidated,  */
        this.endUsageTime = endUsageTime;
        /** @type {Array.<PDDiaryMedicationSet>} Medication sets to take */
        this.scheduledMedications = scheduledMedications;
    }
}

module.exports = {
    PDDiaryMedication:PDDiaryMedication,
    PDDiaryMedicationReference:PDDiaryMedicationReference,
    PDDiaryMedicationPrescription:PDDiaryMedicationPrescription,
    PDDiaryMedicationSet:PDDiaryMedicationSet,
    PDDiaryMedicationSchedule:PDDiaryMedicationSchedule
}
