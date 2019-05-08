
class PDDiaryMedicationTakingRecord {
    /**
     * 
     * @param {Number} time The time the medication is taken in EPOCH time
     * @param {Number} timeZoneOffset Patient's TimeZone offset
     * @param {Number} drugScheduleIndex The drug schedule index in the patient's current prescription
     * @param {Array.<String>} missedMedications The patient's missed medications
     */
    constructor(time, timeZoneOffset, drugScheduleIndex, missedMedications) {
        /** @type {Number} The time the medication is taken in EPOCH time */
        this.time = time;
        /** @type {Number} Patient's TimeZone offset */
        this.timeZoneOffset = timeZoneOffset;
        /** @type {Number} The drug schedule index in the patient's current prescription */
        this.drugScheduleIndex = drugScheduleIndex;
        /** @type {Array.<String>} The patient's missed medications */
        this.missedMedications = missedMedications;
    }
}

class PDDiaryKinesiaStateRecord {
    /**
     * 
     * @param {Number} time The time the kinesia was recorded, specified as EPOCH time
     * @param {String} state The state, values are "Nonmotor", "Motor", "On", "Dyskinesia"
     * @param {String} subtype The subtype, used when kinesia type is "Nonmotor" or "Motor", 
     * values are :
     * Nonmotor : "Depression", "Fatigue",
     * Motor : "Tremor", "Bradykinesia", "Freezing of Gait", "Rigidity"
     * @param {Number} intensity An integer, values ranging from 1-3 when specified (Off, Dyskinesia).
     * Value is 0 when unspecified (On)
     */
    constructor(time, state, subtype, intensity) {
        /** @type {Number} The time the kinesia was recorded, specified as EPOCH time */
        this.time = time;
        /** @type {String} The state, values are "Nonmotor", "Motor", "On", "Dyskinesia" */
        this.state = state;
        /** @type {String}  The subtype, used when kinesia type is "Nonmotor" or "Motor" */
        this.subtype = subtype;
        /** @type {Number} An integer, values ranging from 1-3 when specified (Off, Dyskinesia). */
        this.intensity = intensity;
    }
}