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


// document.



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
document.body.append(elt('div',{className:'mbody'}));
buildLoadingModal();
  (async function runbuild(){
    document.querySelector('.mbody').append(await buildLoginPage())
    // document.body.appendChild()
  })();
  // buildSuccessDialog();
  // feather.replace();