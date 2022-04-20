import { getAuth, onAuthStateChanged } from "firebase/auth";
function clearContent(parent){
    if(parent){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
    
}

function findIndex(arr,data){
    let index;
    for (let i = 0;i<arr.length;i++){
        
        if(arr[i].deviceImei == data){
            index = i;
            break;
        }
        
    }
    return index;
}

function deleteObjectFromArray(arr,data){
    arr.splice(findIndex(arr,data),1)
    return arr;
}

function addObjectToArray(arr,data){
    arr.push(data);
}


// const auth = getAuth();
// onAuthStateChanged(auth,  async (user) => {
//   if (!user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     // const uid = user.uid;
//     clearContent(document.querySelector('.mbody')) ;
//     document.querySelector('.mbody').append(await buildLoginPage());
//     // ...
//   } else {
//     // User is signed out
    
//     // ...
//   }
// });



export {clearContent,deleteObjectFromArray,addObjectToArray};