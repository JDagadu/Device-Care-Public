import { elt } from "./domelementbuilder";
import buildLoginPage from "./loginpage";
import buildSignUpPage from "./signuppage";
import { clearContent } from "./utilities";
import loginflankimg from './Images/forgotpasswordimage.jpg'
import Icon from './Images/DeviceCareLogo1.png';
import feather from 'feather-icons';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import buildConfirmDialog from "./confirmactiondialog";
import buildSuccessDialog from "./successdialog";
import buildCautionDialog from "./cautiondialog";


export default async function buildForgotPasswordPage(){

    clearContent(document.querySelector('.mbody'));

    let dom = await elt('div',{className:'transition-all main-body login-page flex items-center min-h-screen bg-gray-50'},
                elt('div',{className:'flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl'},
                        elt('div',{className:'flex flex-col md:flex-row'},
                                elt('div',{className:'h-32 md:h-auto md:w-1/2'},
                                    elt('img',{className:'flank-img object-cover w-full h-full', src: loginflankimg,alt:'flanking-image'}),
                                    ),
                                elt('div',{className:'flex main-content items-center justify-center p-6 sm:p-12 md:w-1/2'},
                                    elt('form',{className:'w-full',async onsubmit(event){

                                            let emailvalue = document.querySelector('#emailfield').value.toString();
                                            
                                            const auth = getAuth();
                                            sendPasswordResetEmail(auth, emailvalue)
                                            .then(() => {

                                                buildSuccessDialog('A reset link has been sent to '+emailvalue);
                                                stopButtonLoading('signinbutton','Reset Password')
                                                // Password reset email sent!
                                                // ..
                                            })
                                            .catch((error) => {
                                                const errorCode = error.code;
                                                const errorMessage = error.message;
                                                buildCautionDialog(errorMessage);
                                                // ..
                                            });
  
                                            
                                            event.preventDefault();
                                        // document.querySelector('.main-content').appendChild(buildLoadingModal());
                                            initializeButtonLoading('signinbutton');
                                            
                                            
                                    }},
                                        elt('div',{className:'flex justify-center'},
                                            elt('img',{src:Icon ,className:'device-care-logo w-15 mx-auto',alt:'devicecare logo'})),
                                        elt('h1',{className:'mb-4 text-xl font-bold text-center text-gray-700'},'Forgot Your Password?'),
                                        elt('p',{className:'mt-2 text-center text-sm text-gray-700'},`We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!`),
                                        elt('p',{className:'mt-2 text-center text-sm text-gray-700'}, 'Or ',
                                            elt('a',{href:'#',className:'text-sm text-blue-600 hover:underline',async onclick(event){
                                                
                                                // document.body.removeChild(document.body.firstChild);
                                                event.preventDefault();
                                                document.querySelector('#loadingmodal').classList.remove('hidden');
                                                document.querySelector('.mbody').appendChild(await buildSignUpPage());
                                                
                                            }},'click here to register')),
                                        elt('div',{},
                                            elt('label',{className:'block text-sm'},'Email'),
                                            elt('input',{id:'emailfield',required:true,type:'email',placeholder:'',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600',oninput(event){
                                                document.querySelector('.errormessage').classList.add('hidden');
                                            }})),
                                        
                                        elt('p',{className:'mt-4'},
                                            elt('a',{className:'text-sm text-blue-600 hover:underline', href:'#',async onclick(event){
                                                event.preventDefault();
                                                document.querySelector('.mbody').appendChild(await buildLoginPage());
                                            }},
                                                'Already have a corporate account? Sign in')),
                                        
                                        elt('button',{type:'submit',id: 'signinbutton',async onclick(event){
                                            console.log('clicked')
                                        },className:'signinbutton block  group relative w-full flex justify-center px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue'},
                                            new DOMParser().parseFromString(
                                                                feather.icons['arrow-right'].toSvg(),
                                                                'image/svg+xml',
                                                              ).querySelector('svg')
                                                                ,'Reset Password'
                                        )                                            
                                    )
                                    
                                    
                                    
                                )
                        )
                )
            )
            document.querySelector('#loadingmodal').classList.add('hidden');
            return dom;
}

function initializeButtonLoading(classs){
    let domObj = document.querySelector(`.${classs}`);
    clearContent(domObj) 
    domObj.appendChild(new DOMParser().parseFromString(
        feather.icons['loader'].toSvg({class:'animate-spin'}),
        'image/svg+xml',
      ).querySelector('svg'))
    
    // document.querySelector('svg').classList.add('');
    document.querySelector(`.${classs}`).disabled = true;
}

function stopButtonLoading(classs,textt){
    let domObj = document.querySelector(`.${classs}`);
    clearContent(domObj) 
    domObj.appendChild(new DOMParser().parseFromString(
        feather.icons['arrow-right'].toSvg(),
        'image/svg+xml',
      ).querySelector('svg'))
    domObj.appendChild(document.createTextNode(textt));
    // document.querySelector('svg').classList.add('animate-spin');
    document.querySelector(`.${classs}`).disabled = false;
}