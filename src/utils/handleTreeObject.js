export const handleTreeObject = (data)=>{

const check = data.find(item=> item.children?.length !== 0); 

if(check !== undefined){
    console.log('zooo');
    let initObject = {}; 
    data.forEach(item=>{
        item.children = []; 
        item.level = 0;  
        initObject[item.AccountId] = item; 
    }) 

    const keys = Object.keys(initObject); 

    for(let item of data){
        console.log('item',item);
        if(keys.includes(item.ParentId)){
            item.level = initObject[item.ParentId].level + 1; 
            initObject[item.ParentId].children.push(item); 
        }
    }    
    return data.filter(item=>item.ParentId === null).reverse();
    
}else {
    return data.reverse();
}
}