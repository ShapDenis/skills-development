const getValue = <Type, Key extends keyof Type>(obj: Type, key: Key) => {
  return obj[key];
}


const user = {id: 1, name: "Anna"};

const id = getValue(user, "id");     // id: number
const name = getValue(user, "name"); // name: string

console.log(id);
console.log(name);


function getFirstElement <Type>(arr:Type[]):Type {
  return arr[0];
}
// 1.  <Type> обобщенная функция
// 2.  Type[] - это массив, который будет передан в функцию
// 3.  Type - это параметр типа, который будет заменен на конкретный тип при вызове функции


const num = getFirstElement([1, 2, 3]); // тип number
const str = getFirstElement(["a", "b", "c"]); // тип string
const obj = getFirstElement([{ id: 1 }, { id: 2 }]); // тип { id: number }

