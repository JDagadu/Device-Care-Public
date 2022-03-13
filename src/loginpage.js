import {elt} from './domelementbuilder'
import buildSignUpPage from './signuppage'
import Icon from './Images/DeviceCareLogo1.png';
// import background from './Images/b4.jpg'
import loginflankimg from './Images/loginflankimg.jpg'
import feather from 'feather-icons'
import { clearContent } from './utilities';
import buildLoadingModal from './loadingmodaldialog';
import { db, signIn } from './firebasesrc';
import { getIndustriesTypes } from './datamanager';
import buildLandingDashboard from './landingDashboard';
import { doc, getDoc } from "firebase/firestore";
import buildOnboardingPage, { AssitiveText, fillInPin, pinVerificationFormFeedbackText, stepFormReplacement } from './onboardingpage';
// import { copy } from 'request/lib/helpers';

let changes =0;
 export default  async function buildLoginPage() 

{
    // console.log((await getIndustriesTypes())[0].industryTypes ) //.then(doc=>console.log(doc[0].industryTypes))
    //  getBusinessTypes().then((snapshot)=>snapshot.forEach((doc)=>{
    //      console.log(doc.data());
    //  }));
    
    clearContent(document.querySelector('.mbody'));
    // document.querySelector('#loadingmodal').classList.add('hidden');
    let dom = await elt('div',{className:'transition-all main-body login-page flex items-center min-h-screen bg-gray-50'},
                elt('div',{className:'flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl'},
                        elt('div',{className:'flex flex-col md:flex-row'},
                                elt('div',{className:'h-32 md:h-auto md:w-1/2'},
                                    elt('img',{className:'flank-img object-cover w-full h-full', src: loginflankimg,alt:'flanking-image'}),
                                    ),
                                elt('div',{className:'flex main-content items-center justify-center p-6 sm:p-12 md:w-1/2'},
                                    elt('form',{className:'w-full',async onsubmit(event){

                                            let emailvalue = document.querySelector('#emailfield').value.toString();
                                            let passwordvalue = document.querySelector('#passwordfield').value.toString();
                                            
                                            event.preventDefault();
                                        // document.querySelector('.main-content').appendChild(buildLoadingModal());
                                            initializeButtonLoading('signinbutton');
                                            let signinreturn = await signIn(emailvalue,passwordvalue);
                                            if(signinreturn.uid){
                                                const docRef = doc(db,"corporateUser",signinreturn.uid)
                                                const docSnap = await getDoc(docRef);
                                                if(docSnap.exists()){
                                                    // console.log(docSnap.data())
                                                    const corporateDoc = await getDoc(doc(db,"corporate",docSnap.data().corporateId))
                                                    if(corporateDoc.exists()){
                                                        if(corporateDoc.data().isVerified){
                                                            document.querySelector('.mbody').append(await buildLandingDashboard(signinreturn));
                                                        }else{
                                                            
                                                            var myHeaders = new Headers();
                                            
                                            myHeaders.append("Content-Type", "application/json");
                                            let finalcomp  = JSON.parse(localStorage.getItem('finalCompany'))
                                            var raw = {'email':finalcomp.email,'type':'C'};
                                            console.log(JSON.stringify(raw))
                                            var requestOptions = {
                                            method: 'POST',
                                            headers: myHeaders,
                                            body: JSON.stringify(raw),
                                            redirect: 'follow'
                                            };

                                            fetch("https://us-central1-devicecare-652a9.cloudfunctions.net/resendOTP", requestOptions)
                                            .then(response => response.text())
                                            .then(async result =>{
                                                console.log(result);
                                                let resultObj= JSON.parse(result)
                                                if(resultObj.message == 'Success'){
                                                    let user = docSnap.data()
                                                            let corp = corporateDoc.data()
                                                            let compProf = {
                                                                'Email':user.email,
                                                                'First name':user.firstname,
                                                                'Other names':user.othernames,
                                                                'Phone': user.phoneNumber,
                                                                'Job title':user.jobTitle,
                                                                'Ghana card number': user.idNumber,
                                                                'Gender':user.gender,
                                                                'Company name':corp.name,
                                                                'Company address':corp.address,
                                                                'Business type': corp.businessType,
                                                                'Corporate email':corp.email,
                                                                'GP Address': corp.GPAddress,
                                                                'Corporate phone':corp.phoneNumber,
                                                                'Comments':corp.comments}
                                                            localStorage.setItem('companyProfile',JSON.stringify(compProf))
                                                            
                                                            localStorage.setItem('finalCompany',JSON.stringify(
                                                                {
                                                                    name:compProf['Company name'],
                                                                    address:compProf['Company address'],
                                                                    businessType:compProf['Business type'],
                                                                    email:compProf['Corporate email'],
                                                                    GPAddress:compProf['GP Address'],
                                                                    phoneNumber:compProf['Corporate phone'],
                                                                    comments:compProf['Comments'],
                                                                    users: [{
                                                                        firstname: compProf['First name'],
                                                                        othernames: compProf['Other names'],
                                                                        email: compProf['Email'],
                                                                        jobTitle: compProf['Job title'],
                                                                        phoneNumber:compProf['Phone'],
                                                                        idType: 'GhanaCard',
                                                                        idNumber: compProf['Ghana card number'],
                                                                        password:compProf['password'],
                                                                        gender:compProf['Gender']
                                                                    }]
                                                                }
                                                            ))


                                                    document.querySelector('.mbody').append( await buildOnboardingPage({isVerified:false}));
                                                    let buttonhouse = document.querySelector('.button-house')
                                                    buttonhouse.insertBefore(pinVerificationFormFeedbackText(),buttonhouse.firstChild);
                                                    document.querySelector('.step-house').innerHTML = ''
                                                document.querySelector('.step-house').append(...stepFormReplacement(4));
                                                AssitiveText('Please verify your account');
                                                fillInPin();
                                                    
                                                    // AssitiveText('Please verify your account');
                                                    // document.querySelector('#caution-modal').classList.add('hidden');
                                                    // getCorporateFieldData();
                                                    // replaceNextForm(Array.from(document.querySelector('form').firstChild.classList)[1],pinVerificationForm(),'submit');
                                                    // document.querySelector('.step-house').innerHTML = ''
                                                    // document.querySelector('.step-house').append(...stepFormReplacement());
                                                    // fillInPin();
                                                }
                                            }
                                                )
                                            .catch(error => {
                                                // document.querySelector('#loadingmodal').classList.add('hidden');
                                                console.log('error', error);
                                                stopButtonLoading('signinbutton','Sign in');

                                                
                                            })

                                                           
                                                        }
                                                    }else{
                                                        
                                                        console.log('Company Document does not exist')
                                                        stopButtonLoading('signinbutton','Sign in');

                                                    // stopButtonLoading('signinbutton','Sign in');

                                                    }
                                                    
                                                    // document.querySelector('.mbody').append(buildLandingDashboard(signinreturn));
                                                }else{
                                                    console.log('User Data does not exist');
                                                    stopButtonLoading('signinbutton','Sign in');

                                                }
                                                
                                                // document.querySelector('.loading-ui').classList.add('hidden')
                                            }else{
                                                let domObj = document.querySelector('.errormessage')
                                                clearContent(domObj);
                                                domObj.appendChild(document.createTextNode( signinreturn));
                                                stopButtonLoading('signinbutton','Sign in');
                                            }
                                    }},
                                        elt('div',{className:'flex justify-center'},
                                            elt('img',{src:Icon ,className:'device-care-logo w-15 mx-auto',alt:'devicecare logo'})),
                                        elt('h1',{className:'mb-4 text-xl font-bold text-center text-gray-700'},'Sign into your Corporate Account'),
                                        elt('p',{className:'mt-2 text-center text-sm text-gray-700'}, 'Or ',
                                            elt('a',{href:'#',className:'text-sm text-blue-600 hover:underline',async onclick(event){
                                                
                                                // document.body.removeChild(document.body.firstChild);
                                                event.preventDefault();
                                                document.querySelector('#loadingmodal').classList.remove('hidden');
                                                document.querySelector('.mbody').appendChild(await buildSignUpPage());
                                                
                                            }},'click here to register')),
                                        elt('div',{},
                                            elt('label',{className:'block text-sm'},'Email'),
                                            elt('input',{id:'emailfield',required:true,type:'email',placeholder:'',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
                                        elt('div',{},
                                            elt('label',{className:'block text-sm'},'Password'),
                                            elt('div',{className:'relative inset-y-0 w-full right-0 flex flex-row-reverse items-center'},
                                            elt('input',{oninput(event){
                                                    ++changes;
                                                    if(changes == 1 ) addOnClickListenerPassToggle(event.target);
                                                    if(event.target.value.length >0 ){
                                                        // console.log('here')
                                                        // document.querySelector('.labeltoggle').classList.remove('hidden');
                                                        // let passvisibility =  document.querySelector('.toggle-visible-pass');
                                                        // let passnonvisible  = document.querySelector('.toggle-novisible-pass');
                                                        // passvisibility.classList.remove('hidden');
                                                        // console.log(passvisibility.classList.contains('hidden'))
                                                        // if(Array.from(passvisibility.classList).indexOf('hidden')!==-1){

                                                        //     passnonvisible.classList.remove('hidden')
                                                        // }else{
                                                        //     passnonvisible.classList.add('hidden');
                                                        // }
                                                        
                                                        

    
                                                    }else{
                                                        
                                                        // document.querySelectorAll('.toggle-pass-vis').forEach((ele)=>{
                                                        //     ele.classList.add('hidden');
                                                        // })
                                                        // document.querySelector('.labeltoggle').classList.add('hidden');
                                                    }
                                                    
                                            },id:'passwordfield',required:true,type:'password',placeholder:'',className:' w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'}),
                                                elt('input',{id: 'toggle',className:'absolute right-0 pass-visibility hidden z-50 password-toggle-checkbox',type:'checkbox'}),
                                                elt('label',{onclick(event){
                                                    let target = document.querySelector('#passwordfield');
                                                    document.querySelectorAll('.toggle-pass-vis').forEach((ele)=>{
                                                        ele.classList.toggle('hidden'); 
                                                        
                                                        
                                                        
                                                    })

                                                    
                                                        console.log(target.type,'password')
                                                        if(target.type == 'password'){
                                                            console.log('trigger')
                                                            target.type = 'text'
                                                        }
                                                        
                                                        else if(target.type == 'text'){
                                                            console.log('trigger')
                                                            target.type ='password'
                                                        }
                                                        target.focus();
                                                },for:'toggle' ,className:'absolute labeltoggle pass-visibility hover:text-gray-400 z-50 rounded px-2 py-1 text-sm text-gray-600 cursor-pointer password-toggle-checkbox-label'},new DOMParser().parseFromString(
                                                    feather.icons['eye'].toSvg({class:'toggle-visible-pass toggle-pass-vis text-xs px-1'}),
                                                    'image/svg+xml',
                                                  ).querySelector('svg'),
                                                  new DOMParser().parseFromString(
                                                    feather.icons['eye-off'].toSvg({class:'toggle-novisible-pass hidden toggle-pass-vis text-xs px-1'}),
                                                    'image/svg+xml',
                                                  ).querySelector('svg')
                                                  )
                                                )
                                            ,
                                            elt('p',{className:'mt-2 errormessage hidden text-xs text-red-600'},'Incorrect email and / or password.')),
                                        elt('p',{className:'mt-4'},
                                            elt('a',{className:'text-sm text-blue-600 hover:underline', href:'#'},
                                                'Having trouble signing in?')),
                                        
                                        elt('button',{type:'submit',id: 'signinbutton',async onclick(event){
                                            console.log('clicked')
                                        },className:'signinbutton block  group relative w-full flex justify-center px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue'},
                                            new DOMParser().parseFromString(
                                                                feather.icons['arrow-right'].toSvg(),
                                                                'image/svg+xml',
                                                              ).querySelector('svg')
                                                                ,'Sign in'
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

function addOnClickListenerPassToggle(target){
    
    document.querySelectorAll('.toggle-pass-vis').forEach((ele)=>{
        ele.addEventListener('click',(event)=>{

            // event.target.classList.
            
        })
    })
    // console.log('here')
    
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
// elt('div',{className:'login-container-main min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'},
// elt('div',{className:'max-w-md w-full space-y-8'},
//     elt('div',{},
//         elt('img',{src:Icon ,className:'device-care-logo mx-auto',alt:'devicecare logo'}),
//         elt('h2',{className:'header-sgn-in mt-6 text-center text-3xl font-extrabold text-gray-900'},'Sign in to your account'),
//         elt('p',{className:'mt-2 text-center text-sm text-gray-600'}, 'Or ',
//             elt('a',{href:'#',className:'font-medium text-indigo-600 hover:text-indigo-500'},'click here to register'))),
//     elt('form',{className:'sign-in-form mt-8 space-y-6',action:'#', method:'POST'},
//         elt('input',{type:'hidden',name:'remember',value:true}),
//         elt('div',{className:'rounded-md shadow-sm -space-y-px'},
//             elt('div',{},
//                 elt('label',{for:'email-address-field',className:'label-email-input sr-only'},'Email address'),
//                 elt('input',{placeholder: 'Email Address',id:'email-address-field',className:'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',name:'email',type:'email',autocomplete:'email', required:true})
//             ),
//             elt('div',{},
//             elt('label',{for:'password-field',className:'label-password-input sr-only'},'Password'),
//             elt('input',{placeholder: 'Password',id:'password',className:'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',name:'password',type:'password',autocomplete:'current-password', required:true})
//             )
//         ),
//         elt('div',{className:'flex items-center justify-between'},
//             elt('div',{className:'flex items-center'},
//                 elt('input',{id:'remember-me-checkbox',name:'remember-me',type:'checkbox',className:'h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'}),
//                 elt('label',{for:'remember-me-checkbox',className:'ml-2 block text-sm text-gray-900'},'Remember me')),
//             elt('div',{className:'text-sm'},
//                 elt('a',{href:'#',className:'forgot-password-link font-medium text-indigo-600 hover:text-indigo-500'},'Forgot your password?'))),
//             elt('div',{},
//                 elt('button',{type:'submit',className:'log-in-button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'},
//                 new DOMParser().parseFromString(
//                     feather.icons['arrow-right'].toSvg(),
//                     'image/svg+xml',
//                   ).querySelector('svg')
//                     ,'Sign in'))
//         )
//     )
// )