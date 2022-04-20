import {addObjectToArray, clearContent, deleteObjectFromArray} from './utilities'
import {elt} from './domelementbuilder'
import { buildtable, getAddDeviceList, getBenefitSummaryList, getDeviceTypes, getpaymentSummaryList, getUserInfo, sidemenulist } from './datamanager';
import feather from 'feather-icons';
import Icon from './Images/DeviceCareLogo1.png';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db, signOutUser } from './firebasesrc';
import buildCautionDialog from './cautiondialog';
import Datepicker from '@themesberg/tailwind-datepicker/Datepicker';
import format from 'date-fns/format';
import { Chart,registerables } from 'chart.js';
import buildPaymentGatewayForm from './ecobankpayform';
import { content } from '../tailwind.config';


 
export default async function buildLandingDashboard(){

    clearContent(document.querySelector('.mbody'));

    

    window.buildOverviewPage = async function (){

        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        contentarea.appendChild(await buildOverviewPage());
        //document.querySelector('#loadingmodal').classList.add('hidden');
    }
    window.buildQuotePage = function(){

        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        contentarea.appendChild(elt('p',{},'Get a quote Page'));
     
    }
    window.buildFileClaimPage = async function(){

        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        console.log(await buildFileClaimPage())
        contentarea.classList.add('items-start');
        contentarea.classList.add('flex-col');
        contentarea.append( buildStepper(['step1','step2','step3']),
        ...(await buildFileClaimPage()),
        buildNavButton1())//...(await buildFileClaimPage()));
        buildtable();
     
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
    window.buildSubscribeDevice = async function(){

        let contentarea = document.querySelector('.content-area')
        clearContent(contentarea);
        contentarea.appendChild(await buildSubscribeDevice());
     
    }

    return await elt('div',{onclick(){
            if(!(Array.from(document.querySelector('.user-menu').classList).includes('hidden')))
            document.querySelector('.user-menu').classList.add('hidden');
    },className:'relative bg-gray-100 min-h-screen md:flex'}, 
                
                elt('div',{className:'sidebar bg-gray-800 text-white min-w-48 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out'},
                    elt('nav',{},...buildSideMenuListItem())),
                elt('div',{className:'main-content flex-1 items-center min-h-full justify-center text-2xl font-bold'},
                elt('div',{className:'app-bar flex justify-between'},
                    elt('div',{className:'inner-app-bar max-w-full mx-auto pt-2 px-2 sm:px-6 lg:px-4 w-full'},
                        elt('div',{className:'app-bar-items-container flex items-center justify-between max-h-16'},
                            elt('div',{className:'flex items-center'},
                                elt('div',{className:'flex-shrink-0'})),
                            elt('div',{className:'user-holder ml-6 flex items-center md:ml-6'},
                                elt('div',{className:'user-icon-holder ml-5 relative'},
                                    elt('button',{onclick(event){
                                        document.querySelector('.user-menu').classList.toggle('hidden');
                                        event.stopPropagation();
                                    },id:'notif-button',className:'bg-gray-100 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'},
                                        elt('span',{className:'sr-only'},'View notifications'),
                                            elt('img',{className:'rounded-full w-8',src:(await getUserInfo())?(await getUserInfo()).profilePhoto:"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",alt:'Avatar'})
                                        // new DOMParser().parseFromString(
                                        // feather.icons['bell'].toSvg({class:'mx-5'}),
                                        // 'image/svg+xml',
                                        // ).querySelector('svg')
                                        ),
                                        elt('div',{role:'menu',tabindex:'-1','aria-orientation':'vertical','aria-labelledby':'notif-button',className:'origin-top-right user-menu hidden z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'},
                                        elt('a',{async onclick(event){
                                           await signOutUser();
                                           

                                        },href:'#',className:'block px-4 py-2 text-sm text-gray-700',role:'menuitem',tabindex:'-1',id:'user-menu-item-0'},'Sign out'))
                                )
                                
                            )),
                    )),
                elt('div',{className:'big-content-area w-full px-2'},elt('div',{className:'flex content-area rounded-t-lg bg-white w-full'},await buildOverviewPage()))))
                
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
                
       },href:'#',className:`nav-menu-${ind} ${(ind==0)?'active-nav-menu':''} nav-menu block py-3 rounded transition duration-200 hover:bg-gray-700 visited:bg-gray-700 hover:text-white`},
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
        let Profile = await getUserInfo().catch(error=>{
            buildCautionDialog('Error occurred when retrieving account information details.')
        })
        console.log(Profile)
        console.log('h')
        // const datepickerEl = document.getElementById('datepickerId');
       
        // console.log( new Date(),format( new Date(),'mm/dd/yyyy'))
    //create cards section
    let devicecard = elt('div',{className:'flex  items-center px-5 py-6 shadow-sm rounded-md bg-white'},
    elt('div',{className:'p-3 rounded-full bg-blue-600 bg-opacity-75'},
      new DOMParser().parseFromString(
      feather.icons['smartphone'].toSvg({class:'h-8 w-8 text-white stat-devices-ic text-xs px-1'}),
      'image/svg+xml',
    ).querySelector('svg')),
    elt('div',{className:'mx-5 flex flex-col-reverse items-start'},
      elt('h4',{className:'text-2xl font-semibold text-blue-500'},'8,282'),
      elt('div',{className:'text-sm'},'Devices'
          ))
    )

    let premiumcard = elt('div',{className:'flex  items-center px-5 py-6 shadow-sm rounded-md bg-white'},
    elt('div',{className:'p-3 rounded-full bg-blue-600 bg-opacity-75'},
      new DOMParser().parseFromString(
      feather.icons['smartphone'].toSvg({class:'h-8 w-8 text-white stat-premium-ic text-xs px-1'}),
      'image/svg+xml',
    ).querySelector('svg')),
    elt('div',{className:'mx-5  flex flex-col-reverse items-start'},
      elt('h4',{className:'text-2xl font-semibold text-blue-500'},'8,282'),
      elt('div',{className:'text-sm'},'Total Premium Paid'
          ))
    )

    let claimscard = elt('div',{className:'flex  items-center px-5 py-6 shadow-sm rounded-md bg-white'},
    elt('div',{className:'p-3 rounded-full bg-blue-600 bg-opacity-75'},
      new DOMParser().parseFromString(
      feather.icons['smartphone'].toSvg({class:'h-8 w-8 text-white stat-claims-ic text-xs px-1'}),
      'image/svg+xml',
    ).querySelector('svg')),
    elt('div',{className:'mx-5 flex flex-col-reverse items-start'},
      elt('h4',{className:'text-2xl font-semibold text-blue-500'},'8,282'),
      elt('div',{className:'text-sm'},'Total Claims'
          ))
    )

    let cardsectioncom = elt('section',{className:'card-section mb-2 text-gray-800 w-full pt-2 pb-2 text-center'},
        elt('div',{className:'card-section-grid grid md:grid-cols-2 gap-x-2 px-2 lg:grid-cols-3 items-center'},
            devicecard,
            premiumcard,
            claimscard
            )
        )

            Chart.register(...registerables);
            let ctx = elt('canvas',{id:'chartLine'})
            const labels = ["January", "February", "March", "April", "May", "June"];
            const data = {
                labels: labels,
                datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: "hsl(252, 82.9%, 67.8%)",
                    borderColor: "hsl(252, 82.9%, 67.8%)",
                    data: [0, 10, 5, 2, 20, 30, 45],
                },
                ],
            };

            const configLineChart = {
                type: "line",
                data,
                options: {},
              };
              
            var chartLine = new Chart(
                ctx,
                configLineChart
              );
            

        return await elt('div',{className:'w-full'},
                            ...(await buildFilterSection())
                        ,
                        // elt('hr',{className:'flex max-w-full border-solid border-2 border-gray-200'}),
                        elt('div',{className:'flex max-w-full justify-between  '},cardsectioncom),
                        // elt('hr',{className:'flex max-w-full border-solid border-2 border-gray-200'}),
                        elt('div',{className:'flex max-w-full text-sm px-2 pt-2'},
                            elt('table',{id:'example',style:'width:100%',className:'w-full text-gray-500 display compact'}),
                        ),
                        elt('hr',{className:'flex max-w-full border-solid border-2 border-gray-200'}),
                        elt('div',{className:'flex max-w-full text-sm px-2 pt-2'},
                            ctx
                            ))

}

async function buildFilterSection(){

    let insstartdateinput = elt('input',{type:'text',name:'startdate',value:format( new Date(),'MM/dd/yyyy'),id:'ins-startdate',className:'focus:outline-none  block w-28 pl-7 pr-0 pb-3 sm:text-sm border-gray-300 rounded-md'});
    let insenddateinput = elt('input',{type:'text',name:'enddate',value:format( new Date(),'MM/dd/yyyy'),id:'ins-enddate',className:'focus:outline-none  block w-28 pl-7 pr-0 pb-3 sm:text-sm border-gray-300 rounded-md'});
    let devicetypeinput = elt('select',{onchange(){
        document.querySelector('.devicetype-select').classList.add('hidden');
    },id:'devicetype',name:'devicetype',className:'w-full focus:outline-none  block w-28 pl-7 pr-0 pb-3 sm:text-sm border-gray-300 rounded-md'},...(await addDeviceType()))

    let devicemakeinput = elt('select',{onchange(){
        document.querySelector('.devicemake-select').classList.add('hidden');
    },id:'devicemake',name:'devicemake',className:'w-full focus:outline-none  block w-28 pl-7 pr-0 pb-3 sm:text-sm border-gray-300 rounded-md'},...(await addDeviceType()))

    let devicemodelinput = elt('select',{onchange(){
        document.querySelector('.devicemodel-select').classList.add('hidden');
    },id:'devicemodel',name:'devicemodel',className:'w-full focus:outline-none  block w-28 pl-7 pr-0 pb-3 sm:text-sm border-gray-300 rounded-md'},...(await addDeviceType()))

    let companynameinput = elt('input',{disabled:true ,type:'text',name:'companyname',value:( JSON.parse(localStorage.getItem('companyProfile'))['Company name']),id:'companyname',className:'focus:outline-none  block w-28 pl-7 pr-0 pb-3 sm:text-sm border-gray-300 rounded-md'});
    
    let filterbuttoninput = elt('button',{id:'filterbutton' ,type:'button','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Filter')

    let insStartDatecom = elt('div',{className:'p-1'},
        elt('label',{for:'ins-startdate',className:'block text-sm font-medium text-gray-700'},'Start Date'),
        elt('div',{className:'flex items-center border justify-center bg-white pt-3 px-3 main-component-house mt-1 relative rounded-md shadow-sm'},
            elt('div',{className:'icon-house absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'},
                elt('span',{className:'icon text-gray-500 sm:text-sm'},
                new DOMParser().parseFromString(
                    feather.icons['calendar'].toSvg({class:'calendar-ic text-xs px-1'}),
                    'image/svg+xml',
                  ).querySelector('svg'))
                ),
            insstartdateinput
            ),
        

    );

    let insEndDatecom = elt('div',{className:'p-1'},
        elt('label',{for:'ins-enddate',className:'block text-sm font-medium text-gray-700'},'End Date'),
        elt('div',{className:'flex items-center border justify-center bg-white pt-3 px-3 main-component-house mt-1 relative rounded-md shadow-sm'},
            elt('div',{className:'icon-house absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'},
                elt('span',{className:'icon text-gray-500 sm:text-sm'},
                new DOMParser().parseFromString(
                    feather.icons['calendar'].toSvg({class:'calendar-ic text-xs px-1'}),
                    'image/svg+xml',
                  ).querySelector('svg'))
                ),
            insenddateinput
            ),
    );

    let devicetypecom = elt('div',{className:'p-1'},
        elt('label',{for:'devicetype',className:'block text-sm font-medium text-gray-700'},'Device Type'),
        elt('div',{className:'flex items-center border  justify-center bg-white pt-3 px-3 main-component-house mt-1 relative rounded-md shadow-sm'},
            elt('div',{className:'icon-house absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'},
                elt('span',{className:'icon text-gray-500 sm:text-sm'},
                new DOMParser().parseFromString(
                    feather.icons['smartphone'].toSvg({class:'devtype-ic text-xs px-1'}),
                    'image/svg+xml',
                  ).querySelector('svg'))
                ),
                devicetypeinput
            ),
        

    )

    let devicemakecom = elt('div',{className:'p-1'},
        elt('label',{for:'devicemake',className:'block text-sm font-medium text-gray-700'},'Device Make'),
        elt('div',{className:'flex items-center border  justify-center bg-white pt-3 px-3 main-component-house mt-1 relative rounded-md shadow-sm'},
            elt('div',{className:'icon-house absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'},
                elt('span',{className:'icon text-gray-500 sm:text-sm'},
                new DOMParser().parseFromString(
                    feather.icons['speaker'].toSvg({class:'devicemake-ic text-xs px-1'}),
                    'image/svg+xml',
                  ).querySelector('svg'))
                ),
                devicemakeinput
            ),
        

    )

    let devicemodelcom = elt('div',{className:'p-1'},
        elt('label',{for:'devicemodel',className:'block text-sm font-medium text-gray-700'},'Device Model'),
        elt('div',{className:'flex items-center border  justify-center bg-white pt-3 px-3 main-component-house mt-1 relative rounded-md shadow-sm'},
            elt('div',{className:'icon-house absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'},
                elt('span',{className:'icon text-gray-500 sm:text-sm'},
                new DOMParser().parseFromString(
                    feather.icons['codesandbox'].toSvg({class:'devicemake-ic text-xs px-1'}),
                    'image/svg+xml',
                  ).querySelector('svg'))
                ),
                devicemodelinput
            ),
        

    )

    let companynamecom = elt('div',{className:'p-1'},
        elt('label',{for:'companyname',className:'block text-sm font-medium text-gray-700'},'Company Name'),
        elt('div',{className:'flex items-center border justify-center bg-white pt-3 px-3 main-component-house mt-1 relative rounded-md shadow-sm'},
            elt('div',{className:'icon-house absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'},
                elt('span',{className:'icon text-gray-500 sm:text-sm'},
                new DOMParser().parseFromString(
                    feather.icons['grid'].toSvg({class:'company-ic text-xs px-1'}),
                    'image/svg+xml',
                  ).querySelector('svg'))
                ),
                companynameinput
            ),
        

    )
    let filterbuttoncom = elt('div',{className:'p-1'},
    elt('label',{for:'filterbutton',className:'block text-sm font-medium text-gray-700'}),
    elt('div',{className:'flex items-center justify-center pl-2 main-component-house mt-1 relative rounded-md shadow-sm'},
        
            filterbuttoninput
        ),
    

)
    
    new Datepicker(insstartdateinput, {
        // options
        });
    new Datepicker(insenddateinput, {
        // options
        });
    // await getUserInfo()['First name']
    


 return [elt('div',{className:'flex max-w-full  w-full p-1 justify-between'},insStartDatecom,insEndDatecom,devicetypecom,devicemakecom,devicemodelcom,companynamecom,filterbuttoncom),
 elt('div',{className:'flex max-w-full justify-between'},filterbuttoncom)]
}

async function  addDeviceType(){
    // let cookie = JSON.parse(localStorage.getItem('finalCompany'))
    let deviceType ;
    
//    let industrytypes =  (await getIndustriesTypes())[0].industryTypes
let devicetypelist = [];
devicetypelist.push(...(await getDeviceTypes())[0].devices.map((ele)=>{
return elt('option',{className:`${ele}` ,selected:(ele == deviceType)?true:false},ele);
})) 
if(!deviceType){
    devicetypelist.unshift(elt('option',{className:`all`,value:'all',selected:true,disabled:false,hidden:false},'All'));
} 

return devicetypelist;
}

function  addClaimOptions(){
    // let cookie = JSON.parse(localStorage.getItem('finalCompany'))
    let deviceType ;
    
//    let industrytypes =  (await getIndustriesTypes())[0].industryTypes
let devicetypelist = [];
devicetypelist.push(...(['Loss','Theft','CrackedScreen'].map((ele)=>{
return elt('option',{className:`${ele}` ,selected:(ele == deviceType)?true:false},ele);
}))) 
if(!deviceType){
    devicetypelist.unshift(elt('option',{className:`none`,value:'Select an Option',selected:true,disabled:true,hidden:true},'Select an Option'));
} 

console.log(devicetypelist)
return devicetypelist;

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

async function buildSubscribeDevice(){
    let contentarea = document.querySelector('.content-area')
    clearContent(contentarea);
    // let nextbutton = elt('button',{id:'next-button-SD' ,async onclick(event){
    //     await operateStepper('Next')
    // },type:'button','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 mr-1 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Next');
    // let backbutton = elt('button',{id:'back-button-SD',async onclick(event){
    //     await operateStepper('Back')
    // } ,type:'button','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 ml-1 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Back');
    
    

    // let navbuttoncom = elt('div',{className:'bottom-nav-controller p-1'},
    //     elt('label',{for:'next-button-SD',className:'block text-sm font-medium text-gray-700'}),
    //     elt('div',{className:'flex items-center justify-start px-2  main-component-house mt-1 relative rounded-md shadow-sm'},
            
    //     nextbutton,
    //     backbutton
    //         )
    // ) 
    
    // let addDeviceButton = elt('div')

    let stepperComponent =  buildStepper();
        return elt('div',{className:'w-full'},
        stepperComponent,
        elt('div',{className:'w-full step1content'},
                elt('div',{className:'flex flex-col replace-add-device items-end justify-center'},
                    elt('ul',{className:'device-list-parent rounded-lg border-gray-200 w-full text-sm text-gray-600'},
                    ...buildAddDeviceList()),
                    elt('form',{className:'w-full',onsubmit(event){
                        event.preventDefault();
                        let dType = document.querySelector('#deviceType');
                        let dMake = document.querySelector('#deviceMake');
                        let dModel = document.querySelector('#deviceModel');
                        let dImei = document.querySelector('#deviceImei');

                        let subscribeDevice = {
                            deviceType:dType.options[dType.selectedIndex].text,
                            deviceMake:dMake.options[dMake.selectedIndex].text,
                            deviceModel:dModel.options[dModel.selectedIndex].text,
                            imei:dImei.value,
                            price:1500,
                            premium:1500*0.15

                            // 1st recon (outgoingvoice/data) 1st discon(outgoingvoice/data)
                    
                        }
                        addObjectToArray(getAddDeviceList(),subscribeDevice);
                        refreshSubscribedDeviceList();
                    }},
                        elt('div',{className:'subscribedeviceform px-2 w-full text-sm pt-2 hidden flex flex-wrap mb-2'},
                        elt('div',{className:'w-full md:w-1/4 px-3 mb-6 md:mb-0'},
                            elt('label',{for:'deviceType',className:'block uppercase  tracking-wide text-gray-700 text-xs font-bold mb-2'},'Device Type'),
                            elt('div',{className:'relative flex items-center'},
                                new DOMParser().parseFromString(
                                feather.icons['alert-circle'].toSvg({class:' hidden caution-select text-red-500 text-xs px-1'}),
                                'image/svg+xml',
                                    ).querySelector('svg'),
                                elt('select',{required:true,id:'deviceType',className:'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'},...(await addDeviceType())),
                                elt('div',{className:'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'},
                                    new DOMParser().parseFromString(
                                    feather.icons['chevron-down'].toSvg({class:'inline-block',width: 16,height: 16,}),
                                    'image/svg+xml',
                                ).querySelector('svg')
                                )
                                
                            )
                        ),
                        elt('div',{className:'w-full md:w-1/4 px-3 mb-6 md:mb-0'},
                            elt('label',{for:'deviceMake',className:'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'},'Device Make'),
                            elt('div',{className:'relative flex items-center'},
                                new DOMParser().parseFromString(
                                feather.icons['alert-circle'].toSvg({class:' hidden caution-select text-red-500 text-xs px-1'}),
                                'image/svg+xml',
                                    ).querySelector('svg'),
                                elt('select',{required:true,id:'deviceMake',className:'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'},...(await addDeviceType())),
                                elt('div',{className:'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'},
                                    new DOMParser().parseFromString(
                                    feather.icons['chevron-down'].toSvg({class:'inline-block',width: 16,height: 16,}),
                                    'image/svg+xml',
                                ).querySelector('svg')
                                )
                            )
                        ),
                        elt('div',{className:'w-full md:w-1/4 px-3 mb-6 md:mb-0'},
                            elt('label',{for:'deviceModel',className:'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'},'Device Model'),
                            elt('div',{className:'relative flex items-center'},
                                new DOMParser().parseFromString(
                                feather.icons['alert-circle'].toSvg({class:' hidden caution-select text-red-500 text-xs px-1'}),
                                'image/svg+xml',
                                    ).querySelector('svg'),
                                elt('select',{required:true,id:'deviceModel',className:'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'},...(await addDeviceType())),
                                elt('div',{className:'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'},
                                    new DOMParser().parseFromString(
                                    feather.icons['chevron-down'].toSvg({class:'inline-block',width: 16,height: 16,}),
                                    'image/svg+xml',
                                ).querySelector('svg')
                                )
                            )
                        ),
                        elt('div',{className:'w-full md:w-1/4 px-3 mb-6 md:mb-0'},
                            elt('label',{className:'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',for:'deviceImei'},'Device IMEI'),
                            elt('input',{required:true,placeholder:'Phone',type:'text',id:'deviceImei',className:'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'})
                        ),
                        elt('div',{className:'p-1'},
                            elt('label',{for:'subcribe-device-button-SD',className:'block text-sm font-medium text-gray-700'}),
                            elt('div',{className:'flex items-center  px-2 justify-start  main-component-house mt-1 relative rounded-md shadow-sm'},
                            
                                elt('button',{id:'adddevice-button-SD' ,onclick(event){
                            //operateStepper('Next')
                                    // hideSubscribeDeviceForm();
                                },type:'submit','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 mr-1 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Subscribe'),

                                elt('button',{id:'subscribe-cancel-button-SD',onclick(event){
                                    // operateStepper('Back')
                                    hideSubscribeDeviceForm();
                                } ,type:'button','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 ml-1 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Cancel')
                                
                            )
                        )
                     )
                    )
                    ,
                    elt('button',{type:'button',onclick(event){
                        revealSubscribeDeviceForm();
                    },id:'adddevice',className:'inline-block px-6 py-2.5 bg-transparent text-blue-500 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 focus:bg-gray-100 focus: focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'},
                    new DOMParser().parseFromString(
                        feather.icons['plus'].toSvg({class:'inline-block',width: 16,height: 16,}),
                        'image/svg+xml',
                      ).querySelector('svg')
                    ,'Add Device')
                )
            ),
            elt('div',{className:'w-full step2content hidden'},
        ),
        elt('div',{className:'step3content hidden'},buildBenefitSummary()),
            
        buildNavButton())
    // contentarea.appendChild(elt('p',{},'Subscribe device Page'));
}

function buildNavButton(){
    let nextbutton = elt('button',{id:'next-button-SD' ,async onclick(event){
        await operateStepper('Next')
    },type:'button','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 mr-1 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Next');
    let backbutton = elt('button',{id:'back-button-SD',async onclick(event){
        await operateStepper('Back')
    } ,type:'button','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 ml-1 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Back');
    
    

    let navbuttoncom = elt('div',{className:'bottom-nav-controller p-1'},
        elt('label',{for:'next-button-SD',className:'block text-sm font-medium text-gray-700'}),
        elt('div',{className:'flex items-center justify-start px-2  main-component-house mt-1 relative rounded-md shadow-sm'},
            
        nextbutton,
        backbutton
            )
    ) 

    return navbuttoncom
}

function buildNavButton1(){
    let nextbutton = elt('button',{id:'next-button-SD' ,async onclick(event){
        await operateStepper1('Next')
    },type:'button','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 mr-1 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Next');
    let backbutton = elt('button',{id:'back-button-SD',async onclick(event){
        await operateStepper1('Back')
    } ,type:'button','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 ml-1 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Back');
    
    

    let navbuttoncom = elt('div',{className:'bottom-nav-controller p-1'},
        elt('label',{for:'next-button-SD',className:'block text-sm font-medium text-gray-700'}),
        elt('div',{className:'flex items-center justify-start px-2  main-component-house mt-1 relative rounded-md shadow-sm'},
            
        nextbutton,
        backbutton
            )
    ) 

    return navbuttoncom
}

function buildAddDeviceList(){
    return getAddDeviceList().map(ele=>{
        console.log(elt('li',{id:ele.imei,className:'px-6 py-2 border-b border-gray-200 w-full'},
        elt('p',{},ele.deviceType),
        elt('p',{},`${ele.deviceMake} ${ele.deviceModel}`)))
        return elt('li',{id:ele.imei,className:'px-6 py-2 border-b border-gray-200 justify-between items-center flex w-full'},
                    elt('div',{},
                        elt('p',{},ele.deviceType),
                        elt('p',{},`${ele.deviceMake} ${ele.deviceModel}`)
                    ),
                    elt('div',{onclick(event){
                        console.log('remove');
                        console.log(getAddDeviceList(),event.target.parentElement.id)
                        deleteObjectFromArray(getAddDeviceList(),event.target.parentElement.id)
                        refreshSubscribedDeviceList();
                    }},
                        new DOMParser().parseFromString(
                        feather.icons['x'].toSvg({class:'inline-block cursor-pointer',width: 16,height: 16,}),
                        'image/svg+xml',
                      ).querySelector('svg')
                    )
                    
                    
                    
                )
    })
}

async function refreshSubscribedDeviceList(){
let deviceList = document.querySelector('.device-list-parent')
clearContent(deviceList);
deviceList.append(...buildAddDeviceList());

}

function revealSubscribeDeviceForm(){
    document.querySelector('.subscribedeviceform').classList.remove('hidden');
    document.querySelector('#adddevice').classList.add('hidden');
    document.querySelector('.bottom-nav-controller').classList.add('hidden');
}

function hideSubscribeDeviceForm(){
    document.querySelector('.subscribedeviceform').classList.add('hidden');
    document.querySelector('#adddevice').classList.remove('hidden');
    document.querySelector('.bottom-nav-controller').classList.remove('hidden');
}

async function buildDeviceSubscriptionAdd(){
    clearContent(document.querySelector('.replace-add-device'));
     
    return [elt('ul',{className:'device-list-parent rounded-lg border-gray-200 w-full text-sm text-gray-600'},
                    ...buildAddDeviceList()),
                    elt('form',{className:'w-full',async onsubmit(event){
                        event.preventDefault();
                        let dType = document.querySelector('#deviceType');
                        let dMake = document.querySelector('#deviceMake');
                        let dModel = document.querySelector('#deviceModel');
                        let dImei = document.querySelector('#deviceImei');

                        let subscribeDevice = {
                            deviceType:dType.options[dType.selectedIndex].text,
                            deviceMake:dMake.options[dMake.selectedIndex].text,
                            deviceModel:dModel.options[dModel.selectedIndex].text,
                            imei:dImei.value,
                            price:1500,
                            premium:1500*0.15

                            // 1st recon (outgoingvoice/data) 1st discon(outgoingvoice/data)
                    
                        }
                        addObjectToArray(getAddDeviceList(),subscribeDevice);
                        refreshSubscribedDeviceList();
                    }},
                        elt('div',{className:'subscribedeviceform px-2 w-full text-sm pt-2 hidden flex flex-wrap mb-2'},
                        elt('div',{className:'w-full md:w-1/4 px-3 mb-6 md:mb-0'},
                            elt('label',{for:'deviceType',className:'block uppercase  tracking-wide text-gray-700 text-xs font-bold mb-2'},'Device Type'),
                            elt('div',{className:'relative flex items-center'},
                                new DOMParser().parseFromString(
                                feather.icons['alert-circle'].toSvg({class:' hidden caution-select text-red-500 text-xs px-1'}),
                                'image/svg+xml',
                                    ).querySelector('svg'),
                                elt('select',{required:true,id:'deviceType',className:'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'},...(await addDeviceType())),
                                elt('div',{className:'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'},
                                    new DOMParser().parseFromString(
                                    feather.icons['chevron-down'].toSvg({class:'inline-block',width: 16,height: 16,}),
                                    'image/svg+xml',
                                ).querySelector('svg')
                                )
                                
                            )
                        ),
                        elt('div',{className:'w-full md:w-1/4 px-3 mb-6 md:mb-0'},
                            elt('label',{for:'deviceMake',className:'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'},'Device Make'),
                            elt('div',{className:'relative flex items-center'},
                                new DOMParser().parseFromString(
                                feather.icons['alert-circle'].toSvg({class:' hidden caution-select text-red-500 text-xs px-1'}),
                                'image/svg+xml',
                                    ).querySelector('svg'),
                                elt('select',{required:true,id:'deviceMake',className:'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'},...(await addDeviceType())),
                                elt('div',{className:'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'},
                                    new DOMParser().parseFromString(
                                    feather.icons['chevron-down'].toSvg({class:'inline-block',width: 16,height: 16,}),
                                    'image/svg+xml',
                                ).querySelector('svg')
                                )
                            )
                        ),
                        elt('div',{className:'w-full md:w-1/4 px-3 mb-6 md:mb-0'},
                            elt('label',{for:'deviceModel',className:'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'},'Device Model'),
                            elt('div',{className:'relative flex items-center'},
                                new DOMParser().parseFromString(
                                feather.icons['alert-circle'].toSvg({class:' hidden caution-select text-red-500 text-xs px-1'}),
                                'image/svg+xml',
                                    ).querySelector('svg'),
                                elt('select',{required:true,id:'deviceModel',className:'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'},...(await addDeviceType())),
                                elt('div',{className:'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'},
                                    new DOMParser().parseFromString(
                                    feather.icons['chevron-down'].toSvg({class:'inline-block',width: 16,height: 16,}),
                                    'image/svg+xml',
                                ).querySelector('svg')
                                )
                            )
                        ),
                        elt('div',{className:'w-full md:w-1/4 px-3 mb-6 md:mb-0'},
                            elt('label',{className:'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',for:'deviceImei'},'Device IMEI'),
                            elt('input',{required:true,placeholder:'Phone',type:'text',id:'deviceImei',className:'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'})
                        ),
                        elt('div',{className:'p-1'},
                            elt('label',{for:'subcribe-device-button-SD',className:'block text-sm font-medium text-gray-700'}),
                            elt('div',{className:'flex items-center  px-2 justify-start  main-component-house mt-1 relative rounded-md shadow-sm'},
                            
                                elt('button',{id:'adddevice-button-SD' ,onclick(event){
                            //operateStepper('Next')
                                    // hideSubscribeDeviceForm();
                                },type:'submit','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 mr-1 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Subscribe'),

                                elt('button',{id:'subscribe-cancel-button-SD',onclick(event){
                                    // operateStepper('Back')
                                    hideSubscribeDeviceForm();
                                } ,type:'button','data-mdb-ripple':"true",'data-mdb-ripple-color':"light",className:'px-6 ml-1 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'},'Cancel')
                                
                            )
                        )
                     )
                    ),
                    elt('button',{type:'button',onclick(event){
                        revealSubscribeDeviceForm();
                    },id:'adddevice',className:'inline-block px-6 py-2.5 bg-transparent text-blue-500 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 focus:bg-gray-100 focus: focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'},
                    new DOMParser().parseFromString(
                        feather.icons['plus'].toSvg({class:'inline-block',width: 16,height: 16,}),
                        'image/svg+xml',
                      ).querySelector('svg')
                    ,'Add Device')]
}
function buildBenefitSummary(){
    return elt('div',{className:'border-t border-gray-200'},
                    elt('h1',{className:'text-sm p-4'},'Payment Summary'),
                    elt('dl',{},
                         ...paymentDetailsListBuilding()
                    ),
                    elt('h1',{className:'text-sm p-4'},'Summary of Benefits'),
                    elt('dl',{},
                         ...benefitsDetailsListBuilding()
                    )
    )
}

function paymentDetailsListBuilding(){
    // let details  = JSON.parse(localStorage.getItem('companyProfile'));
    // console.log()
    return getpaymentSummaryList().map((ele,ind)=>{
        let value;
        if(ele=='No of Devices'){
            value = getAddDeviceList().length;
        } 
        else if(ele=='Premium Type') {
            value = 'Yearly'
        }
        else if(ele=='Premium Amount'){
            value= getAddDeviceList().map(ele=>ele.premium).reduce((previousvalue,currentvalue)=>previousvalue+currentvalue);
        } 
        else if(ele=='Expiring Date'){
            value = format( new Date(),'MM/dd/yyyy')
        } 
        else{
            value='MTN Mobile Money'
        }  

        return {title:ele,val: value}
        
            

        
        
        
    }).map((ele,ind)=>{
        console.log(ele)
        if(ind%2==0){
        

            return elt('div',{className:'bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'},
            elt('dt',{className:'text-sm font-medium text-gray-500'},ele.title),
            elt('dd',{className:'mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'},`${ele.val}`)
        )
        }else {
           return elt('div',{className:'bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'},
                            elt('dt',{className:'text-sm font-medium text-gray-500'},ele.title),
                            elt('dd',{className:'mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'},`${ele.val}`)
                        )

        }
    });

}

function benefitsDetailsListBuilding(){
    // let details  = JSON.parse(localStorage.getItem('companyProfile'));
    // console.log()
    return getBenefitSummaryList().map((ele,ind)=>{
        console.log(ele)
        if(ind%2==0){
        

            return elt('div',{className:'bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'},
            elt('dt',{className:'text-sm font-medium text-gray-500'},ele.val),
            elt('dd',{className:'mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'},new DOMParser().parseFromString(
                feather.icons['check'].toSvg({class:'inline-block text-green-500',width: 16,height: 16,}),
                'image/svg+xml',
              ).querySelector('svg'))
        )
        }else {
           return elt('div',{className:'bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'},
                            elt('dt',{className:'text-sm font-medium text-gray-500'},ele.val),
                            elt('dd',{className:'mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'},new DOMParser().parseFromString(
                                feather.icons['check'].toSvg({class:'inline-block  text-green-500',width: 16,height: 16,}),
                                'image/svg+xml',
                              ).querySelector('svg'))
                        )

        }
    });

}

// function revealBottomButtonNav(){
//     document.querySelector('.bottom-nav-controller').classList.remove('hidden');
// }
function buildSubscribeDeviceSummaryPage(){
    clearContent(document.querySelector('.step2content'));
    if(getAddDeviceList().length==0){
        buildCautionDialog('Kindly subscribe a device to see Device Subscription Summary');
        operateStepper('Back');
    }else{
        return elt('div',{className:'flex'},
        elt('div',{className:'w-3/4 bg-white px-6 py-2'},
            elt('div',{className:'flex justify-between border-b pb-2'},
                elt('h1',{className:'font-semibold text-sm'},'Device Subscription Summary'),
                elt('h1',{className:'font-semibold text-sm'},`${getAddDeviceList().length} Item(s)`)),
            elt('div',{className:'flex mt-2 mb-2'},
                elt('h3',{className:'font-semibold text-gray-600 text-xs uppercase w-2/5'},'Device Details'),
                elt('h3',{className:'font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center'},'Quantity'),
                elt('h3',{className:'font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center'},'Amount Insured'),
                elt('h3',{className:'font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center'},'Premium')
            ),
            ...buildDevicesListSummaryPage()
            
        ),
        elt('div',{id:'summary', className:'w-1/4 bg-gray-100 px-8 py-2'},
            elt('h1',{className:'font-semibold text-sm border-b pb-2'},'Subscription Summary'),
            elt('div',{className:'flex justify-between mt-10 mb-5'},
                elt('span',{className:'font-semibold text-sm uppercase'},`Items ${getAddDeviceList().length}`),
                elt('span',{className:'font-semibold text-sm'},`GHS ${getAddDeviceList().map(ele=>ele.price).reduce((previousvalue,currentvalue)=>previousvalue+currentvalue)}`)
            ),
            elt('div',{},
                elt('label',{className:'font-semibold inline-block mb-3 text-sm uppercase'},'Premium Percentage'),
                elt('input',{disabled:true, value:'15%',type:'text',disabled:true,className:'p-2 text-sm w-full'})),
            elt('div',{className:'py-2'},
                elt('label',{for:'premium-amount',className:'font-semibold inline-block mb-3 text-sm uppercase'},'Premium Amount'),
                elt('input',{disabled:true ,type:'text',id:'premium-amount',value:`GHS ${getAddDeviceList().map(ele=>ele.premium).reduce((previousvalue,currentvalue)=>previousvalue+currentvalue)}`,className:'p-2 text-sm w-full'})
            ),
            elt('form',{action:'https://checkout.paywithonline.com/',target:'_blank',className:'border-t mt-2'},

            elt('div',{className:'hidden'},
            // elt('label',{className:'block text-sm'},'Email'),
            elt('input',{name:'merchant_key', value:'tk_5a2ac262-da6b-11eb-98ae-f23c9170642f',id:'merchid',type:'hidden',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'}),
            elt('input',{name:'success_url', value:'',id:'success_url',type:'hidden',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'}),
            elt('input',{name:'cancelled_url', value:'',id:'cancelled_url',type:'hidden',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'}),
            elt('input',{name:'ipn_url', value:'',id:'ipn_url',type:'hidden',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
            
            elt('div',{className:'hidden'},
            elt('label',{className:'block text-sm'},'Invoice ID'),
            elt('input',{name:'invoice_id', value:'',id:'invoice_id',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
            elt('div',{className:'hidden'},
            elt('label',{className:'block text-sm'},'Name'),
            elt('input',{name:'extra_name', value:'',id:'extra_name',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
            elt('div',{className:'hidden'},
            elt('label',{className:'block text-sm'},'Contact'),
            elt('input',{name:'extra_mobile', value:'',id:'extra_mobile',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
            elt('div',{className:'hidden'},
            elt('label',{className:'block text-sm'},'Email'),
            elt('input',{name:'extra_email', value:'',id:'extra_email',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
            elt('div',{className:'hidden'},
            elt('label',{className:'block text-sm'},'total'),
            elt('input',{name:'total', value:'',id:'total',type:'text',className:'w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'})),
                elt('div',{className:'flex font-semibold justify-between py-6 text-sm uppercase'},
                    elt('span',{},'Total Cost'),
                    elt('span',{},`GHS ${getAddDeviceList().map(ele=>ele.premium).reduce((previousvalue,currentvalue)=>previousvalue+currentvalue)}`)),
                elt('button',{type:'submit',className:'bg-blue-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'},'Make Payment')))
    )
    }
    
}
 function  buildDevicesListSummaryPage(){
    return getAddDeviceList().map(ele=>{
        return elt('div',{className:'flex items-center hover:bg-gray-100 -mx-2 px-2 py-2'},
                    elt('div',{className:'flex w-2/5'},
                        elt('div',{className:'w-20'},
                        elt('img',{className:'h-24',src:'https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z'})
                        ),
                        elt('div',{className:'flex flex-col justify-between ml-4 flex-grow'},
                            elt('span',{className:'font-bold text-sm'},'Iphone 6S'),
                            elt('span',{className:'font-bold text-sm summary-device-imei'},ele.imei),
                            elt('span',{className:'text-red-500 text-xs'},'Apple'),
                            elt('a',{className:'font-semibold hover:text-red-500 cursor-pointer text-gray-500 text-xs',onclick(event){
                                    console.log(ele.imei)
                                    deleteObjectFromArray(getAddDeviceList(),ele.imei);
                                    document.querySelector('.step2content').append(buildSubscribeDeviceSummaryPage());
                            }},'Remove')
                        )
                        
                    ),
                    elt('div',{className:'flex justify-center w-1/5'},
                            elt('p',{className:'mx-2 text-sm text-center w-8'},'1')
                        ),
                        elt('span',{className:'text-center w-1/5  text-sm'},`GHS ${ele.price}`),
                        elt('span',{className:'text-center w-1/5  text-sm'},`GHS ${ele.premium}`)
                )
    })
    
}

function buildClaimSummaryPage(){
    return elt('div',{className:'flex'},
        elt('div',{className:'w-full bg-white px-6 py-2'},
            elt('div',{className:'flex justify-between border-b pb-2'},
                elt('h1',{className:'font-semibold text-sm'},'Claim Subscription Summary'),
                elt('h1',{className:'font-semibold text-sm'},`${getAddDeviceList().length} Item(s)`)),
            elt('div',{className:'flex mt-2 mb-2'},
                elt('h3',{className:'font-semibold text-gray-600 text-xs uppercase w-2/5'},'Device Details'),
                elt('h3',{className:'w-2/5'}),
                elt('h3',{className:'font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center'},'What happened to this device?'),
                
            ),
            ...buildClaimDevicesListSummaryPage()
            
        )
    )
}

function  buildClaimDevicesListSummaryPage(){
    return getAddDeviceList().map(ele=>{
        return elt('div',{className:'flex items-center hover:bg-gray-100 -mx-2 px-2 py-2'},
                    elt('div',{className:'flex w-2/5'},
                        elt('div',{className:'w-20'},
                        elt('img',{className:'h-24',src:'https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z'})
                        ),
                        elt('div',{className:'flex flex-col justify-between ml-4 flex-grow'},
                            elt('span',{className:'font-bold text-sm'},'Iphone 6S'),
                            elt('span',{className:'font-bold text-sm summary-device-imei'},ele.imei),
                            elt('span',{className:'text-red-500 text-xs'},'Apple'),
                            elt('a',{className:'font-semibold hover:text-red-500 cursor-pointer text-gray-500 text-xs',onclick(event){
                                    console.log(ele.imei)
                                    deleteObjectFromArray(getAddDeviceList(),ele.imei);
                                    document.querySelector('.step2content').append(buildSubscribeDeviceSummaryPage());
                            }},'Remove')
                        )
                        
                    ),
                    elt('span',{className:'w-2/5'},),
                    elt('select',{required:true,id:'deviceModel',className:'block appearance-none w-1/5 text-sm bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'}, ...addClaimOptions())
                )
    })
    
}

async function operateStepper(direction){
    if(direction=='Next'){
        let active = document.querySelector('.stepper-active');
        if(active.classList.contains('step1')){
            active.classList.remove('stepper-active');
            active.classList.add('stepper-completed');
            document.querySelector('.step1content').classList.add('hidden');
            document.querySelector('.step2').classList.add('stepper-active');
            document.querySelector('.step2content').classList.remove('hidden');
            document.querySelector('.step2content').append(buildSubscribeDeviceSummaryPage())

        }else if(active.classList.contains('step2')){

            active.classList.remove('stepper-active');
            active.classList.add('stepper-completed');
            document.querySelector('.step2content').classList.add('hidden');
            document.querySelector('.step3').classList.add('stepper-active');
            document.querySelector('.step3content').classList.remove('hidden');
        }
    }else if(direction=='Back'){
        let active = document.querySelector('.stepper-active');
        if(active.classList.contains('step3')){
            active.classList.remove('stepper-active');
            active.classList.add('stepper-completed');
            document.querySelector('.step3content').classList.add('hidden');
            document.querySelector('.step2').classList.add('stepper-active');
            document.querySelector('.step2content').classList.remove('hidden');
            document.querySelector('.step2content').append(buildSubscribeDeviceSummaryPage())
        }else if(active.classList.contains('step2')){

            active.classList.remove('stepper-active');
            active.classList.add('stepper-completed');
            document.querySelector('.step2content').classList.add('hidden');
            document.querySelector('.step1').classList.add('stepper-active');
            document.querySelector('.step1content').classList.remove('hidden');
            document.querySelector('.replace-add-device').append( ...( await buildDeviceSubscriptionAdd()))
        }
    }
}

async function operateStepper1(direction){
    if(direction=='Next'){
        let active = document.querySelector('.stepper-active');
        if(active.classList.contains('step1')){
            active.classList.remove('stepper-active');
            active.classList.add('stepper-completed');
            document.querySelector('.step1content').classList.add('hidden');
            document.querySelector('.step2').classList.add('stepper-active');
            document.querySelector('.step2content').classList.remove('hidden');
            document.querySelector('.step2content').append(buildClaimSummaryPage())

        }else if(active.classList.contains('step2')){

            active.classList.remove('stepper-active');
            active.classList.add('stepper-completed');
            document.querySelector('.step2content').classList.add('hidden');
            document.querySelector('.step3').classList.add('stepper-active');
            document.querySelector('.step3content').classList.remove('hidden');
        }
    }else if(direction=='Back'){
        let active = document.querySelector('.stepper-active');
        if(active.classList.contains('step3')){
            active.classList.remove('stepper-active');
            active.classList.add('stepper-completed');
            document.querySelector('.step3content').classList.add('hidden');
            document.querySelector('.step2').classList.add('stepper-active');
            document.querySelector('.step2content').classList.remove('hidden');
            document.querySelector('.step2content').append(buildClaimSummaryPage())
        }else if(active.classList.contains('step2')){

            active.classList.remove('stepper-active');
            active.classList.add('stepper-completed');
            document.querySelector('.step2content').classList.add('hidden');
            document.querySelector('.step1').classList.add('stepper-active');
            document.querySelector('.step1content').classList.remove('hidden');
            
            // document.querySelector('.replace-add-device').append( ...( await buildDeviceSubscriptionAdd()))
        }
    }
}


function buildStepper(options=['Add Device(s)','Summary','Payment']){
    return elt('ul',{className:'stepper stepper-horizontal add-device-stepper',"data-mdb-stepper":'stepper'},
    elt('li',{className:'stepper-step step1 stepper-active'},
        elt('div',{className:'stepper-head'},
            elt('span',{className:'stepper-head-icon'},'1'),
            elt('span',{className:'stepper-head-text text-sm'},options[0])
        ),
    ),
    elt('li',{className:'stepper-step step2'},
        elt('div',{className:'stepper-head'},
            elt('span',{className:'stepper-head-icon'},'2'),
            elt('span',{className:'stepper-head-text- text-sm'},options[1])
            ),
        
        ),
    elt('li',{className:'stepper-step step3'},
        elt('div',{className:'stepper-head'},
            elt('span',{className:'stepper-head-icon'},'3'),
            elt('span',{className:'stepper-head-text text-sm'},options[2])
            ),
        )
    
    
    


    )
}

function buildClaimFinalPage(){
    return elt('div',{className:'w-full flex items-center  flex-col'},
        elt('h3',{className:'text-3xl sm:text-4.5xl text-blue-700 font-extrabold mb-4'},'Thank you for filing your claim'),
        elt('h4',{className:'mb-8'},'Your claim code is HG123484723'),
        elt('p',{className:'mb-8 max-w-lg text-sm mx-auto'},'You will notified in 72-hours if your claim is successful'),
        elt('p',{className:'mb-8 max-w-lg text-sm mx-auto'},'Remember to come to the office with a Valid National ID and a printed copy of the claim code for identification and verification purposes')
    )
    
}
async function buildFileClaimPage(){
    // let contentarea = document.querySelector('.content-area')
    // clearContent(contentarea);
    return [elt('div',{className:'w-full step1content'},...(await buildFilterSection()),
        elt('div',{className:'w-full h-6'}),
        elt('div',{className:'flex max-w-full w-full text-sm px-2 pt-2'},
        elt('table',{id:'example',style:'width:100%',className:'w-full text-gray-500 display compact'}))),
    elt('div',{className:'w-full step2content hidden'},),
    elt('div',{className:'w-full step3content hidden'},buildClaimFinalPage())]
      
}


// function increaseHeightofUL(){
//     let container = document.querySelector('.ul-parent');
//     let content = document.querySelector('.stepper');

//     content.style.height= ( container.offsetHeight - content.offsetTop ) + "px";
//     // let containerHeight = elem.offsetHeight;
//     // let lastChild = elem.childNodes[elem.childNodes.length-1];
//     // let verticalOffset = lastChild.offsetTop + lastChild.offsetHeight;
// }