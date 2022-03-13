import {clearContent} from './utilities'
import {elt} from './domelementbuilder'
import { getUserInfo, sidemenulist } from './datamanager';
import feather from 'feather-icons';
import Icon from './Images/DeviceCareLogo1.png';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db, signOutUser } from './firebasesrc';

export default async function buildLandingDashboard(){

    clearContent(document.querySelector('.mbody'));

    document.querySelector('#loadingmodal').classList.add('hidden');

    window.buildOverviewPage = async function (){

        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        contentarea.appendChild(await buildOverviewPage());
     
    }
    window.buildQuotePage = function(){

        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        contentarea.appendChild(elt('p',{},'Get a quote Page'));
     
    }
    window.buildFileClaimPage = function(){

        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        contentarea.appendChild(elt('p',{},'File a Claim Page'));
     
    }
    window.buildTrackClaim = function(){
        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        contentarea.appendChild(elt('p',{},'Track a claim Page'));
    }

    window.buildPremiumHistory = function(){

        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        contentarea.appendChild(elt('p',{},'Premium history Page'));
     
    }
    window.buildSubscribeDevice = function(){

        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        contentarea.appendChild(elt('p',{},'Subscribe device Page'));
     
    }

    return await elt('div',{onclick(){
            if(!(Array.from(document.querySelector('.user-menu').classList).includes('hidden')))
            document.querySelector('.user-menu').classList.add('hidden');
    },className:'relative bg-gray-100 min-h-screen md:flex'}, 
                
                elt('div',{className:'sidebar bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out'},
                    elt('nav',{},...buildSideMenuListItem())),
                elt('div',{className:'flex-1 items-center min-h-full justify-center text-2xl font-bold'},
                elt('div',{className:' flex justify-between'},
                    elt('div',{className:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'},
                        elt('div',{className:'flex items-center justify-between h-16'},
                            elt('div',{className:'flex items-center'},
                                elt('div',{className:'flex-shrink-0'})),
                            elt('div',{className:'ml-4 flex items-center md:ml-6'},
                                elt('div',{className:'ml-3 relative'},
                                    elt('button',{onclick(event){
                                        document.querySelector('.user-menu').classList.toggle('hidden');
                                        event.stopPropagation();
                                    },id:'notif-button',className:'bg-gray-100 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'},
                                        elt('span',{className:'sr-only'},'View notifications'),
                                        new DOMParser().parseFromString(
                                        feather.icons['bell'].toSvg({class:'mx-5'}),
                                        'image/svg+xml',
                                        ).querySelector('svg')),
                                        elt('div',{role:'menu',tabindex:'-1','aria-orientation':'vertical','aria-labelledby':'notif-button',className:'origin-top-right user-menu hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'},
                                        elt('a',{async onclick(event){
                                           await signOutUser()
                                           

                                        },href:'#',className:'block px-4 py-2 text-sm text-gray-700',role:'menuitem',tabindex:'-1',id:'user-menu-item-0'},'Sign out'))
                                )
                                
                            )),
                    )),
                elt('div',{className:'flex content-area w-full px-4'},await buildOverviewPage())))
}

function buildSideMenuListItem(){
    let sidebaritems=[];
    sidebaritems=  sidemenulist.map((ele,ind)=>{
       return elt('a',{onclick(event){
                event.preventDefault();
                console.log(ele.func)
                let clickAction = ele.func
                window[clickAction]();
                console.log(ind)
                if(document.querySelector(`.active-nav-menu`))
                document.querySelector(`.active-nav-menu`).classList.remove('active-nav-menu');

                
                document.querySelector( `.nav-menu-${ind}`).classList.add('active-nav-menu');
                
       },href:'#',className:`nav-menu-${ind} ${(ind==0)?'active-nav-menu':''} nav-menu block py-3 px-6 rounded transition duration-200 hover:bg-gray-700 visited:bg-gray-700 hover:text-white`},
                    elt('span',{className:'flex items-center'},new DOMParser().parseFromString(
                        feather.icons[ele.icon].toSvg({class:'mx-5'}),
                        'image/svg+xml',
                      ).querySelector('svg'),ele.title))
    })
    sidebaritems.unshift( elt('img',{src:Icon ,className:'device-care-logo1 w-15',alt:'devicecare logo'}));
    return sidebaritems;
}

async function buildOverviewPage(){
    
        
        // let Profile = JSON.parse(localStorage.getItem('companyProfile'))
        let Profile = await getUserInfo()
        console.log(Profile)
        console.log('h')
        // await getUserInfo()['First name']
        return await elt('p',{},`Hi ${Profile['First name']}, welcome back!`)

}

// function buildQuotePage(){

//     let contentarea = document.querySelector('.content-area')
//     clearContent(contentarea);
//     contentarea.appendChild(elt('p',{},'Get a quote Page'));
 
// }

// function buildFileClaimPage(){
//     let contentarea = document.querySelector('.content-area')
//     clearContent(contentarea);
//     contentarea.appendChild(elt('p',{},'File a claim Page'));
// }

// function buildTrackClaim(){
//     let contentarea = document.querySelector('.content-area')
//     clearContent(contentarea);
//     contentarea.appendChild(elt('p',{},'Track a claim Page'));
// }

// function buildPremiumHistory(){
//     let contentarea = document.querySelector('.content-area')
//     clearContent(contentarea);
//     contentarea.appendChild(elt('p',{},'Premium history Page'));
// }

// function buildSubscribeDevice(){
//     let contentarea = document.querySelector('.content-area')
//     clearContent(contentarea);
//     contentarea.appendChild(elt('p',{},'Subscribe device Page'));
// }