import { elt } from "./domelementbuilder";
import  feather  from "feather-icons";

export default function buildConfirmDialog(cmessage){
    if(document.querySelector('#caution-modal')){
        document.body.replaceChild(buildConfirm(cmessage),document.querySelector('#caution-modal')) ;
    }else{
        document.body.appendChild(buildConfirm(cmessage));
    }
   
}

function buildConfirm(cmessage){
    return elt('div',{id:'caution-modal',className:'fixed inset-0 z-50 bg-gray-600  bg-opacity-50 overflow-y-auto h-full w-full'},
    elt('div',{className:'relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'},
        elt('div',{className:'mt-3 text-center'},
            elt('div',{className:'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'},
                new DOMParser().parseFromString(
                feather.icons['alert-circle'].toSvg({class:'h-6 w-6 text-red-600'}),
                'image/svg+xml',
              ).querySelector('svg')),
            elt('h3',{className:'text-lg leading-6 font-medium text-gray-900'},'Alert!'),
            elt('div',{className:'mt-2 px-7 py-3'},
                elt('p',{className:'text-sm text-gray-500'},cmessage)),
            elt('div',{className:'items-center px-4 py-3'},
                elt('button',{id:'ok-btn',className:'px-4 my-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'},'OK'
            ),
            elt('button',{onclick(event){
                console.log('cancel')
                document.querySelector('#caution-modal').classList.add('hidden');
            },id:'cancel-btn',className:'px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300'},'Cancel'
        )
            ))))
}