import _ from 'lodash';
import './css/styles.css';
import './css/login.css';
import Icon from './Images/DeviceCareLogo.png';
import buildLoginPage from './loginpage';
import buildOnboardingPage from './onboardingpage';
import feather from 'feather-icons'
import buildLoadingModal from './loadingmodaldialog';
import buildPaymentGatewayForm from './ecobankpayform';
import buildSignUpPage from './signuppage';
import buildCautionDialog from './cautiondialog';
import buildSuccessDialog from './successdialog';
import { elt } from './domelementbuilder';
// import 'tw-elements';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import buildLandingDashboard from './landingDashboard';
import buildVerifyUserPage, { fillInPin } from './verifyuserpage';
import { db, signOutUser } from './firebasesrc';
import { doc, getDoc } from 'firebase/firestore';
import { buildtable } from './datamanager';

document.body.append(elt('div',{className:'mbody'}));
buildLoadingModal();
const auth = getAuth();
let unsub = onAuthStateChanged(auth, async (user) => {
  if (user) {

    const docRef = doc(db,"corporateUser",user.uid)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
                                                    // console.log(docSnap.data())
    const corporateDoc = await getDoc(doc(db,"corporate",docSnap.data().corporateId))
    if(corporateDoc.exists()){
      let user = docSnap.data()
      let corp = corporateDoc.data()
      if(corp.isVerified){
        (async function runbuild(){
          document.querySelector('.mbody').append(await buildLandingDashboard())
          buildtable();
          document.querySelector('#loadingmodal').classList.add('hidden');
          // document.body.appendChild()
        })();
      }else{

        (async function runbuild(){
          signOutUser();
          document.querySelector('.mbody').append(await buildLoginPage())
          // document.body.appendChild()
        })();
      }


      }
    }
    
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    
    
    // ...
  } else {
    // User is signed out
    // ...
  

  (async function runbuild(){
    document.querySelector('.mbody').append(await buildLoginPage())
    // document.body.appendChild()
  })();

  }
});

// unsub();
// document.
// (async function runbuild(){
//   document.querySelector('.mbody').append( await buildVerifyUserPage())
//   fillInPin()
//         // document.body.appendChild()
//       })();


// function component() {
//     const element = document.createElement('div');
//     const btn = document.createElement('button');
//     // Lodash, currently included via a import by this script
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     element.classList.add('bg-red-900');

//     btn.innerHTML = 'Click Me and check the console';
//     btn.onclick = printMe;
//     element.appendChild(btn);

//     const myIcon = new Image();
//     myIcon.src = Icon ;


//     // element.style.background = myIcon
//     // element.appendChild(myIcon);
//     return element;
//   }
// document.body.appendChild(await buildOnboardingPage());

  // buildSuccessDialog();
  // feather.replace();