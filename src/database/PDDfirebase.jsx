import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyDBgYHAo60KllU1Iecxyw6z0GNPqU0eSUw',
  authDomain: 'pd-diary.firebaseapp.com',
  databaseURL: 'https://pd-diary.firebaseio.com',
  projectId: 'pd-diary',
  storageBucket: 'pd-diary.appspot.com',
  messagingSenderId: '482238828132',
  appId: '1:482238828132:web:7811ea487e2faa7f'
};

var db;
var medRef;
var resAll;

function init() {
  firebase.initializeApp(firebaseConfig);

  firebase
    .firestore()
    .enablePersistence()
    .catch(function(err) {
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
  // Subsequent queries will use persistence, if it was enabled successfully

  db = firebase.firestore();
  medRef = db.collection('medicines');
}

let id = 0;
function createData(tradeName, genericName, dose, form, note) {
  id += 1;
  return { id, tradeName, genericName, dose, form, note };
}

function query(action) {
  if (db === undefined) {
    init();
  }
  switch (action.type) {
    case 'all': {
      if (resAll !== undefined) return resAll;
      resAll = [];
      medRef
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            resAll.push(
              createData(
                doc.tradeName,
                doc.genericName,
                doc.dose,
                doc.form,
                doc.note
              )
            );
          });

          return resAll;
        })
        .catch(err => {
          //throw Error('Error query All documents in Med', err);
        });
      console.log('helloworld');
      break;
    }
    default:
    //throw Error('Error calling query');
  }
}

const Meddb = {
  all: () => query({ type: 'all' })
};

export { Meddb };
