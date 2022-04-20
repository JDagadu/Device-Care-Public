import {elt} from './domelementbuilder'
import Icon from './Images/DeviceCareLogo1.png';
import buildLoginPage from './loginpage';
import background from './Images/background.jpg'
import loginflankimg from './Images/desk.jpg'
import feather from 'feather-icons'
// import buildLoginPage from './loginpage';
import { clearContent } from './utilities';
import buildOnboardingPage from './onboardingpage';
import buildLoadingModal from './loadingmodaldialog';


export default function buildSignUpPage() 

{
    clearContent(document.querySelector('.mbody'));
    let dom =  elt('div',{className:'main-body sign-up-page flex items-center min-h-screen bg-gray-50'},
                elt('div',{className:'flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl'},
                        elt('div',{className:'flex flex-col md:flex-row'},
                                elt('div',{className:'h-32 md:h-auto md:w-1/2'},
                                    elt('img',{className:'flank-img object-cover w-full h-full', src: loginflankimg,alt:'flanking-image'}),
                                    ),
                                elt('div',{className:'flex items-center justify-center p-6 sm:p-12 md:w-1/2'},
                                    elt('form',{className:'w-full',async onsubmit(event){
                                        
                                        event.preventDefault();
                                        let emailvalue = document.querySelector('#emailet').value
                                        let passwordvalue = document.querySelector('#passwordet').value
                                        let confirmpasswordvalue = document.querySelector('#passwordet').value

                                        if(passwordvalue==confirmpasswordvalue){
                                            localStorage.setItem('companyProfile',JSON.stringify({
                                                Email:emailvalue,
                                                password:passwordvalue
                                            }));

                                            clearContent(document.querySelector('.mbody'));
                                            document.querySelector('#loadingmodal').classList.remove('hidden');
                                            let onboardingpage = await buildOnboardingPage({isVerified:false});
                                            console.log(onboardingpage)
                                            document.querySelector('.mbody').appendChild(onboardingpage);

                                        }

                                        
                                        




                                        // document.body.appendChild(buildOnboardingPage());

                                        //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$

                                    }},
                                        elt('div',{className:'flex justify-center'},
                                            elt('img',{src:Icon ,className:'device-care-logo w-15 mx-auto',alt:'devicecare logo'})),
                                        elt('h1',{className:'mb-4 text-xl font-bold text-center text-gray-700'},'Register your Corporate Account'),
                                        // elt('p',{className:'mt-2 text-center text-sm text-gray-700'}, '',
                                        //     elt('a',{href:'#',className:'text-sm text-blue-600 hover:underline'},'click here to register')),
                                        
                                        elt('div',{},
                                            elt('label',{className:'block text-sm'},'Email'),
                                            elt('input',{required:true, id:'emailet',type:'email',placeholder:'',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
                                        elt('div',{className:'mt-2'},
                                            elt('label',{className:'block text-sm'},'Password'),
                                            elt('div',{className:'flex justify-center items-center'},
                                            elt('div',{className:'relative inset-y-0 w-full right-0 flex flex-row-reverse items-center'},
                                                elt('input',{required:true,oninput(event){
                                                if(event.target.value.length > 0){
                                                    document.querySelector('.labeltoggle').classList.remove('hidden');
                                                    // let passvisibility =  document.querySelector('.toggle-visible-pass');
                                                        // passvisibility.classList.remove('hidden');
                                                    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(event.target.value)){
                                                        
                                                        document.querySelector('.pass-load-match').classList.add('hidden');
                                                        document.querySelector('.pass-req-match').classList.remove('hidden');
                                                        document.querySelector('.message').classList.add('hidden');

                                                    }else{
                                                        console.log('here')
                                                        document.querySelector('.pass-load-match').classList.remove('hidden');
                                                        document.querySelector('.pass-req-match').classList.add('hidden');
                                                        
                                                    }
                                                }else {
                                                    // console.log('here4')
                                                    document.querySelector('.pass-load-match').classList.add('hidden');
                                                    // document.querySelectorAll('.toggle-pass-vis').forEach((ele)=>{
                                                    //     ele.classList.add('hidden');
                                                    // })
                                                    // document.querySelector('.labeltoggle').classList.add('hidden');
                                                }
                                                
                                            },id:'passwordet',type:'password',placeholder:'',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"'}),
                                            elt('input',{id: 'passtoggle',className:'absolute right-0 pass-visibility hidden z-50 password-toggle-checkbox',type:'checkbox'}),
                                            elt('label',{onclick(event){
                                                let target = document.querySelector('#passwordet');
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
                                                feather.icons['eye'].toSvg({class:'toggle-visible-pass toggle-pass-vis  text-xs px-1'}),
                                                'image/svg+xml',
                                              ).querySelector('svg'),
                                              new DOMParser().parseFromString(
                                                feather.icons['eye-off'].toSvg({class:'toggle-novisible-pass hidden toggle-pass-vis text-xs px-1'}),
                                                'image/svg+xml',
                                              ).querySelector('svg')
                                              ))
                                                ,
                                                new DOMParser().parseFromString(
                                                    feather.icons['thumbs-up'].toSvg({class:'hidden success pass-req-match text-green-500 text-xs px-1'}),
                                                    'image/svg+xml',
                                                  ).querySelector('svg'),
                                                new DOMParser().parseFromString(
                                                    feather.icons['loader'].toSvg({class:'hidden animate-spin loading pass-load-match text-gray-500 text-xs px-1'}),
                                                    'image/svg+xml',
                                                  ).querySelector('svg'))
                                            ,
                                            elt('p',{className:'mt-2 italic message text-xs text-gray-600'},'Your password must be at least 8 characters long and contain at least: 1 Uppercase letter, 1 Lowercase letter and 1 digit and a special character.')),
                                        elt('div',{className:'mt-2 '},
                                            elt('label',{className:'block text-sm'},'Confirm Password'),

                                            elt('div',{className:'flex justify-center items-center'},
                                            elt('div',{className:'relative inset-y-0 w-full right-0 flex flex-row-reverse items-center'},
                                            elt('input',{required:true,oninput(event){
                                                console.log(document.querySelector('#passwordet').value,event.target.value)
                                                if(event.target.value.length > 0){
                                                    document.querySelector('.conflabeltoggle').classList.remove('hidden');
                                                    // let passvisibility =  document.querySelector('.conf-toggle-pass-vis');
                                                        // passvisibility.classList.remove('hidden');
                                                    if (document.querySelector('#passwordet').value ==(event.target.value)){
                                                        
                                                        document.querySelector('.confirm-load-match').classList.add('hidden');
                                                        document.querySelector('.confirm-success').classList.remove('hidden');
                                                        document.querySelector('.message-cp').classList.add('hidden');
                                                    }else{

                                                        document.querySelector('.confirm-load-match').classList.remove('hidden');
                                                        document.querySelector('.confirm-success').classList.add('hidden');
                                                        document.querySelector('.message-cp').classList.remove('hidden');
                                                        
                                                    }
                                                }else{
                                                    document.querySelector('.confirm-load-match').classList.add('hidden');
                                                    // document.querySelectorAll('.conf-toggle-pass-vis').forEach((ele)=>{
                                                    //     ele.classList.add('hidden');
                                                    // })
                                                    // document.querySelector('.message-cp').classList.add('hidden');
                                                    // document.querySelector('.conflabeltoggle').classList.add('hidden');
                                                }
                                            },id:'confirmpasswordet',type:'password',placeholder:'',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"'}),
                                            elt('input',{id: 'conftoggle',className:'absolute right-0 hidden pass-visibility z-50 password-toggle-checkbox',type:'checkbox'}),
                                            elt('label',{onclick(event){
                                                let target = document.querySelector('#confirmpasswordet');
                                                document.querySelectorAll('.conf-toggle-pass-vis').forEach((ele)=>{
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
                                            },for:'toggle' ,className:'absolute conflabeltoggle  pass-visibility hover:text-gray-400 z-50 rounded px-2 py-1 text-sm text-gray-600 cursor-pointer password-toggle-checkbox-label'},new DOMParser().parseFromString(
                                                feather.icons['eye'].toSvg({class:'toggle-visible-pass conf-toggle-pass-vis text-xs px-1'}),
                                                'image/svg+xml',
                                              ).querySelector('svg'),
                                              new DOMParser().parseFromString(
                                                feather.icons['eye-off'].toSvg({class:'toggle-novisible-pass hidden conf-toggle-pass-vis text-xs px-1'}),
                                                'image/svg+xml',
                                              ).querySelector('svg')
                                              )
                                            )
                                            ,
                                            new DOMParser().parseFromString(
                                                feather.icons['thumbs-up'].toSvg({class:'hidden success confirm-success text-green-500 text-xs px-1'}),
                                                'image/svg+xml',
                                              ).querySelector('svg'),
                                              new DOMParser().parseFromString(
                                                feather.icons['loader'].toSvg({class:'hidden animate-spin loading confirm-load-match text-gray-500 text-xs px-1'}),
                                                'image/svg+xml',
                                              ).querySelector('svg')),
                                              elt('p',{className:'mt-2 message-cp text-xs text-red-600 hidden'},'Password confirmation does not match password.')
                                              )
                                            
                                            ,
                                        elt('p',{className:'mt-4 '},
                                            elt('a',{className:'text-sm text-blue-600 hover:underline', href:'#',async onclick(event){
                                                event.preventDefault();
                                                document.body.appendChild(await buildLoginPage());
                                            }},
                                                'Already have an account? Sign in')),
                                        elt('button',{type:'submit',id: 'signinbutton',onclick(event){
                                            
                                        },className:'signinbutton block  group relative w-full flex justify-center px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue'},
                                            new DOMParser().parseFromString(
                                                                feather.icons['arrow-right'].toSvg(),
                                                                'image/svg+xml',
                                                              ).querySelector('svg')
                                                                ,'Register'
                                        )                                            
                                    )
                                    
                                    
                                    
                                )
                        )
                )
            )
            document.querySelector('#loadingmodal').classList.add('hidden');
            return dom;
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