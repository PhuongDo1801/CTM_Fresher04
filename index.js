

const tree = [
    {id:1,name:"iphone",parentId:0}, 
    {id:2,name:"samsung",parentId:0},
    {id:3,name:"iphone 4",parentId:1}, 
    {id:4,name:"samsung galaxy",parentId:2},
    {id:5,name:"iphone 5",parentId:1}, 
    {id:6,name:"samsung galaxy",parentId:2},
    {id:7,name:"iphone 6",parentId:1}, 
    {id:8,name:"samsung galaxy s5",parentId:6},
    {id:9,name:"iphone 6 plus",parentId:7}, 
    {id:10,name:"samsung s8",parentId:2},
    {id:11,name:"iphone 6s",parentId:7},
    {id:12,name:"iphone 61",parentId:11},
    {id:13,name:"iphone 62",parentId:12},
    {id:14,name:"iphone 63",parentId:13},
    {id:15,name:"iphone 64",parentId:14},
]

let initObject = {}; 
tree.forEach(item=>{
    initObject[item.id] = item; 
    item.children = []; 
})

const keys = Object.keys(initObject); 

tree.forEach(item=>{
    if(keys.includes(item.parentId.toString())){
        initObject[item.parentId].children.push(item); 
    }
}); 


const data =  tree.filter(item=>item.id == 11); 

data.forEach(item=>{
    console.log(item);
})


