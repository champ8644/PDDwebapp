const {PDDiaryMedicationReference, 
    PDDiaryMedicationPrescription, 
    PDDiaryMedicationSet, 
    PDDiaryMedicationSchedule} = require('./PDDiaryServerStorageTypes');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var readlineQuestionPromise = function(question) {
	return new Promise(function(resolve, reject) {
		rl.question(question+"\n", function(answer) {
			resolve(answer);
		});
	});
}

function sectionCuttingString(length) {
	if(process.stdout.columns) {length = process.stdout.columns;}
	return "\n\n"+"=".repeat(length) + "\n";
}

var createMedicationSchedule = async function() {
	var medicationSets = [];
	return new Promise(async function(resolve, reject){
		var addingSet = true;
		while(1) {
			var startString = sectionCuttingString(20)+"Creating Medication Schedule:\n"+
			"Current medication sets are \n"+
			JSON.stringify(medicationSets, null, 2)+
			"\n\nDo you want to add another medication set?";
			
			var shouldAdd = await readlineQuestionPromise(startString);
			addingSet = (shouldAdd == 'y' || shouldAdd == 'Y');
			if(!addingSet) {
				if(medicationSets.length) {
					var schedule = new PDDiaryMedicationSchedule(Date.now()/1000.0, 0, medicationSets);
					resolve(schedule);
				}
				else resolve(null);
				break;
			}
			
			var medicationSet = await newMedicationSetForATime();
			if(medicationSet) {
				medicationSets.push(medicationSet);
				console.log("Added medication set.");
			}
			else {
				console.log("Canceled. No medication set was added.");
			}
		}		
	});
}

var newMedicationSetForATime = async function() {
	return new Promise(async function(resolve, reject){
		rl.question('Enter the time in the day in seconds.', async function(answer){
			var resultTime = eval(answer);
			var gettingInput = true;
			var currentPrescriptions = [];
			while(1) {
				var gettingInputRes = 
				await readlineQuestionPromise(
				sectionCuttingString(20)+"Entering drugs into medication set for time : "+resultTime+".\n\nCurrent prescriptions are\n"+
				JSON.stringify(currentPrescriptions, null, 2)+
				"\n\nEnter Y to continue. Enter anything else to finish entering this medication set.");
				gettingInput = (gettingInputRes == 'y' || gettingInputRes == 'Y');
				if(!gettingInput) {
					if(currentPrescriptions.length) {
						var medicationSet = new PDDiaryMedicationSet(resultTime, currentPrescriptions);
						resolve(medicationSet);
						break;
					}
					else {
						resolve(null);
						break;
					}
				}
				
				var tradename = await readlineQuestionPromise('Enter the drug\'s tradename.');
				var index = await readlineQuestionPromise('Enter the drug\'s index (id field) in the database.');
				var dose = await readlineQuestionPromise('Enter the drug\'s dose.');
				var doseUnit = await readlineQuestionPromise('Enter the drug\'s dosage unit.');
				var amount = await readlineQuestionPromise('Enter the amount to prescribe.');
				var reference = new PDDiaryMedicationReference(index, tradename, dose, doseUnit);
				var prescription = new PDDiaryMedicationPrescription(reference, amount);
				currentPrescriptions.push(prescription);
			}
		});
	});
}

var schedulePromise = createMedicationSchedule();

schedulePromise.then(function(schedule) {
	console.log("DONE! Schedule is....\n\n");
	console.log(JSON.stringify(schedule, null, 2));
});
