const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities = [];
let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

fetch(endpoint).then(blob => blob.json()).then(dados => cities.push(...dados))

console.log(cities);

const friends = [
    {name : 'Jessica', age:29, genre : 'F'},
    {name : 'Tiago', age:33, genre : 'M'},
    {name : 'Leticia', age:26, genre : 'F'},
    {name : 'Marcia', age:28, genre : 'F'},
    {name : 'Julio', age:35, genre : 'M'},
    {name : 'Carla', age:31, genre : 'F'},
    {name : 'Luana', age:22, genre : 'F'},
    {name : 'Roberto', age:22, genre : 'M'},
]

const names = [];
friends.map(o => names.push(o.name))

//unshift -- Add no inicio
let city = {
    city:"Santo Antonio do Monte",
    growth_from_2000_to_2013:"85.3%",
    latitude: 0,
    longitude: 0,
    population:0,
    rank:"1001",
    state: "Minas Gerais"
};

//cities.unshift(city);
//console.log(cities);

//shift -- remove no inicio
//cities.shift();
//console.log(cities);

//splice - remove elementos de uma posicao especifica e se necessario insere outros em seu lugar

var _aux = [{
            city:"Santo Antonio do Monte",
            growth_from_2000_to_2013:"85.3%",
            latitude: 0,
            longitude: 0,
            population:0,
            rank:"1001",
            state: "Minas Gerais"
        },{
            city:"Divinopolis",
            growth_from_2000_to_2013:"65.3%",
            latitude: 0,
            longitude: 0,
            population:0,
            rank:"1002",
            state: "Minas Gerais"
        }]

//cities.splice(998,2,_aux[0],_aux[1]);

//console.log(cities);


let condicao = n => n % 2 === 0;

//every executa ate retornar false
console.log('%c every','font-size:1rem; color:gray')
console.log(numbers.every(condicao));

//some executa ate retornar true
console.log('%c some','font-size:1rem; color:orangered')
console.log(numbers.some(condicao))

//map
console.log('%c map','font-size:1rem; color:pink')
console.log(numbers.map(condicao))

//filter
console.log('%c filter','font-size:1rem; color:blue')
console.log(numbers.filter(condicao))

//reduce : recebe uma função que devolve um valor que será somado a um acumulador
console.log('%c reduce','font-size:1rem; color:green')
console.log(numbers.reduce((prev,curr) => prev + 1 + curr))
console.log(numbers.reduce((prev,curr) => prev + curr)) // soma todos os valores do array

//@@iterator
console.log('%c @@iterator','font-size:1rem; color:cyan')
let iterator = numbers[Symbol.iterator]();
console.log(iterator);
console.log(iterator.next().value);
console.log(iterator.next().value);

//for of
console.log('%c for of','font-size:1rem; color:#0FF6B7')
for (const i of numbers) {
    //console.log(i)
}

//copyWithin : copia uma sequencia de valores do array na posicao de um indice de inicio
console.log('%c copyWithin : copia uma sequencia de valores do array na posicao de um indice de inicio','font-size:1rem; color:#680352')
let aux = [];
//console.log(numbers.copyWithin(1,3,6));
//console.log(numbers.copyWithin(0,9,15));

//entries : devolve um par chave/valor, onde a chave é a posicão do array e o valor é o valor armazenado naquela posicao
console.log('%c entries','font-size:1rem; color:#BE93A7')
iterator =numbers.entries();
for (const i of iterator) {
    //console.log(i)
}

//includes
console.log('%c includes','font-size:1rem; color:#EE93A2')
console.log(numbers.includes(6));
console.log(numbers.includes(26));

//find
console.log('%c find','font-size:1rem; color:#BE33E7')
console.log(numbers.find(n => n % 2 === 0))

//findIndex
console.log('%c findIndex','font-size:1rem; color:#BB53A7')
console.log(numbers.findIndex(n => n % 2 === 0))

//Array.from
console.log('%c Array.from','font-size:1rem; color:#D9C017')
console.log(Array.from(numbers))

//Array.of : cria um array a partir dos dados informados
console.log('%c Array.of : cria um array a partir dos dados informados','font-size:1rem; color:#7A6CB5')
console.log(Array.of(2,4,6,8,9))
console.log(Array.of(numbers.filter(n => n % 2 === 0)))
console.log(Array.of(...numbers.filter(n => n % 2 === 0)))

//fill
console.log('%c fill','font-size:1rem; color:#D9C017')
let numbersCopy = Array.of(...numbers.filter(n => n % 2 !== 0));
let numbersCopy1 = Array.from(numbersCopy);
let numbersCopy2 = Array.from(numbersCopy);
let numbersCopy3 = Array.from(numbersCopy);

console.log(numbersCopy)
console.log(numbersCopy1.fill(3,3))
console.log(numbersCopy2.fill(3,3,4))
console.log(numbersCopy3.fill(3))

//reverse
console.log('%c reverse','font-size:1rem; color:red')
console.log(numbers.reverse())
console.log(numbers.sort())
console.log(numbers.reverse())

//sort
console.log('%c sort','font-size:1rem; color:#A23E61')
console.log(numbers.sort((prev,curr) => prev - curr))
console.log(numbers.sort((prev,curr) => curr - prev))
function compare(prev, curr){
    if(prev < curr)
        return -1;
    if(prev > curr)
        return 1;
    // prev == curr
    return 0;
}

console.log('--compare sort--',numbers.sort(compare))
console.log('--compare reverse--',numbers.reverse(compare))

function compareAge(prev, curr){
    if(prev.age < curr.age)
        return -1;
    if(prev.age > curr.age)
        return 1;
    // prev == curr
    return 0;
}

console.log('--compareAge sort--',friends.sort(compareAge))

function compareName(prev, curr){
    if(prev.toLowerCase() < curr.toLowerCase())
        return -1;
    if(prev.toLowerCase() > curr.toLowerCase())
        return 1;
    // prev == curr
    return 0;
}

console.log('--compareName sort--',names.sort((prev, curr) => compareName(prev.name, curr.name)))
console.log('--compareName1 sort--',names.sort(compareName))
console.log('--compareName2 sort--',names.sort((prev, curr)=>prev.localeCompare(curr)))



