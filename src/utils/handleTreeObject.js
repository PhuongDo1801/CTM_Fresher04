export const handleTreeObject = (data)=>{

const check = data.find(item=> item.ParentId !== null); 

if(check !== undefined){
    let initObject = {}; 
    data.forEach(item=>{
        initObject[item.AccountId] = item; 
        item.children = []; 
        if(item.ParentId === null){
            item.level = 0; 
        }
    }) 
    const keys = Object.keys(initObject); 
    data.forEach(item=>{ 
        if(keys.includes(item.ParentId?.toString())){
            item.level = initObject[item.ParentId].isShowChild = false; 
            item.level = initObject[item.ParentId].level + 1; 
            initObject[item.ParentId].children.push(item); 
        }
    }); 
    
    return data.filter(item=>item.ParentId === null);
    
}else {
    return data = data.map(item=>{
        item.isShowChild = false;
        return item; 
    });
}
}