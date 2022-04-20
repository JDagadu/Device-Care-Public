import { getGenderTypes, getIndustriesTypes, resendOTP } from "./datamanager";
import { elt } from "./domelementbuilder";
import Icon from './Images/DeviceCareLogo1.png';
import {clearContent} from './utilities'
import feather from 'feather-icons'
import { getFunctions, httpsCallable } from "firebase/functions";
import buildCautionDialog from "./cautiondialog";
import { db, functions, getFirebaseStorage, signIn, signOutUser } from "./firebasesrc";
import buildLoadingModal from "./loadingmodaldialog";
import buildSuccessDialog from "./successdialog";
import buildLandingDashboard from "./landingDashboard";
import buildConfirmDialog from "./confirmactiondialog";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import buildLoginPage from "./loginpage";
import { getAuth } from "firebase/auth";


export default async function buildVerifyUserPage(veriedobj){
    clearContent(document.querySelector('.mbody'))

    console.log(localStorage.getItem('finalCompany'))
   

    let dom =  elt('div',{className:'on-b m-0 w-full min-h-screen bg-blue bg-gray-50'},
            elt('div',{className:'pt-10'},
                elt('img',{src:Icon ,className:'device-care-logo w-15 mx-auto',alt:'devicecare logo'}),
                elt('h2',{className:'mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-6'},'Create a Corporate Account'), 
                elt('p',{className:'max-w-screen-md mx-auto text-center assitive-text text-gray-500 md:text-lg'},'Please fill in with authorized representative data')
                ),
            elt('div',{className:'text-gray-600 h-full'},
                elt('div',{className:'container w-1/2 h-full  flex flex-col flex-wrap px-5 py-2 mx-auto rounded-t'},
                    elt('div',{className:'step-house flex flex-wrap mx-auto'},
                    elt('a',{className:'step-ind step-ind-1 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 1'),
                    elt('a',{className:'step-ind step-ind-2 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 2'),
                    elt('a',{className:'step-ind step-ind-2 inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 3'),
                    elt('a',{className:'step-ind step-ind-3 step-ind-active inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider border-b-2 border-indigo-500 text-indigo-500 bg-gray-100 rounded-t sm:px-6 sm:w-auto sm:justify-start title-font'},'Step 4')
                        
                    ),
                    elt('div',{className:'flex flex-col h-full w-full for-confirmation text-center'},
                        elt('div',{className:'py-6 shadow-md h-full bg-white sm:py-8 lg:py-12'},
                            elt('div',{className:'px-4 mx-auto max-w-screen-2xl md:px-8'},
                                elt('form',{className:'max-w-screen-md mx-auto',async onsubmit(event){
                                    event.preventDefault();
                                
                                    
                                            //     var myHeaders = new Headers();
                                            // myHeaders.append("Content-Type", "application/json");

                                            // var raw = localStorage.getItem('finalCompany');
                                            //     console.log(raw)
                                            // var requestOptions = {
                                            // method: 'POST',
                                            // headers: myHeaders,
                                            // body: raw,
                                            // redirect: 'follow'
                                            // };

                                            // fetch("https://us-central1-devicecare-652a9.cloudfunctions.net/corporateSignUp", requestOptions)
                                            // .then(response => response.text())
                                            // .then(result =>{
                                            //     console.log(result);
                                            //     let resultObj= JSON.parse(result)
                                            //     console.log(resultObj);
                                            //     if(resultObj.message == 'Success.'){
                                            //         let fC1 = JSON.parse(localStorage.getItem('companyProfile'));
                                            //         const corporatestorage = ref(getFirebaseStorage(),'Corporate Logos/'+fC1['Corporate logo']);
                                            //         // const storageRef = ref(corporatestorage,'Corporate Logos' );
                                            //         console.log(corporatestorage.fullPath)
                                            //         console.log(ref(getFirebaseStorage(),'Corporate Logos/'+fC1['Corporate logo']).fullPath)
                                                    
                                            //         const metadata = {
                                            //             contentType: fC1['Corporate logotype'],
                                            //           };
                                            //           const uploadTask = uploadBytesResumable(corporatestorage, logofile,metadata);
                                            //           uploadTask.on('state_changed', 
                                            //           (snapshot) => {
                                            //               // Observe state change events such as progress, pause, and resume
                                            //               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                            //               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                            //               console.log('Upload is ' + progress + '% done');
                                            //               switch (snapshot.state) {
                                            //               case 'paused':
                                            //                   console.log('Upload is paused');
                                            //                   break;
                                            //               case 'running':
                                            //                   console.log('Upload is running');
                                            //                   break;
                                            //               }
                                            //           }, 
                                            //           (error) => {
                                            //               // Handle unsuccessful uploads
                                            //               document.querySelector('#loadingmodal').classList.add('hidden');
                                            //               buildCautionDialog('Account profile picture upload failed')
                                            //               console.log('picture upload failed')
                                            //           }, 
                                            //           async () => {
                                            //               // Handle successful uploads on complete
                                            //               // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                            //               getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                            //               console.log('File available at', downloadURL);


                                            //               let corporateRef = doc(db,'corporate',fC1['Corporate email']);
                                            //               let setProfilereturn = await setDoc(corporateRef,{profilePhoto:downloadURL},{merge:true})

                                            //             });
                                            //         }
                                            //         );

                                            //         document.querySelector('#loadingmodal').classList.add('hidden');
                                            //         buildSuccessDialog('Your corporate account has been created successfully!');
                                            //         document.querySelector('#success-btn-ok').addEventListener('click',(event)=>{
                                            //             AssitiveText('Please verify your account');
                                            //             document.querySelector('#loadingmodal').classList.add('hidden');
                                            //             // getCorporateFieldData();
                                            //             replaceNextForm(Array.from(document.querySelector('form').firstChild.classList)[1],pinVerificationForm(),'submit');
                                            //             document.querySelector('.step-house').innerHTML = ''
                                            //             document.querySelector('.step-house').append(...stepFormReplacement(currentstep));
                                                        
                                            //         })
                                                    
                                                    
                                            //     }
                                            // }
                                            //     )
                                            // .catch(error => {
                                            //     document.querySelector('#loadingmodal').classList.add('hidden');
                                            //     buildCautionDialog('Error: '+error)
                                            //     // console.log('error', error);
                                                
                                            // })
                                            
                                                

                                          
                                    
                                    
                                    
                                }
                            },
                                 await pinVerificationForm(),
                                        
                                        
                                        
                                    
                                    elt('div',{className:'button-house flex  items-center justify-between pt-10'},
                                    pinVerificationFormFeedbackText(),
                                        elt('button',{ type:'submit' ,id:'form-next-button', className:'px-6 py-2 text-sm text-white bg-indigo-500 rounded-lg outline-none hover:bg-indigo-600 ring-indigo-300',onclick(event){
                                            // console.log('clicked')
                                        }},'Submit')
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )

                                        document.querySelector('#loadingmodal').classList.add('hidden');
                                        
                                        return dom;

}





function pinVerificationForm(ind){
    // replaceBackButtonWithPinFeedback(ind);
    let companyProf = JSON.parse(localStorage.getItem('finalCompany'));
    
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
        elt('h3',{className:'text-sm px-10'},`Protecting your data is priority to us. Please confirm your account by entering the authorization pin sent to ${companyProf.email}`)),
    elt('div',{className:'flex flex-row justify-center mb-2'},
        // elt('label',{id:'email',className:'inline-flex mb-2 text-sm text-gray-800',for:'company'},'Email'),
        elt('input',{name:'pin2',maxlength:'1', type:'number',id:'pin1',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'}),
        elt('input',{name:'pin3',maxlength:'1', type:'number',id:'pin2',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'}),
        elt('input',{name:'pin4',maxlength:'1', type:'number',id:'pin3',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'}),
        elt('input',{name:'pin1',maxlength:'1', type:'number',id:'pin4',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'}),
        elt('input',{name:'pin5',maxlength:'1', type:'number',id:'pin5',className:'pin h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl'})),
    
    )
}
function addEventListener1(){
     
     document.querySelectorAll('.pin').forEach((ele,num)=>{
         ele.addEventListener('keyup',(event)=>{
             if(/[0-9]/.test(event.code) && (((num+1)+1)<= 5)){
                document.querySelector(`#pin${(num+1)+1}`).focus();
             }else if(/[0-9]/.test(event.code) && (((num+1)+1)> 5)) {
                buildLoadingModal();
                let OTP = Array.from(document.querySelectorAll('.pin')).map((ele,num)=>{
                    return ele.value
                }).join('')

                                            var myHeaders = new Headers();
                                            
                                            myHeaders.append("Content-Type", "application/json");
                                            let finalcomp  = JSON.parse(localStorage.getItem('finalCompany'));
                                            var raw = {'otp':OTP,'email':finalcomp.email,'type':'C'};
                                            console.log(JSON.stringify(raw))
                                            var requestOptions = {
                                            method: 'POST',
                                            headers: myHeaders,
                                            body: JSON.stringify(raw),
                                            redirect: 'follow'
                                            };

                                            fetch("https://us-central1-devicecare-652a9.cloudfunctions.net/OTPValidation", requestOptions)
                                            .then(response => response.text())
                                            .then(async result =>{
                                                console.log(result);
                                                let resultObj= JSON.parse(result);

                                                if(resultObj.message == 'Success'){
                                                    let fC =  JSON.parse(localStorage.getItem('companyProfile'));
                                                                // let fC =  JSON.parse(localStorage.getItem('companyProfile'));
                                                          let corporateRef = doc(db,'corporate',fC['Corporate email']);
                                                          let setProfilereturn = await setDoc(corporateRef,{isVerified:true},{merge:true})


                                                                document.querySelector('#loadingmodal').classList.add('hidden');
                                                                console.log(fC['Email'],fC['password']);
                                                                
                                                                
                                                                
                                                                const res = (getAuth()).currentUser;

                                                                console.log(res.uid);
                                                                if(res.uid){
                                                                localStorage.clear('companyProfile');
                                                                localStorage.clear('finalCompany');
                                                                document.querySelector('.mbody').append(await buildLandingDashboard());
                                                                }else{
                                                                    console.log(res);
                                                                    document.querySelector('#loadingmodal').classList.add('hidden');
                                                                    buildCautionDialog('Device Care was not able to sign user in. Kindly contact adminstrator.')
                                                                    signOutUser();
                                                                    
                                                                }
                                                }else{
                                                    buildCautionDialog('An error occurred when creating user account');
                                                    document.querySelector('#loadingmodal').classList.add('hidden');
                                                    signOutUser();
                                                }
                                            }
                                                )
                                            .catch(error => {
                                                document.querySelector('#loadingmodal').classList.add('hidden');
                                                buildCautionDialog('Error: '+error)
                                                signOutUser();
                                                // console.log('error', error);
                                                
                                            })
             }
             
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
}


function pinVerificationFormFeedbackText(){
    return elt('p',{className:'w-2/5 text-sm pin-feedback feedbacktext text-left'},`It may take a minute to receive your code. Haven't received it? `,
        elt('a',{className:'resend-code-link hover:underline text-blue-500 font-bold',href:'#',async onclick(event){
            event.preventDefault();
            document.querySelector('#loadingmodal').classList.remove('hidden');
            let result = await resendOTP()
            if(result =='Success'){
                document.querySelector('#loadingmodal').classList.add('hidden');
                fillInPin();
            }else{
                buildCautionDialog('An error occurred when sending OTP to corporate email');
                document.querySelector('#loadingmodal').classList.add('hidden');
            }
        }},`Resend a new code`) )

}

function fillInPin1(){
    let pinlen = 5
    document.querySelector('#pin1').focus();
    addEventListener1();


}




export {pinVerificationFormFeedbackText,fillInPin1}


// }