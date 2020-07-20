var contador = 0;

var produtos = [

    {name: "Volvo XC90", price: "325950"},
    {name: "Toro 2020", price: "159990"},
    {name: "BMW M760Li", price: "899950"},
    {name: "Corolla 2020", price: "99990"},
    {name: "Argo 2020", price: "63590"},
    {name: "Palio Weekend", price: "64990"},
    {name: "Buggati", price: "70600000"},
    {name: "Polo 2020", price: "86340"},
    {name: "Hyundai Santa Fé 2020", price: "297000"},
    {name: "F250" , price: "187926"},
    {name: "S10 Automática", price: "188990"},
    {name: "S10 Manual", price: "109590"}

];

var produtos1 = [
    {name: "Argo 2020", price: "63590"},
    {name: "Corolla 2020", price: "99990"},
    {name: "Toro 2020", price: "159990"},
    {name: "Volvo XC90", price: "325950"},    
    {name: "BMW M760Li", price: "899950"}
];

var produtos2 = [

    {name: "Palio Weekend", price: "64990"},    
    {name: "Polo 2020", price: "86340"},    
    {name: "S10 Manual", price: "109590"},
    {name: "F250" , price: "187926"},
    {name: "S10 Automática", price: "188990"},
    {name: "Hyundai Santa Fé 2020", price: "297000"},   
    {name: "Buggati", price: "70600000"},

];

var produtos3 = [
    {name: "Argo 2020", price: "63590"},
    {name: "Corolla 2020", price: "99990"},
    {name: "Toro 2020", price: "159990"},
    {name: "Volvo XC90", price: "325950"},    
    {name: "BMW M760Li", price: "899950"},
    {name: "Palio Weekend", price: "64990"},    
    {name: "Polo 2020", price: "86340"},    
    {name: "S10 Manual", price: "109590"},
    {name: "F250" , price: "187926"},
    {name: "S10 Automática", price: "188990"},
    {name: "Hyundai Santa Fé 2020", price: "297000"},   
    {name: "Buggati", price: "70600000"},

];

var menor = 0;

function output(lista, primeiro, segundo){
    
}

function troca(lista, a, b){    
    let atual = lista[a];
    let menor = lista[b];
        
    lista[a] = menor;
    lista[b] = atual;
}

function buscaMenor(lista, inicio, termino){
    menor = inicio;
    for(var i = inicio; i < termino; i++){    
        
        if(parseFloat(lista[i].price) < parseFloat(lista[menor].price))             
            menor = i;                         
              
    }
    
}

//problemas
function SelecionSort(lista, inicio, termino){  

    for(var atual = inicio; atual < termino; atual++){           
        buscaMenor(lista, atual , termino);                      

        troca(lista, atual, menor);              
        console.table(lista)
    }

    console.table(lista) ; 
}

function InsertionSort(lista){

    for (let atual = 0; atual < lista.length; atual++) {
        
        while (atual > 0 && (parseFloat(lista[atual].price) < parseFloat(lista[atual-1].price))) {
            troca(lista, atual, atual-1);
            atual--;
        }        
    }

    console.table(lista) ; 
}

function Merge(array1, array2){
    
    let pos1 = 0;
    let pos2 = 0;
    let atual = 0;
    let resultado = [array1.length + array2.length];

    while (pos1 < array1.length && pos2 < array2.length) {
        if(parseFloat(array1[pos1].price) < parseFloat(array2[pos2].price)){
            resultado[atual] = array1[pos1];
            pos1++;
        }else{
            resultado[atual] = array2[pos2];
            pos2++;
        }
        atual++;
    }

    while (pos1 < array1.length) {
        resultado[atual] = array1[pos1];
        pos1++;
        atual++;
    }

    while(pos2 < array2.length){
        resultado[atual] = array2[pos2];
        pos2++;
        atual++;
    }

    console.table(resultado);

}

function Merge2(array1, inicio, miolo , termino){
    let pos1 = inicio;
    let pos2 = miolo;
    let atual = 0;
    let ordenado = [termino-inicio];

    let resultado = array1.copyWithin(0,0,array1.length)

    while (pos1 < miolo && pos2 < termino) {
        if(parseFloat(array1[pos1].price) < parseFloat(array1[pos2].price)){
            ordenado[atual] = array1[pos1];
            pos1++;
        }else{
            ordenado[atual] = array1[pos2];
            pos2++;
        }
        atual++;
    }

    while (pos1 < miolo) {
        ordenado[atual] = array1[pos1];
        pos1++;
        atual++;
    }

    while(pos2 < termino){
        ordenado[atual] = array1[pos2];
        pos2++;
        atual++;
    }

    for (let index = 0; index < ordenado.length; index++) {
        resultado[inicio+index] = ordenado[index];        
    }

    console.table(resultado);
}

function ordena(array,inicio,termino){
    var quantidade = parseInt(termino - inicio);
   
    if(quantidade > 1){
       
        var meio = parseInt((inicio + termino)/2);
        //console.log(`inicio: ${inicio}, meio: ${meio}, termino: ${termino}, quantidade: ${quantidade}, ${quantidade > 1}`)
        ordena(array,inicio,meio);
        ordena(array,meio,termino);
        Merge2(array,inicio,meio,termino)       
    }
}

function menores(valor, array){
    var nBaratos = 0;
    for (let i = 0; i < array.length; i++) {
        if(parseFloat(array[i].price) < valor)
        nBaratos++;        
    }

    return nBaratos;

}

function particiona(array, inicio, termino){

    //console.table(array);

    var pivo = array[termino-1];
    var _menores = inicio;

    //console.log(`Pivô ${pivo.name}`);

    for (let i = inicio; i < termino - 1; i++) {      

        if(parseFloat(array[i].price) <= parseFloat(pivo.price)){   
            //console.log(`troca ${array[i].name} com ${array[_menores].name}`)    
            troca(array,i,_menores);        
            _menores++;                              
        }
               
    }
    troca(array,termino-1,_menores);
    
    return _menores;
}


//contador = 15
function ordena2(array, de, ate){
    var nElem = ate - de;
 
    if(nElem > 1){
        var pivo = particiona(array, de, ate);
        ordena2(array, de, pivo);
        ordena2(array, pivo + 1, ate);
    }

}

function buscaLinear(array, de, ate, valor){
    for (let i = de; i < ate; i++) {
        if(parseFloat(array[i].price) === valor){
            return i;
        }
    }

    return -1;
}

function buscaBinaria(array, de, ate, valor){
    var nElem = ate - de;
    console.log(`de ${de} até ${ate} nElem ${nElem}`)
    var meio = parseInt((de + ate)/2);
   
    if(nElem > 1){
        if(parseFloat(array[meio].price) === valor){
            return meio;
        }
        if(valor < parseFloat(array[meio].price)){
            return buscaBinaria(array, de, meio-1, valor);   
        }
        return buscaBinaria(array, meio+1, ate, valor); 
    }     
    
    return -1;
}



