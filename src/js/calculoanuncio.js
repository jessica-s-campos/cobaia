var tx_premium = 16/100;
var tx_classico = 11/100;

var tx_premium_nf = 0;
var tx_classico_nf = 0;

let valor_premium_nf = 0;
let despesas_premium_nf = 0;

let valor_classico_nf = 0;
let despesas_classico_nf = 0;

let valor_premium = 0;
let despesas_premium = 0;

let valor_classico = 0;
let despesas_classico = 0;

var lucro = 0;
var lucro_fixado = false;

var dados = new Array();
var ultimoCodigo = 0;

$(document).ready(()=>{
    
    $('#custo').focus();
    document.getElementById('opcao-premium').checked = true;
    document.getElementById('opcao-classico').checked = true;
    
    CarregarLucro();
    
    VerificaVendaComNota();

    document.getElementById('imposto-entrada').addEventListener('change',() => VerificaSePreencheuImposto());
    document.getElementById('percentual-imposto-saida').addEventListener('change',() => VerificaSePreencheuImposto());
    document.getElementById('imposto-entrada').addEventListener('blur',() => formatCurrency('#imposto-entrada'));
    document.getElementById('custo').addEventListener('blur',() => formatCurrency('#custo'));
    document.getElementById('frete').addEventListener('blur',() => formatCurrency('#frete'));

    document.getElementById('opcao-exibir-historico').addEventListener('change', () => ExibirHistorico())
    document.getElementById('nf').addEventListener('change', () => VerificaVendaComNota())
    document.getElementById('percentual-imposto-saida').addEventListener('keypress', () => BloqueiaCaracteres())

    document.getElementById('check-lucro').addEventListener('change', () => VerificaLucro())
    document.getElementById('lucro').addEventListener('change', () => VerificaLucro())

});

function CarregarLucro(){
    var lucro_sessao = sessionStorage.getItem('lucro');
    lucro = lucro_sessao === null ? convertNumber($('#lucro').val()) : lucro_sessao;    
    $('#lucro').val(lucro);
    lucro_fixado = lucro_sessao !== null;
    $('#check-lucro')[0].checked = lucro_fixado;  

    if(!lucro_fixado)
        $('#lucro').focus();
}

function ObterLucro(){    
    var lucro_sessao = sessionStorage.getItem('lucro');
    lucro = lucro_sessao === null ? convertNumber($('#lucro').val()) : lucro_sessao;     
    return lucro;
}

function VerificaLucro(){
    lucro_fixado = $('#check-lucro')[0].checked;
    
    if(lucro_fixado){
        var percentual = convertNumber($('#lucro').val());       
        sessionStorage.setItem('lucro', percentual);       
    }else{
        sessionStorage.removeItem('lucro');
    }
}

function NovoCalculo(){
    document.getElementById('opcao-premium').checked = true;
    document.getElementById('opcao-classico').checked = true;
    document.getElementById('nf').checked = false;

    $('#imposto-entrada').val('');
    $('#percentual-imposto-saida').val('');

    $('#custo').val('');

    if(!lucro_fixado)
        $('#lucro').val('');    

    $('#frete').val('');
}

function BloqueiaCaracteres(){
    if(event.keyCode === 44 || event.keyCode === 46) {
        event.preventDefault();
    }  
}

function formatCurrency(name){
    $(name).val(convertNumber($(name).val()).toFixed(2));    
}

function VerificaSePreencheuImposto(){
    
    let nf = document.getElementById('nf').checked;

    if(convertNumber($('#imposto-entrada').val()) > 0 && !nf){       
        document.getElementById('nf').checked = true;
        $('#percentual-imposto-saida').focus();
    }
    else if(convertNumber($('#percentual-imposto-saida').val()) > 0 && !nf){       
        document.getElementById('nf').checked = true;
        $('#imposto-entrada').focus();
    }
    else if((convertNumber($('#imposto-entrada').val()) === 0 && convertNumber($('#percentual-imposto-saida').val()) === 0) && nf){       
        document.getElementById('nf').checked = false;
    }

    VerificaVendaComNota();
}

function VerificaVendaComNota(){

    let nf = document.getElementById('nf').checked;

    if(!nf)
    {
        $('#imposto-entrada').val('')
        $('#percentual-imposto-saida').val('')
    }    
    
}


function convertNumber(input){   
    var valor = 0;

    if(input === null || input === '' || input === ' ')
        return 0;

    input = input.replace(',','.');

    var vlr = parseFloat(input);

    valor = !isNaN(vlr) ? vlr : 0;

    return valor;
}

var cobaia;



function CalculaAnuncio()
{    

    let op_premium;
    let op_classico;
    let op_historico;    

    let frete_gratis;
    let valor = 0;
    let taxa_fixa;
    let custo;
    let percentual_lucro;
    let imposto_entrada;
    let tx_saida;
    let frete;
    let nf;   
   
    var item = {custo:0, lucro:0, txlucro:0,fretegratis:false, fretevalor:0, premium:{valor : 0, despesas:0}, classico:{valor : 0, despesas:0}};
    

    function ExibeHistorico(obj){

        return `
        <div id="item-historico${obj.codigo}" style="display: flex; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between;">
                <span class="custo">${obj.custo}</span> | <span class="tx-lucro">${obj.txlucro}</span> | <span class="lucro">${obj.lucro}</span> | <span class="frete-gratis">${obj.fretegratis}</span><span class="frete-valor">${obj.fretevalor}</span>             
            </div>
            
            <div id="classico" style="display: flex; justify-content: space-between;">
                <span><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                <span class="titulo">Clássico</span>            
                <span id="valor">${obj.classico.valor.toFixed(2)}</span>             
                <span id="despesa">${obj.classico.despesas.toFixed(2)}</span>                     
            </div>
                    
            <div id="premium" style="display: flex; justify-content: space-between;">
                <span><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                <span class="titulo">Premium</span>            
                <span id="valor">${obj.premium.valor.toFixed(2)}</span>             
                <span id="despesa">${obj.premium.despesas.toFixed(2)}</span>              
            </div>    
        </div> 
        `;       
    }
    
    function Imprime(resultado){
        
        document.getElementById('resultado').style.display = "flex"
        $('#resultado .lucro').text(resultado.lucro);
        $('#resultado #codigo').val(resultado.codigo);
        if(op_premium)
        {          
            document.getElementById('premium').style.display = "flex"
    
            $('#premium .valor').text(resultado.premium.valor.toFixed(2));                             
            $('#premium .despesa').text(resultado.premium.despesas.toFixed(2));    
        }
        else
            document.getElementById('premium').style.display = "none"
    
        if(op_classico)
        {
            document.getElementById('classico').style.display = "flex"
    
            $('#classico .valor').text(resultado.classico.valor.toFixed(2));                   
            $('#classico .despesa').text(resultado.classico.despesas.toFixed(2));   
                        
        }
        else
            document.getElementById('classico').style.display = "none"
                        
    }
    

    nf = document.getElementById('nf').checked;
    imposto_entrada = convertNumber($('#imposto-entrada').val());
    tx_saida = convertNumber($('#percentual-imposto-saida').val())/100;  
    
    if(nf && (imposto_entrada === 0 || tx_saida === 0)){
        
        var text = imposto_entrada === 0 && tx_saida === 0 ? 'Informe o imposto de entrada e saída' : tx_saida === 0 ? 'Informe o percentual do imposto de saída' : imposto_entrada === 0 ? 'Informe o imposto de entrada!' : '';
        
        Swal.fire({
            title: 'Erro',
            text: text,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

        if(imposto_entrada === 0)
        $('#imposto-entrada').focus();
        else if(tx_saida === 0)
        $('#percentual-imposto-saida').focus();

        return;
    }
    
    op_premium = document.getElementById('opcao-premium').checked;
    op_classico = document.getElementById('opcao-classico').checked;
    op_historico = document.getElementById('opcao-exibir-historico').checked;
    custo = convertNumber($('#custo').val());
    percentual_lucro = ObterLucro()/100;    
    frete = convertNumber($('#frete').val());

    tx_premium_nf = tx_premium + tx_saida;
    tx_classico_nf = tx_classico + tx_saida;

    valor = custo + (custo * percentual_lucro);
        
    if(valor >= 120 || frete > 0)
    {        
        frete_gratis = true;
    }
    else if(valor < 120)
    {     
        frete_gratis = false;
    }

    taxa_fixa = frete_gratis ? 0 : 5;
    imposto_entrada = nf ? imposto_entrada : 0;
   
    valor = (valor + taxa_fixa + imposto_entrada + frete);    

    lucro = (custo * percentual_lucro).toFixed(2);
    
    if(nf){
        
        item.premium.valor = valor / ((1 - tx_premium_nf));                
        item.premium.despesas= (valor * tx_premium_nf);
       
        item.classico.valor = valor / ((1 - tx_classico_nf));        
        item.classico.despesas = (valor * tx_classico_nf);             
    
    }
    else{

        item.premium.valor  = (valor/ (1 - tx_premium));
        item.premium.despesas  = (valor * tx_premium);

        item.classico.valor = (valor/ (1 - tx_classico));
        item.classico.despesas = (valor * tx_classico);

    }   

    item.imposto_entrada = imposto_entrada;
    item.tx_saida = tx_saida;

    item.custo = custo;
    item.txlucro = percentual_lucro * 100;
    item.lucro = lucro;
    
    item.fretegratis = frete_gratis && frete > 0 ? 'Embutido' : frete_gratis ? 'Grátis' : 'Cliente';
    item.fretevalor = frete;
    item.codigo = ultimoCodigo++;
    
    Imprime(item);  

    if(!dados.find(o => parseFloat(o.lucro) === parseFloat(item.lucro) 
    && parseFloat(o.custo) === parseFloat(item.custo) 
    && parseFloat(o.imposto_entrada) === parseFloat(item.imposto_entrada)
    && parseFloat(o.tx_saida) === parseFloat(item.tx_saida)
    && parseFloat(o.fretevalor) === parseFloat(item.fretevalor)))
    {      

        dados.push(item);
        
        var html = ExibeHistorico(item);
           
        $('#historico').prepend(html);
        
    }        
 
}




function ExibirHistorico(){

    if(document.getElementById('opcao-exibir-historico').checked){
        document.getElementById('detalhes').style.display = "flex";     
        document.getElementById('detalhes').style.flexDirection = "column";     
    }       
    else
        document.getElementById('detalhes').style.display = "none";
}


function LimparHistorico(){
    dados = [];
    document.getElementById('detalhes').style.display = "none";
    $('#historico').html('');
}






