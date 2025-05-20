//типизация входного параметра
declare function greet(name: string): void;

greet("42");

//типизация выходного параметра
function getFavoriteNumber(): number {
  return 26
}

//
async function getFavoriteNumber1(): Promise<number> {
  return 26;
}

// типизирование объекта
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({x: 3, y: 7});

// если параметр не объязательный обозначается "?" то нужно всегда проверять что бы не было ошибки
function printName(obj: { first: string; last?: string }) {
  // Ошибка — возможен сбой, если не указан 'obj.last'!
  console.log(obj.last.toUpperCase());
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }
  // Безопасная альтернатива с использованием современного синтаксиса JavaScript:
  console.log(obj.last?.toUpperCase());
}

//работы с разными типами определеется через |
function printId(id: number | string) { // происходит сужение методов number и string до общих методов
  console.log("Your ID is: " + id);
}

// OK
printId(101);
// OK
printId("202");
// Error
printId({myID: 22342});

// типизирование
type Point = {
  x: number;
  y: number;
};

// Точно так же, как и в предыдущем примере
function printCoord1(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({x: 100, y: 100});

// Почти все возможности interface доступны в type, главное отличие в том,
// что тип нельзя открыть повторно для добавления новых свойств, в отличие от интерфейса, который всегда можно расширить.

// Interface	Type
// Расширение интерфейса

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

// Расширение типа через пересечения

type Animal1 = {
  name: string;
}

type Bear1 = Animal & {
  honey: boolean;
}

const bear1 = getBear1();
bear.name;
bear.honey;

// Добавление новых полей в существующий интерфейс

interface Window2 {
  title: string;
}

interface Window2 {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

// Тип не может быть изменен после создания.

type Window1 = {
  title: string;
}

type Window = {
  ts: TypeScriptAPI;
}

// Error: Duplicate identifier 'Window'.

// Псевдонимы типов не могут участвовать в слиянии объявлений, но интерфейсы могут .
//   Интерфейсы можно использовать только для объявления форм объектов, но не для переименования примитивов .
//   Имена интерфейсов всегда будут отображаться в своей исходной форме в сообщениях об ошибках, но только если они используются по имени.
//   Использование интерфейсов с extends часто может быть более производительным для компилятора, чем псевдонимы типов с пересечениями.


// В этой ситуации вы можете использовать утверждение типа , чтобы указать более конкретный тип:
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// Вы также можете использовать синтаксис угловых скобок (за исключением случаев, когда код находится в .tsxфайле), что эквивалентно:
const myCanvas1 = <HTMLCanvasElement>document.getElementById("main_canvas");


declare function handleRequest(url: string, method: "GET" | "POST"): void;

// const req = { url: "https://example.com", method: "GET" as "GET" };
// const req = {url: "https://example.com", method: "GET"} as const;
const req = {url: "https://example.com", method: "GET"};
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.


// Enum
// Перечисления — это функция, добавленная в JavaScript TypeScript, которая позволяет описывать значение,
// которое может быть одним из набора возможных именованных констант. В отличие от большинства функций TypeScript,
// это не дополнение к JavaScript на уровне типа, а что-то добавленное к языку и среде выполнения.
// Из-за этого это функция, о существовании которой вы должны знать, но, возможно, воздержитесь от ее использования,
// если вы не уверены. Вы можете прочитать больше о перечислениях на странице справки Enum .


// Сужение типов с помощью оператора in
// Оператор in проверяет наличие свойства в объекте, что позволяет TypeScript сузить тип объекта до конкретного типа,
// имеющего это свойство.
function printArea(shape: Square | Circle) {
  if ("radius" in shape) {
    console.log(Math.PI * shape.radius ** 2); // shape теперь имеет тип Circle
  } else {
    console.log(shape.sideLength ** 2); // shape теперь имеет тип Square
  }
}

// Сужение типов с помощью оператора instanceof
// Оператор instanceof проверяет, создан ли объект с помощью определенной функции конструктора.
//   Это позволяет уточнить тип переменной до типа этого конструктора.
function printDate(date: Date | string) {
  if (date instanceof Date) {
    console.log(date.toISOString()); // date теперь имеет тип Date
  } else {
    console.log(date); // date теперь имеет тип string
  }
}

// Использование предикатов типа (type predicates)
// Type predicates - это специальные функции, которые позволяют явно указать, какой тип имеет переменная
// в определенном контексте.

function isString(test: any): test is string {
  return typeof test === "string";
}

function printText(text: any) {
  if (isString(text)) {
    console.log(text.toUpperCase()); // text теперь явно имеет тип string
  }
}

// Исключающие объединения (Discriminated unions)
// Исключающие объединения (или Discriminated unions) - это шаблон, который включает общее свойство (например, kind)
// в каждом элементе объединения, позволяющий TypeScript точно определить, к какому типу относится значение.

type Square = { kind: "square"; size: number; };
type Circle = { kind: "circle"; radius: number; };

function getArea(shape: Square | Circle) {
  switch (shape.kind) {
    case "square":
      return shape.size ** 2;
    case "circle":
      return Math.PI * shape.radius ** 2;
  }
}

// Тип never
// Тип never используется для представления значений, которые никогда не должны произойти. В контексте сужения типов,
// это полезно для функций, которые не возвращают управление (например, выбрасывают исключение) или для
// исчерпывающей проверки случаев в switch.

function throwError(message: string): never {
  throw new Error(message);
}

function getArea(shape: Square | Circle): number {
  switch (shape.kind) {
    case "square":
      return shape.size ** 2;
    case "circle":
      return Math.PI * shape.radius ** 2;
    default:
      // Если добавится новый тип, TypeScript укажет на ошибку здесь
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// Объявление this в функции
// TypeScript определит, что thisдолжно быть в функции, с помощью анализа потока кода, например, в следующем примере:

const user = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

// Пытаться // TypeScript понимает, что функция user.becomeAdminимеет соответствующий thisвнешний объект user.
// this, хех , может быть достаточно для многих случаев, но есть много случаев, когда вам нужно больше контроля над тем,
// что thisпредставляет объект. Спецификация JavaScript гласит, что у вас не может быть параметра с именем this,
// и поэтому TypeScript использует это синтаксическое пространство, чтобы вы могли объявить тип for thisв теле функции.

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});

// void представляет собой возвращаемое значение функций, которые не возвращают значение.
// Это выведенный тип всякий раз, когда функция не имеет никаких returnоператоров или не возвращает никакого
// явного значения из этих операторов возврата:

// never
// Некоторые функции никогда не возвращают значение:
function fail(msg: string): never {
  throw new Error(msg);
}

// Тип never представляет значения, которые никогда не наблюдаются. В возвращаемом типе это означает,
// что функция выдает исключение или завершает выполнение программы.
//   never также появляется, когда TypeScript определяет, что в объединении ничего не осталось.

// Utility Types — это готовые инструменты, встроенные в TypeScript, которые позволяют изменять или использовать типы
// по-новому. Это как набор функций, но для работы с типами. Они упрощают жизнь и избавляют от повторения кода.

// Самые популярные Utility Types:
// 1. Partial<T> Partial делает все поля объекта необязательными.

type User = {
  name: string;
  age: number;
};
const updateUser = (user: Partial<User>) => {
  // можно передать только name или только age
};
// Зачем нужно: удобно при обновлении данных — не нужно указывать все поля.

// 2. Required<T>Наоборот — делает все поля обязательными, даже если раньше были необязательные.
type User = {
  name?: string;
  age?: number;
};
type StrictUser = Required<User>; // теперь name и age обязательны


// 3. Readonly<T> Делает поля только для чтения — их нельзя изменить после создания.
type User = {
  name: string;
};
const user: Readonly<User> = {name: "Alex"};
user.name = "Anna"; // ошибка!

// 4. Pick<T, K> Выбирает только нужные поля из типа.
type User = {
  name: string;
  age: number;
  email: string;
};

type NameAndEmail = Pick<User, "name" | "email">;


// 5. Omit<T, K> Противоположен Pick — убирает указанные поля.
type User = {
  name: string;
  age: number;
  email: string;
};
type NoEmail = Omit<User, "email">;

// 6. Record<K, T>Создаёт объект с ключами из K и значениями типа T.
type Roles = "admin" | "user" | "guest";

const access: Record<Roles, boolean> = {
  admin: true,
  user: true,
  guest: false,
};

// 7. Exclude<T, U>Исключает из типа T всё, что есть в U.
type Roles = "admin" | "user" | "guest";
type WithoutGuest = Exclude<Roles, "guest">; // "admin" | "user"

// 8. Extract<T, U>Оставляет только те, что есть и в T, и в U.
type A = "a" | "b" | "c";
type B = "b" | "c" | "d";
type Common = Extract<A, B>; // "b" | "c"

// 9. ReturnType<T> Берёт тип возвращаемого значения из функции.
function getUser() {
  return {name: "Alex", age: 25};
}

type User = ReturnType<typeof getUser>; // { name: string; age: number }


//определения :

// unknown
// — Супертип для всех типов: ✅
// — Подтип для всех типов: ❌
// → Это значит, что любой тип можно присвоить unknown, но unknown нельзя напрямую присвоить другим типам без приведения.
// Принимает любой тип (супертип).
// Нельзя использовать напрямую, пока не уточнишь тип (например, через проверку).
// Безопаснее, чем any.

//   any
// — Супертип для всех типов: ✅
// — Подтип для всех типов: ✅
// → Полностью "прозрачный" тип: можно присвоить и получить из любого типа, без ограничений и проверок.
// Принимает и может быть присвоен любому типу.
// Отключает проверку типов — полная свобода, но без защиты.
// Используется, когда нужно "обойти" систему типов (лучше избегать по возможности).



//   never
// — Супертип для всех типов: ❌
// — Подтип для всех типов: ✅
// → Тип, представляющий невозможные значения (например, функция, которая никогда не завершится). Может быть присвоен куда угодно, но ничего нельзя присвоить never.
//   Такое понимание важно при работе с типовой системой TypeScript и особенно полезно при построении обобщений и проверок типов.
// Тип, который никогда не встречается (например, функция с throw или бесконечный цикл).
// Можно присвоить в любой тип, но в него ничего не присвоишь.
// Используется для исключений и исчерпывающих проверок.

//void — означает “ничего не возвращает”
// Используется в функциях без return
// Позволяет явно указать отсутствие результата

// enum (перечисление) — это способ задать набор именованных константных значений.
// Удобно, когда нужно представить ограниченное множество вариантов (например, дни недели, роли, статусы и т.д.).











