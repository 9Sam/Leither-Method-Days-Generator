const xs = require('./xlsx');

const levels = {
    lv1: 1,
    lv2: 2,
    lv3: 5,
    lv4: 7,
    lv5: 15,
    lv6: 30,
    lv7: 60,
    lv8: 90
}

let levels2 = Object.values(levels);
let totalDays = levels2.reduce((acc, level) => acc += level)

let i = 1;
let data = [];
while (i <= totalDays){
    let reviews = [];

    if(i % levels.lv8 == 0){ reviews.push(Object.keys(levels)[7])}
    if(i % levels.lv7 == 0){ reviews.push(Object.keys(levels)[6])}
    if(i % levels.lv6 == 0){ reviews.push(Object.keys(levels)[5])}
    if(i % levels.lv5 == 0){ reviews.push(Object.keys(levels)[4])}
    if(i % levels.lv4 == 0){ reviews.push(Object.keys(levels)[3])}
    if(i % levels.lv3 == 0){ reviews.push(Object.keys(levels)[2])}
    if(i % levels.lv2 == 0){ reviews.push(Object.keys(levels)[1])}
    if(i % levels.lv1 == 0){ reviews.push(Object.keys(levels)[0])}

    let newReviews = getNumbers(reviews);
    let datas = [i, newReviews];
    data.push(datas);
    i++;
}

function getNumbers(levels){ 
    let newElements = [];
    levels.forEach(el => { 
        newElements.push(el.slice(2,3));
    })

    return newElements;
}

xs.createFile('./database/',"Awesome");
xs.insertRows(data);