import { elt } from "./domelementbuilder";
import { clearContent } from "./utilities";
import Icon from './Images/DeviceCareLogo1.png';
import feather from 'feather-icons'

export default function buildPaymentGatewayForm(){
    //elt('div',{id:'loadingmodal',className:'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'},
    clearContent(document.querySelector('.main-content'));
    return    elt('form',{action:'https://checkout.paywithonline.com/', className:'w-1/2 ',async onsubmit(event){

    //     let emailvalue = document.querySelector('#emailfield').value.toString();
    //     let passwordvalue = document.querySelector('#passwordfield').value.toString();
        
    //     event.preventDefault();
    // // document.querySelector('.main-content').appendChild(buildLoadingModal());
    //     initializeButtonLoading('signinbutton');
    //     let signinreturn = await signIn(emailvalue,passwordvalue);
    //     if(signinreturn == true){
    //         stopButtonLoading('signinbutton','Sign in');
    //         // document.querySelector('.loading-ui').classList.add('hidden')
    //     }else{
    //         let domObj = document.querySelector('.errormessage')
    //         clearContent(domObj);
    //         domObj.appendChild(document.createTextNode(await signinreturn));
    //         stopButtonLoading('signinbutton','Sign in');
    //     }
}},
    elt('div',{className:'flex justify-center'},
        elt('img',{src:Icon ,className:'device-care-logo w-15 mx-auto',alt:'devicecare logo'})),
    // elt('h1',{className:'mb-4 text-xl font-bold text-center text-gray-700'},'Sign into your Corporate Account'),
    // elt('p',{className:'mt-2 text-center text-sm text-gray-700'}, 'Or ',
    //     elt('a',{href:'#',className:'text-sm text-blue-600 hover:underline',onclick(event){
            
    //         // document.body.removeChild(document.body.firstChild);
    //         event.preventDefault();
    //         document.body.appendChild(buildLoadingModal());
    //         document.body.appendChild(buildSignUpPage());
            
    //     }},'click here to register')),
    elt('div',{},
        // elt('label',{className:'block text-sm'},'Email'),
        elt('input',{name:'merchant_key', value:'tk_5a2ac262-da6b-11eb-98ae-f23c9170642f',id:'merchid',type:'hidden',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'}),
        elt('input',{name:'success_url', value:'',id:'success_url',type:'hidden',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'}),
        elt('input',{name:'cancelled_url', value:'',id:'cancelled_url',type:'hidden',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'}),
        elt('input',{name:'ipn_url', value:'',id:'ipn_url',type:'hidden',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
        
    elt('div',{},
        elt('label',{className:'block text-sm'},'Invoice ID'),
        elt('input',{name:'invoice_id', value:'',id:'invoice_id',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
        elt('div',{},
        elt('label',{className:'block text-sm'},'Name'),
        elt('input',{name:'extra_name', value:'',id:'extra_name',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
        elt('div',{},
        elt('label',{className:'block text-sm'},'Contact'),
        elt('input',{name:'extra_mobile', value:'',id:'extra_mobile',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
        elt('div',{},
        elt('label',{className:'block text-sm'},'Email'),
        elt('input',{name:'extra_email', value:'',id:'extra_email',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
        elt('div',{},
        elt('label',{className:'block text-sm'},'total'),
        elt('input',{name:'total', value:'',id:'total',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
    
    elt('button',{type:'submit',id: 'signinbutton',async onclick(event){
        console.log('clicked')
    },className:'signinbutton block  group relative w-full flex justify-center px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue'},
        new DOMParser().parseFromString(
                            feather.icons['arrow-right'].toSvg(),
                            'image/svg+xml',
                          ).querySelector('svg')
                            ,'Pay'
    )                                            
)
              // )
}

