import {clearContent} from './utilities'
import {elt} from './domelementbuilder'
export default function buildLandingDashboard(){

    clearContent(document.querySelector('.mbody'));
    return elt('div',{className:'w-full h-full flex justify-center items center'}, 'logged in, landin page coming soon!')
}

