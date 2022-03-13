import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot} from "firebase/firestore";
import { db } from "./firebasesrc";
import buildLoginPage from "./loginpage";

// let db = getFirestore(app);
// let onboardingformgenderlist = ['Male','Female'];
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
            onAuthStateChanged(auth,async (account) => {

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
                            'Comments':corp.comments}
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
                    document.querySelector('.mbody').append(await buildLoginPage());
                }


                
            
                
                
                 
            
                // let contentarea = document.querySelector('.content-area')
                // clearContent(contentarea);
                // contentarea.appendChild(elt('p',{},'Overview Page'));
            
            })
        
        }
    )
    

}

export {getIndustriesTypes,getGenderTypes,sidemenulist,getUserInfo}

//  ['Telecommunication','Banking/Finance','Insurance'];
