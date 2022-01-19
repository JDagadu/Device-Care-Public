import { getGenderTypes, getIndustriesTypes } from "./datamanager";
import { elt } from "./domelementbuilder";
import Icon from './Images/DeviceCareLogo1.png';
import {clearContent} from './utilities'
import feather from 'feather-icons'
import { getFunctions, httpsCallable } from "firebase/functions";

let currentstep = 1;


export default async function buildOnboardingPage(){
    clearContent(document.querySelector('.mbody'))
    let dom =  elt('div',{className:'on-b m-0 w-full min-h-screen bg-blue bg-gray-50'},
            elt('div',{className:'pt-10'},
                elt('img',{src:Icon ,className:'device-care-logo w-15 mx-auto',alt:'devicecare logo'}),
                elt('h2',{className:'mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-6'},'Create a Corporate Account'), 
                elt('p',{className:'max-w-screen-md mx-auto text-center assitive-text text-gray-500 md:text-lg'},'Please fill in with authorized representative data')
                ),
            elt('div',{className:'text-gray-600 h-full'},
                elt('div',{className:'container w-1/2 h-full  flex flex-col flex-wrap px-5 py-2 mx-auto rounded-t'},
                    elt('div',{className:'step-house flex flex-wrap mx-auto'},
                        elt('a',{className:'step-ind step-ind-active step-ind-1 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-indigo-500 text-indigo-500 bg-gray-100 rounded-t sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 1'),
                        elt('a',{className:'step-ind step-ind-2 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 2'),
                        elt('a',{className:'step-ind step-ind-3 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 3'),
                        elt('a',{className:'step-ind step-ind-3 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 4')
                        
                    ),
                    elt('div',{className:'flex flex-col h-full w-full for-confirmation text-center'},
                        elt('div',{className:'py-6 shadow-md h-full bg-white sm:py-8 lg:py-12'},
                            elt('div',{className:'px-4 mx-auto max-w-screen-2xl md:px-8'},
                                elt('form',{className:'max-w-screen-md mx-auto',async onsubmit(event){
                                    event.preventDefault();
                                    let currentstepcheck = currentstep+ 1
                                    if( currentstepcheck== 2){
                                        if(document.querySelector('#gender').options[document.querySelector('#gender').selectedIndex].value=='none'){
                                            document.querySelector('.caution-select').classList.remove('hidden');
                                        }else{

                                        getAuthorizedFieldData();
                                        AssitiveText('Kindly tell us about the company you represent');
                                        replaceNextForm(Array.from(document.querySelector('form').firstChild.classList)[1],await corporateDataForm(),'submit');
                                        document.querySelector('.step-house').innerHTML = ''
                                        document.querySelector('.step-house').append(...stepFormReplacement());

                                        }
                                        
                                    }else if(currentstepcheck == 3){
                                        if(document.querySelector('#businesstype').options[document.querySelector('#businesstype').selectedIndex].value=='none'){
                                            document.querySelector('.caution-select').classList.remove('hidden');
                                        }else{
                                            AssitiveText('Kindly confirm details match information provided');
                                            getCorporateFieldData();
                                            replaceNextForm(Array.from(document.querySelector('form').firstChild.classList)[1],confirmationDetailsForm(),'submit');
                                            document.querySelector('.step-house').innerHTML = ''
                                            document.querySelector('.step-house').append(...stepFormReplacement());
                                            // fillInPin();
                                        }
                                        
                                    }else if(currentstepcheck == 4){
                                        // if(document.querySelector('#businesstype').options[document.querySelector('#businesstype').selectedIndex].value=='none'){
                                        //     document.querySelector('.caution-select').classList.remove('hidden');
                                        // }else{
                                            AssitiveText('Please verify your account');
                                            // getCorporateFieldData();
                                            replaceNextForm(Array.from(document.querySelector('form').firstChild.classList)[1],pinVerificationForm(),'submit');
                                            document.querySelector('.step-house').innerHTML = ''
                                            document.querySelector('.step-house').append(...stepFormReplacement());
                                            fillInPin();
                                        // }
                                        
                                    }else if(currentstepcheck == 5 ){
                                       console.log(Array.from(document.querySelectorAll('.pin')).map((ele,num)=>{
                                        return ele.value
                                    }).join('')) ;
                                    }
                                    
                                    console.log('submit',currentstep,currentstepcheck)
                                }},
                                await authorizedDataForm(),
                                        
                                        
                                        
                                    
                                    elt('div',{className:'button-house flex  items-center justify-between pt-10'},
                                        elt('button',{type:'button' ,id:'form-back-button' ,className:'hidden inline-flex items-center px-6 py-2 text-sm text-gray-800 rounded-lg shadow outline-none gap-x-1 hover:bg-gray-100',async onclick(event){
                                            // switchBackwardActiveStep();
                                            
                                            let currentstepcheck = currentstep- 1
                                            if( currentstepcheck== 3){
                                                AssitiveText('Kindly confirm details match information provided');
                                                replaceNextForm(Array.from(document.querySelector('form').firstChild.classList)[1],await confirmationDetailsForm(),'back');
                                                document.querySelector('.step-house').innerHTML = ''
                                                document.querySelector('.step-house').append(...stepFormReplacement());
                                            }
                                            else if( currentstepcheck== 2){
                                                AssitiveText('Kindly tell us about the company you represent');
                                                replaceNextForm(Array.from(document.querySelector('form').firstChild.classList)[1],await corporateDataForm(),'back');
                                                document.querySelector('.step-house').innerHTML = ''
                                                document.querySelector('.step-house').append(...stepFormReplacement());
                                            }else if(currentstepcheck == 1){
                                                AssitiveText('Please fill in with authorized representative data');
                                                replaceNextForm(Array.from(document.querySelector('form').firstChild.classList)[1],await authorizedDataForm(),'back');
                                                document.querySelector('.step-house').innerHTML = ''
                                                document.querySelector('.step-house').append(...stepFormReplacement());
                                            }
                                            console.log('back button cliked',currentstep,currentstepcheck)
                                        }},'back'),
                                        elt('button',{ type:'submit' ,id:'form-next-button', className:'px-6 py-2 text-sm text-white bg-indigo-500 rounded-lg outline-none hover:bg-indigo-600 ring-indigo-300',onclick(event){
                                            // console.log('clicked')
                                        }},'Next')))))))))

                                        document.querySelector('#loadingmodal').classList.add('hidden');
                                        return dom;

}

async function corporateDataForm(){
    let pinfeedback = document.querySelector('pin-feedback');
    if(pinfeedback){
        document.querySelector('.button-house').removeChild(pinfeedback);
    }
   
    return elt('div',{className:'field-container transition-all ease-out duration-500 corporate-data-form grid grid-cols-2 gap-4'},
                                        elt('div',{className:'flex flex-col col-span-2  mb-4'},
                                            elt('label',{ className:'inline-flex mb-2 text-sm text-gray-800',for:'name'},'Company Name'),
                                            elt('input',{required:true,type:'text',id:'companyname',name: 'companyname' ,className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
                                        elt('div',{className:'flex flex-col col-span-2 mb-4'},
                                            elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'phone'},'Company Physical Address'),
                                            elt('input',{required:true,type:'text',id:'companyaddress',name: 'companyaddress' ,className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
                                        elt('div',{className:'flex flex-col mb-2'},
                                            elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Type of Business'),
                                            elt('div',{className:'flex flex-row items-center justify-between'},elt('select',{onchange(){
                                                document.querySelector('.caution-select').classList.add('hidden');
                                            },id:'businesstype',name:'businesstype',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'},...(await addBusinessTypeOptions())),
                                            new DOMParser().parseFromString(
                                                feather.icons['alert-circle'].toSvg({class:'hidden caution-select text-red-500 text-xs px-1'}),
                                                'image/svg+xml',
                                              ).querySelector('svg'))
                                            ),
                                        elt('div',{className:'flex flex-col mb-2'},
                                            elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Email'),
                                            elt('input',{required:true,id:'corporateemail',type:'email',name:'corporateemail',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
                                        elt('div',{className:'flex flex-col mb-2'},
                                            elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'GP Address'),
                                            elt('input',{required:true,type:'text',id:'gpaddress',name:'gpaddress',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
                                        elt('div',{className:'flex flex-col mb-2'},
                                            elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Phone Number'),
                                            elt('input',{required:true,id:'corporatephone',type:'number',name:'corporatephone',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
                                        elt('div',{className:'flex flex-col  col-span-2 mb-2'},
                                            elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Comments'),
                                            elt('textarea',{id:'comments',name:'comments',rows:'4',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'}))
                                        )
}
function confirmationDetailsForm(){
    return elt('div',{className:'bg-white confirmation-page text-left overflow-hidden sm:rounded-lg'},
                elt('div',{className:'px-4 py-5 sm:px-6'},
                    elt('h3',{className:'text-lg leading-6 font-medium text-gray-900'},'Applicant Information'),
                    elt('p',{className:'mt-1 max-w-2xl text-sm text-gray-500'},'Personal details and company application confirmation.')
                ),
                elt('div',{className:'border-t border-gray-200'},
                    elt('dl',{},
                        ...confirmationDetailsListBuilding()
                    ))
            )
    
}
function confirmationDetailsListBuilding(){
    let details  = JSON.parse(localStorage.getItem('companyProfile'));
    // console.log()
    return Object.keys(details).map((ele,ind)=>{
        console.log(ele)
        
            if(ind%2==0){
        

                return elt('div',{className:'bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'},
                elt('dt',{className:'text-sm font-medium text-gray-500'},ele),
                elt('dd',{className:'mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'},details[ele])
            )
            }else {
               return elt('div',{className:'bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'},
                                elt('dt',{className:'text-sm font-medium text-gray-500'},ele),
                                elt('dd',{className:'mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'},details[ele])
                            )
    
            }

        
        
        
    });

}
async function authorizedDataForm(){
    let pinfeedback = document.querySelector('pin-feedback');
    if(pinfeedback){
        document.querySelector('.button-house').removeChild(pinfeedback);
    }
   
    return elt('div',{className:'field-container transition-all ease-out duration-500 authorized-data-form grid grid-cols-2 gap-4'},
    elt('div',{className:'flex flex-col mb-4'},
        elt('label',{ className:'inline-flex mb-2 text-sm text-gray-800',for:'name'},'First Name'),
        elt('input',{id:'firstname',required: true,name: 'firstname' ,className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
    elt('div',{className:'flex flex-col mb-4'},
        elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'phone'},'Other Names'),
        elt('input',{id:'othernames',required: true,name: 'othernames' ,className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
    // elt('div',{className:'flex flex-col mb-2'},
    //     elt('label',{id:'email',className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Email'),
    //     elt('input',{required: true,name:'email',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
    elt('div',{className:'flex flex-col mb-2'},
        elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Phone Number'),
        elt('input',{id:'phone',required: true,type:'number',name:'phone',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
    elt('div',{className:'flex flex-col mb-2'},
        elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Job Title'),
        elt('input',{id:'jobtitle',required: true,name:'jobtitle',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
    elt('div',{className:'flex flex-col mb-2'},
        elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Ghana Card Number'),
        elt('input',{id:'idcardnumber',required: true,name:'idcardnumber',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
    elt('div',{className:'flex flex-col mb-2'},
        elt('label',{className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Gender'),
        elt('div',{className:'flex flex-row items-center justify-between'},
        elt('select',{onchange(){
            document.querySelector('.caution-select').classList.add('hidden');
        },id:'gender',name:'gender',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'},...(await addGenderTypeOptions())
        ),new DOMParser().parseFromString(
            feather.icons['alert-circle'].toSvg({class:'hidden caution-select text-red-500 text-xs px-1'}),
            'image/svg+xml',
          ).querySelector('svg'))
        )
    )
    
}

function AssitiveText(text){
    let p  = document.querySelector('.assitive-text')
    clearContent(p) 
    p.append(document.createTextNode(text));
}

// function corporateAssistiveText(){
//     let p  = document.querySelector('.assitive-text')
//     clearContent(p) 
//     p.append(document.createTextNode('Kindly tell us about the company you represent'));
// }
// function pinAssistiveText(){
//     let p  = document.querySelector('.assitive-text')
//     clearContent(p) 
//     p.append(document.createTextNode('Verify your account'));
// }

function getAuthorizedFieldData(){
    let firstname = document.querySelector('#firstname').value
    let othernames = document.querySelector('#othernames').value
    // let email = document.querySelector('#email').value
    let phone = document.querySelector('#phone').value
    let jobtitle = document.querySelector('#jobtitle').value
    let idcardnumber = document.querySelector('#idcardnumber').value
    let gender = document.querySelector('#gender').options[document.querySelector('#gender').selectedIndex].value

    let userProfile = JSON.parse(localStorage.getItem('companyProfile'));
    userProfile = Object.assign(userProfile,{
        'First name':firstname,
        'Other names':othernames,
        'Phone': phone,
        'Job title':jobtitle,
        'Ghana card number': idcardnumber,
        'Gender':gender
    })
    // userProfile.firstname = firstname;
    // userProfile.othernames = othernames;
    // userProfile.phone = phone;
    // userProfile.jobtitle = jobtitle;
    // userProfile.idcardnumber = idcardnumber;
    // userProfile.gender = gender;

    localStorage.setItem('companyProfile',JSON.stringify(userProfile));
    console.log(localStorage.getItem('companyProfile'));
}

function getCorporateFieldData(){
    let companyname = document.querySelector('#companyname').value
    let companyaddress = document.querySelector('#companyaddress').value
    let businesstype = document.querySelector('#businesstype').options[document.querySelector('#businesstype').selectedIndex].value

    // let email = document.querySelector('#email').value
    let corporateemail = document.querySelector('#corporateemail').value
    let gpaddress = document.querySelector('#gpaddress').value
    let corporatephone = document.querySelector('#corporatephone').value
    let comments= document.querySelector('#comments').value 
    // let gender = document.querySelector('#gender').options[document.querySelector('#gender').selectedIndex].value

    let userProfile = JSON.parse(localStorage.getItem('companyProfile'));
    userProfile = Object.assign(userProfile,{
        'Company name':companyname,
        'Company address':companyaddress,
        'Business type': businesstype,
        'Corporate email':corporateemail,
        'GP Address': gpaddress,
        'Corporate phone':corporatephone,
        'Comments':comments
    })
    // userProfile.companyname = companyname;
    // userProfile.companyaddress = companyaddress;
    // userProfile.businesstype = businesstype;
    // userProfile.corporateemail = corporateemail;
    // userProfile.gpaddress = gpaddress;
    // userProfile.corporatephone = corporatephone;
    // userProfile.comments = comments;

    localStorage.setItem('companyProfile',JSON.stringify(userProfile));
    console.log(localStorage.getItem('companyProfile'));
}

function pinVerificationForm(){
    replaceBackButtonWithPinFeedback();
    
    return elt('div',{className:'field-container pin-verification-form'},
    elt('div',{className:'flex flex-col items-center justify-center mb-4'},
    new DOMParser().parseFromString(
        feather.icons['lock'].toSvg({class:'text-4xl px-1 font-bold hidden  h-15 w-15'}),
        'image/svg+xml',
      ).querySelector('svg'),
        
        // elt('label',{id:'firstname', className:'inline-flex mb-2 text-sm text-gray-800',for:'name'},'First Name'),
        elt('h2',{src: '' ,className:'font-bold text-2xl'},'Authenticate Your Account')),
    elt('div',{className:'flex flex-col justify-center mb-4'},
        // elt('label',{id:'othernames',className:'inline-flex mb-2 text-sm text-gray-800',for:'phone'},'Other Names'),
        elt('h3',{className:'text-sm px-10'},'Protecting your data is priority to us. Please confirm your account by entering the authorization pin sent to *******@samplemail.com.')),
    elt('div',{className:'flex flex-row justify-center mb-2'},
        // elt('label',{id:'email',className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Email'),
        elt('input',{name:'pin2',maxlength:'1', type:'number',id:'pin1',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'}),
        elt('input',{name:'pin3',maxlength:'1', type:'number',id:'pin2',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'}),
        elt('input',{name:'pin4',maxlength:'1', type:'number',id:'pin3',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'}),
        elt('input',{name:'pin1',maxlength:'1', type:'number',id:'pin4',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'}),
        elt('input',{name:'pin5',maxlength:'1', type:'number',id:'pin5',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'})),
    // elt('div',{className:'flex flex-col mb-2'},
    //     elt('label',{id:'phone',className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Phone Number'),
    //     elt('input',{name:'phone',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
    // elt('div',{className:'flex flex-col mb-2'},
    //     elt('label',{id:'jobtitle',className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Job Title'),
    //     elt('input',{name:'jobtitle',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
    // elt('div',{className:'flex flex-col mb-2'},
    //     elt('label',{id:'idcardnumber',className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Ghana Card Number'),
    //     elt('input',{name:'idcardnumber',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'})),
    // elt('div',{className:'flex flex-col mb-2'},
    //     elt('label',{id:'gender',className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Gender'),
    //     elt('select',{name:'gender',className:'w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring ring-indigo-300'}))
    )
}
function addEventListener(){
     
     document.querySelectorAll('.pin').forEach((ele,num)=>{
         ele.addEventListener('keyup',(event)=>{
             if(/[0-9]/.test(event.code) && (((num+1)+1)<= 5))
             document.querySelector(`#pin${(num+1)+1}`).focus();
         });

         ele.addEventListener('keydown',(event)=>{
            if(event.code=='Backspace'){
                
                if(event.target.value.length==0){
                    document.querySelector(`#pin${((num+1)-1)}`).focus();
                }else {
                    document.querySelector(`#pin${((num+1))}`).focus();
                }
                
            }




            
        })
     }

     )
    //  for(let i = 1; i<= 5;i++){
    //      pinarr.push(elt('input',{name:`pin${i}`,maxlength:'1', type:'number',id:`pin${i}`,className:'h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'}))
    //  }
    //  return pinarr;
}
function pinVerificationFormFeedbackText(){
    return elt('p',{className:'w-2/5 text-sm pin-feedback feedbacktext text-left'},`It may take a minute to receive your code. Haven't received it? `,
        elt('a',{className:'resend-code-link hover:underline text-blue-500 font-bold',href:'#'},`Resend a new code`) )

}

function fillInPin(){
    let pinlen = 5
    document.querySelector('#pin1').focus();
    addEventListener();

    // function stepForward(i) {
    //     if (document.getElementById(`codefield_${i}`).value && i != this.pinlength - 1) {
    //         document.getElementById(`codefield_${i+1}`).focus()
    //         document.getElementById(`codefield_${i+1}`).value = ''
    //     }
    // }

}

async function  addBusinessTypeOptions(){
//    let industrytypes =  (await getIndustriesTypes())[0].industryTypes
    let industrylist = [];
   industrylist.push(...(await getIndustriesTypes())[0].industryTypes.map((ele)=>{
    return elt('option',{className:`${ele}`},ele);
}))  
industrylist.unshift(elt('option',{className:`none`,value:'none',selected:true,disabled:true,hidden:true},'Select an Option'));
return industrylist;
}

async function  addGenderTypeOptions(){
    let genderlist = [];
    genderlist.push(...(await getGenderTypes())[0].genderTypes.map((ele)=>{
        return elt('option',{className:`${ele}`,value:ele},ele);
    }))
    genderlist.unshift(elt('option',{className:`none`,value:'none',selected:true,disabled:true,hidden:true},'Select an Option'));
    return  genderlist;
 }

function stepFormReplacement(){
    if (currentstep == 1 ){
        return [
        elt('a',{className:'step-ind step-ind-1 step-ind-active inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-indigo-500 text-indigo-500 bg-gray-100 rounded-t sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 1'),
        elt('a',{className:'step-ind step-ind-2  inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 2'),
        elt('a',{className:'step-ind step-ind-3 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 3'),
        elt('a',{className:'step-ind step-ind-3 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 4')]
    
    }else if(currentstep ==2){
return [elt('a',{className:'step-ind step-ind-1 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 1'),
        elt('a',{className:'step-ind step-ind-2 step-ind-active inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-indigo-500 text-indigo-500 bg-gray-100 rounded-t sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 2'),
        elt('a',{className:'step-ind step-ind-3 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 3'),
        elt('a',{className:'step-ind step-ind-3 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 4')
        ]

    }else if(currentstep==3){
return [elt('a',{className:'step-ind step-ind-1 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 1'),
        elt('a',{className:'step-ind step-ind-2 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 2'),
        elt('a',{className:'step-ind step-ind-3 step-ind-active inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-indigo-500 text-indigo-500 bg-gray-100 rounded-t sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 3'),
        elt('a',{className:'step-ind step-ind-2 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 4')]

    }else if(currentstep==4){
        return [elt('a',{className:'step-ind step-ind-1 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 1'),
                elt('a',{className:'step-ind step-ind-2 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 2'),
                elt('a',{className:'step-ind step-ind-2 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 3'),
                elt('a',{className:'step-ind step-ind-3 step-ind-active inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-indigo-500 text-indigo-500 bg-gray-100 rounded-t sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 4')]
        
            }
    }

function replaceNextForm(classs,domele,calledfrom){

    let theForm = document.querySelector('form');
    theForm.replaceChild(domele,document.querySelector(`.${classs}`));

    let formnextbutton = document.querySelector('#form-next-button');
    formnextbutton.replaceChild(document.createTextNode('Submit'),formnextbutton.firstChild);
    
    
    // switchforwardActiveStep();
    if(calledfrom =='submit')
    currentstep = currentstep+1 ;
    else currentstep = currentstep-1
    unhidebackbutton();
}

function replaceBackButtonWithPinFeedback(){
    let buttonhouse = document.querySelector('.button-house')
    buttonhouse.insertBefore(pinVerificationFormFeedbackText(),buttonhouse.firstChild);
}

function unhidebackbutton(){
    if(currentstep>1 && currentstep <4){
        document.querySelector('#form-back-button').classList.remove('hidden');
    }else document.querySelector('#form-back-button').classList.add('hidden');
}



// function switchforwardActiveStep(){
//     let steps= Array.from(document.querySelectorAll('.step-ind'));
//     let activeClasses = Array.from(document.querySelector(`.step-ind-${currentstep}`).classList).slice(10,15);
//     document.querySelector(`.step-ind-${currentstep+1}`).classList.add(...activeClasses);
//     console.log(activeClasses);






// }

// function switchBackwardActiveStep(){
//     let steps= Array.from(document.querySelectorAll('.step-ind'));
//     let activeClasses = Array.from(document.querySelector(`.step-ind-1`).classList).slice(10,15);
//     document.querySelector(`.step-ind-${currentstep}`).classList.remove(...activeClasses);
//     // console.log(activeClasses);






// }