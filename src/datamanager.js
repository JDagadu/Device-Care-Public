import { collection, doc, getDocs, getFirestore, onSnapshot} from "firebase/firestore";
import { db } from "./firebasesrc";

// let db = getFirestore(app);
let onboardingformgenderlist = ['Male','Female'];

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


export {getIndustriesTypes,getGenderTypes}

//  ['Telecommunication','Banking/Finance','Insurance'];
