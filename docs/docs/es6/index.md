## const 和 let  

**1. 暂时性死区**

- `let 和 const` 命令声明的变量五变量提升， 在命令执行前， 使用该变量都将报错， 这一部分成为‘‘暂时性死区‘’

- `let tmp` 将`tmp` 变量绑定到 `{}` 代码块之内， 外部的`tmp`声明无效，`tmp = ‘abc’` 就处在死去， 所以报错。 同理在以前没有 let 和 `const`命令的时候， `typeof`是一个安全的运算符， 即使变量没有被声明， 也会正常返回 `undefined`， 但如果`typeof`处在死区中， 处理后了在后文被`let`和 `const`的变量 将会报错。

---
**2. 顶层对象**

- var 和 function 的全局声明会自动绑定到 window 或 global 对象， 这是 es 5 全局变量的一个缺陷， let 和 const 不会、

---
**3. const 命令**

- const 声明的变量只是引用无法修改， 对象的内部结构可以改变， 使用 Object.freeze() 可以彻底锁定某对象， 需递归锁定多层级对象。

    ```js
    var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key, i) => {
        if (typeof obj[key] === "object") {
        constantize(obj[key]);
        }
    });
    };
    ```

## Symbol

`Symbol` 为不会重复的值， 第七种基本数据类型， 类似字符串， 可以作为对象的`key`， 但不会被`for..of` , `for...in`, `Object.getOwnPropertyNames()`, `Object.keys()` 返回， 如需遍历， 需使`Object.getOwnPropertySymbols()`, 或者 `Reflect.ownKeys()`返回全部`Key`

```js
let foo = Symbol('foo')
const obj = { [foo]: 'foobar'}
for(let i in obj) {
    console.log(i)
}
Object.getOwnPropertyNames(obj)
// []
Object.getOwnProperTySymbols(obj)
// [Symbol(foo)]
Reflect.ownKeys(obj)
// [Symbol(foo)]
```

**1. Symbol.for() 和 Symbol.keyFor()**

- `Symol`可以区确保生成的值不同， 但有时需要保存下来以便再次使用， 类似于单例， 如果存在就不会重新创建。 这时就需要使用 `Symbol.for()`。

```js
let s1 = Symbol('foo')
let s2 = Symbol.for('foo')
let s3 = Symbol.for('foo')
s1 = s2 // true
s2 = s3 // false
```

从上面的代码可以看出,` Symbol.for `类似与将这个`Symbol` 等级, 所以`s1` 这个未登记的 `Symbol`不会等于其他`Symbol`
`Symbol.keyfor` 会返回已登记的 `Symbol`的 `key` , 一定是登记过的次啊会返回,  接上俐:

```js
Symbol.keyFor(s1) // undefiend
Symbol.keyFor(s2) // "foo"
```

**2. 作为属性名的 Symbol**

由于每一个 Symbol 值都是不相等的， 这意味着Symbol 值可以作为标识符， 用于对象的属性名， 就能保证不会出现同名属性， 这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖

```js
let mySymbol = Symbol()

// 1.
let a = {}
 a[mySymbol] = 'Hello!'
// 2.
let a = {
 [mySymbol]: 'Hello!'
}
// 3.
let a = {}
Object.defineProerty(a, mySymbol, { value: 'Hello!' })

//最后输出结果都是：
a[mySymbol] // "Hello!"
```

通过方括号结构 和Object.defineProperty， 将对象的属性名指定为一个Symbol 值。
当 Symbol 值作为对象属性名时， 不能用点运算符。

```js
const mySymbol = Symbol()
const a = {}
a.mySymbol = 'Hello'
a[mySymbol] // undefined
a['mySymbol'] // "hello"
```

通过上例 同理可得： Symbol 值定义属时， Symbol 值必须放在方括号之中。
Symbol还可以用于定义一组常量， 保证这组常量的值都是不相等的。 例子：

```js
// 1.
const log = {}
log.levels = {
 DEBUG: Symbol('debug'),
 INFO: Symbol('info'),
 WARN: Symbol('warn')
}
console.log(log.levels.DEBUG, 'debug message')
console.log(log.levels.INFO, 'info message')


// 2.
const COLOR_RED = Symbol()
const COLOR_GREEN = Symbol()
function getComplement(color) {
 switch(color) {
  case COLOR_RED:
   return COLOR_GREEN
  case COLOR_GREEN:
   return COLOR_RED
  default:
   throw new Error('Undefined color')
 }
}
```

常量使用Symbol 值最大的好处， 就是其他任何值都不可能由相同的值了， 因此可以保证上面的switch 语句会按设计的方式工作。 当Symbol作为属性名时， 该属性是公开属性， 不是私有属性

## Promise

`Promise`用来处理异步操作， 是构建函数， 参数为 `then`和`catch`后需要执行的方法， 下面是使用 `Promise`封装的`ajax`

```js
const getJSON = function(url) {
 const promise = new Promise((resolve, reject) => {
  if(this.readyState !==4) {
   return
  }
  if(this.status === 200) {
   resolve(this.response)
  } else {
   reject(new Error(this.statusText))
  }
  const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = handler
        client.responseType = 'json'
        client.setRequestHeader("Accept", "application/json")
        client.send()
 })
 return promise
}
getJSON("/posts.json").then(function(json){
 console.log('Contents: ' + json)
}, function(error) {
 console.log('错误', error)
})
```

## Proxy和Reflect

`Proxy`代理对象的各种内置方法, `get ``set ``construct`等, 类似于拦截器 .
`Reflect`则作为 `Object`的代替者, `Object`上的一些静态方法被移植到了 `Reflect`上.
`Reflect`对象一共有13个静态方法。

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescritptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target)
通过 `Proxy`和 `Reflect`可以实现观察者模式， 就是监听`set`方法，执行相应操作。

```js
const person = { name: 'Li', age: 18}
const personObserved = observe(person)

function observe(obj) {
 return new Proxy(obj, {
  console.log(`setting ${key} to ${value}!`) `
  return Reflect.set(target, key, value, receiver)
 })
}

personObseved.name = 'zhao'
// setting name to zhao
```
