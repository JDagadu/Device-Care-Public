import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot} from "firebase/firestore";
import { elt } from "./domelementbuilder";
import { reject } from "lodash";
import {Tabulator} from "tabulator-tables";
import DataTable from "datatables.net"
import { db } from "./firebasesrc";
import buildLoginPage from "./loginpage";
import { clearContent } from "./utilities";
import $ from "jquery"

// let db = getFirestore(app);
// let onboardingformgenderlist = ['Male','Female'];
const paymentsummarylist = ['No of Devices','Premium Type','Premium Amount','Expiring Date','Mode of Payment'];
const benefitsummarylist = [{id:1,val:'Accidental Damages (cracked screens etc.)'},{id:2,val:'Worldwide cover 90 days'},{id:3,val:'Theft of device'},{id:4,val:'Loss of device'},{id:5,val:'72-hour replacement'},{id:6,val:'24-month device upgrade'}]
const adddevicelist = [{deviceType:'Phone',deviceMake:'Samsung',deviceModel:'Galaxy S10 128GB',imei:'1258754985245854',price:2000,premium:2000*0.15}];
let sidemenulist = [{title:'Overview',icon:'pie-chart',func:'buildOverviewPage'},{title:'Get a quote',icon:'edit',func:'buildQuotePage'},{title:'File a claim',icon:'file-text',func:'buildFileClaimPage'},{title:'Track a claim',icon:'navigation',func:'buildTrackClaim'},{title:'Premium history',icon:'archive',func:'buildPremiumHistory'},{title:'Subscribe device',icon:'smartphone',func:'buildSubscribeDevice'}]
console.log(db);
function getIndustriesTypes(industriesSelect){
    return getDocs(collection(db,'lovs')).then((snapshot)=>{

       return snapshot.docs.map((doc)=>{

       return  doc.data();

    }).filter((ele,n)=>{
        // console.log(Object.keys(ele)[0],'businessTypes')
        if( Object.keys(ele)[0]=='industryTypes')
        return ele;
    }) 


    })
    .catch(error=>{
        console.log(error.message)
    })

    
}

function buildtable() {
//     var tabledata = [
//     ["14/02/2012","101386717087432","Phone","Apple", "Iphone 6S", "expired"],
//     ["19/01/2022","866838169962954","Phone","Samsung", "Galaxy S3", "active"],
//     ["08/04/2022","333688434679965","Phone","LG", "z Flip", "expired"],
// ];

var tabledata = [{date:'14/02/2012',imei:'101386717087432',type:'Phone',make:'Apple',model:'Iphone 6S',status:'expired'}]
let table = new DataTable('#example', {
    // options
    'data':[],
    'columnDefs': [
        {"className": "dt-center", "targets": "_all"},{"type":"date-eu","targets":0}],
    columns: [
        { title: "Date" },
        { title: "IMEI" },
        { title: "Device Type" },
        { title: "Device Make" },
        { title: "Device Make" },
        { title: "Insurance Status" }
        // ,
        // { title: "Bdate" }
    ]
});
document.querySelector('#example_wrapper').classList.add('w-full');



tabledata.forEach(ele=>{
    let pill = elt('p',{},
                elt('span',{className:`text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-semibold bg-green-200 text-${(ele.status=='active')?'green':'red'}-600 rounded-full flex items-center`},
                    elt('span',{className:'text-xs'},ele.status)))

    $('#example').DataTable().row.add([ele.date,ele.imei,ele.type,ele.make,ele.model,`<p class='flex justify-center w-full'><span class='text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-semibold bg-${(ele.status=='active')?'green':'red'}-200 text-${(ele.status=='active')?'green':'red'}-600 rounded-full p-3 flex items-center'><span class = 'text-xs'>${ele.status}</span></span></p>`]).draw()
})      

};

function getDeviceTypes(){
    return getDocs(collection(db,'lovs')).then((snapshot)=>{

        return snapshot.docs.map((doc)=>{
 
        return  doc.data();
 
     }).filter((ele,n)=>{
         console.log(Object.keys(ele)[0],'devices')
         if( Object.keys(ele)=='devices')
         return ele;
     }) 
 
 
     })
     .catch(error=>{
         console.log(error.message)
     })
}

function getGenderTypes(industriesSelect){
    return getDocs(collection(db,'lovs')).then((snapshot)=>{

        return snapshot.docs.map((doc)=>{
 
        return  doc.data();
 
     }).filter((ele,n)=>{
         console.log(Object.keys(ele)[0],'genderTypes')
         if( Object.keys(ele)=='genderTypes')
         return ele;
     }) 
 
 
     })
     .catch(error=>{
         console.log(error.message)
     })
    
}

async function getUserInfo(func){
    const auth = getAuth();
    return new Promise(
        function (resolve,reject){
            let unsub = onAuthStateChanged(auth,async (account) => {

                if(account){




                    const uid = account.uid;
                    const docRef = doc(db,"corporateUser",uid)
                    const docSnap = await getDoc(docRef);
                    let user = docSnap.data();
                    if(docSnap.exists()){
                      const corporateDoc = await getDoc(doc(db,"corporate",user.corporateId))
                      if(corporateDoc.exists()){
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
                            'Comments':corp.comments,
                            'profilePhoto':corp.profilePhoto}
                            console.log('here')
                        localStorage.setItem('companyProfile',JSON.stringify(compProf))
    
    
                        resolve(JSON.parse(localStorage.getItem('companyProfile'))) ;
                        // console.log()
                        
                      }else{
                        return {status:'Something went wrong fetching user data'}
                      }
                    }else{
                        return {status:'Something went wrong fetching user data'}
                
                    }



                    
                
                
                }else{
                    console.log('unsub')
                    // document.querySelector('.mbody').append(await buildLoginPage());
                    // clearContent(document.querySelector('.mbody')) ;
                    // document.querySelector('.mbody').append(await buildLoginPage());
                }


                
            
                
                
                 
            
                // let contentarea = document.querySelector('.content-area')
                // clearContent(contentarea);
                // contentarea.appendChild(elt('p',{},'Overview Page'));
            
            })

            unsub();
        
        }
    )
    

}

async function resendOTP(){
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

    return fetch("https://us-central1-devicecare-652a9.cloudfunctions.net/resendOTP", requestOptions)
    .then(response => response.text())
    .then(async result =>{
        console.log(result);
        let resultObj= JSON.parse(result)
        if(resultObj.message == 'Success'){
            return 'Success'
        }else{
            return 'Failed'
        }
    }
        )
    .catch(error => {
        // document.querySelector('#loadingmodal').classList.add('hidden');
        buildCautionDialog('Error: '+error)
        console.log('error', error);
        stopButtonLoading('signinbutton','Sign in');

        
    })
}

function getAddDeviceList(){
    return adddevicelist;
}

function getBenefitSummaryList(){
    return benefitsummarylist;
}

function getpaymentSummaryList(){
    return paymentsummarylist;
}
export {getIndustriesTypes,getpaymentSummaryList,getBenefitSummaryList,getGenderTypes,sidemenulist,getUserInfo,resendOTP,getDeviceTypes,buildtable,getAddDeviceList}

//  ['Telecommunication','Banking/Finance','Insurance'];
