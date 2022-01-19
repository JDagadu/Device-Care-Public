
function clearContent(parent){
    if(parent){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
    
}

export {clearContent};