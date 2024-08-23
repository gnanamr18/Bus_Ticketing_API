// let a = [1, 2, 3, 0, 55, 7];
// let swapped = true;

// while (swapped) {
//   swapped = false;
//   for (let i = 0; i < a.length; i++) {
//     if (a[i + 1] < a[i]) {
//       let temp = a[i];
//       a[i] = a[i + 1];
//       a[i + 1] = temp;
//       swapped = true;
//     }
//   }
// }
// console.log(a);

// let a = "hey folks how are you--doing";
// let find = "you";

// let b = "";

// for (let i = 0; i < a.length; i++) {
//   if (a[i] === " " || i === a.length || a[i] === "-") {
//     if (b === find) {
//       console.log(true);
//     }
//     b = "";
//   } else {
//     b = b + a[i];
//   }
// }
// console.log(b);

//count digits in a number

let a = 56;
let counter = 1;

while (a > 0) {
  let digit = a / 10;
  counter = counter + 1;
}
console.log(counter);
