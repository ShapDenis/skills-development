const getValue = <Type, Key extends keyof Type>(obj: Type, key: Key) => {
  return obj[key];
}

const user = {id: 1, name: "Anna"};

const id = getValue(user, "id");     // id: number
const name1 = getValue(user, "name"); // name: string

console.log(id);
console.log(name1);


function getFirstElement<Type>(arr: Type[]): Type {
  return arr[0];
}

// 1.  <Type> обобщенная функция
// 2.  Type[] - это массив, который будет передан в функцию
// 3.  Type - это параметр типа, который будет заменен на конкретный тип при вызове функции


const num = getFirstElement([1, 2, 3]); // тип number
const str = getFirstElement(["a", "b", "c"]); // тип string
const obj = getFirstElement([{id: 1}, {id: 2}]); // тип { id: number }

// Напиши функцию isString, которая проверяет, является ли значение строкой.

const isUser = (value: unknown) => {

  if (typeof value !== "object") {
    throw new Error(`переданное значение не является объектом: ${JSON.stringify(value)}`)
  }

  if (value === null) {
    throw new Error(`переданное значение не является объектом: ${JSON.stringify(value)}`)
  }

  if (!("login" in value)) return false

  if (typeof value.login === "string") return false

  return true
}


// Создай функцию sum, которая принимает два числа и возвращает их сумму. Типизируй её.

const sum = (a: number, b: number): number => {
  return a + b
}

console.log(sum(5, 4));


// Определи константу PI, которая будет всегда 3.14 (типизируй как const).

const PI = 3.14 as const;


// Создай объект user с полями name: string и age: number.

// Напиши функцию greet, которая принимает user и возвращает строку "Hello, [name]!".

// const user = {
//   name: "Ivan",
//   age: "31"
// }

// const greet = (user) =>{
//   return 'Hello, ${name}!'
// }


// console.log(greet(user))


// Создай функцию formatValue, которая принимает аргумент типа string | number.

// Если это строка — возвращает её в верхнем регистре.

// Если число — возвращает его, умноженное на 2.

const formatValue = (value: string | number): string | number => {

  if (value === undefined || value === null) return "" //?????

  if (typeof value === "string") return value.toUpperCase();

  if (typeof value === "number") return value * 2;

  throw new Error("Unsupported value type");

}

console.log(formatValue("ivan"))

console.log(formatValue(15))


// Создай массив numbers, содержащий только числа (типизируй).

// ❓ Напиши функцию sumArray, которая принимает массив чисел и возвращает их сумму.

const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const sumArray = (value: number[]) => {

  return value.reduce((acc, item) => acc + item, 0)

}
console.log(sumArray(numbers))




// Напиши функцию isString, которая проверяет, является ли значение строкой.

const isString = (value: unknown): boolean => typeof value === "string"

console.log(isString(123));
console.log(isString("123"));
