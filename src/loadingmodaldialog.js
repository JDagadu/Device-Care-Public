import { elt } from "./domelementbuilder";
import { clearContent } from "./utilities";
import feather from 'feather-icons';

export default function buildLoadingModal(){
  if(document.querySelector('#loadingmodal')){
    document.body.replaceChild(buildLoading(),document.querySelector('#loadingmodal')) 
}else{
    document.body.appendChild(buildLoading())
}
  // document.body.append()/
}

function buildLoading(){
  return elt('div',{id:'loadingmodal',className:'fixed z-50 inset-0 bg-white bg-opacity-50 overflow-y-auto h-full w-full'},
  //  clearContent(document.querySelector('.main-content'));
    elt('div',{className:' transition-all loading-ui flex  bg-white fixed flex-col h-full w-full item-center justify-center '},
   elt('div',{className:'relative mx-auto p-5  bg-white'},
       elt('div',{className:'text-center h-full w-full'},
           elt('div',{className:'mx-auto flex items-center justify-center h-20 w-20 rounded-full'},
               elt('span',{className:'animate-ping absolute inline-flex h-20 w-20 rounded-full bg-blue-400 opacity-75'}),
               new DOMParser().parseFromString(
                   feather.icons['loader'].toSvg({class:'relative animate-spin inline-flex text-blue-500 h-10 w-10'}),
                   'image/svg+xml',
                 ).querySelector('svg')
              
               )))
))
}