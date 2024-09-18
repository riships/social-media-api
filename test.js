// function random(a, b) {
//     let newObj = {};
//     newObj[a] = b;
//     return newObj
// }

// let a = "rishi";
// let b = "gyanu";

// console.log(random(a, b));

// let something = 'some';

// try {
//     console.log('i try first');
//     abcd();
//     console.log('i try again');    
// } catch (error) {
//     console.log('error here');
// }finally{
//     console.log(something);

// }



// console.log("first");
// const promiseOutput = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve()
//     }, 0)
// })
// promiseOutput.then((data) => {
//     console.log("second")
// })
// console.log('third');



// console.log("first");
// const promiseOutput = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve()
//     }, 0)
// })
// promiseOutput.then((data) => {
//     console.log('second')
// })
//     .then((data) => {
//         console.log(data);//this??
//     })
// console.log("third");


// function createIncrement() {
//     let count = 0;
//     function increment() {
//         count++;
//     }
//     let message = `Count is ${count}`
//     function log() {
//         console.log(message);
//     }
//     return [increment, log];
// }
// const [increment, log] = createIncrement();
// increment()
// increment();
// increment();
// log(); //output??


let str = "AABBBDAAAA";

let strArr = str.split('');
for (let i = 0; i < strArr.length; i++) {
    let res = '';
    for (let j = 0; j < strArr.length; j++) {
        let count = 0;
        if (strArr[i] === strArr[j]) {
            count++
            res + strArr[i] + count
        } else {
            null;
        }
    }
    console.log(res);

}
