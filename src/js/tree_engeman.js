var Node = function (id, text, hRef, icon, children,parenthRef) {        
    this.text = text;
    this.hRef = hRef;
    this.id = id;
    this.icon = icon;
    //this.children = [];        
    this.children = !children ? [] : children;        
    this.parenthRef = parenthRef;
    this.html = "";
    
    if (this.hRef){
        this.html = `<div>
        <a data-toggle=\"collapse\" href=\"#${this.hRef}\"> 
            <i class=\"${this.icon}\"></i>
            <span>${this.text}</span>
            </a>
            <div id=\"${this.hRef}\" class=\"collapse\"><div class=\"${this.hRef}\"></div></div></div>`; 
    }else{
        this.html = `<div>
        <span>${this.text}</span>
        </div>`;
    }
    
  }
 
    Node.prototype = {

    add: function (child) {
        this.children.push(child);
    },

    remove: function (child) {
        var length = this.children.length;
        for (var i = 0; i < length; i++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return;
            }
        }
    },
 
    getChild: function (i) {
        return this.children[i];
    },
 
    hasChildren: function () {
        return this.children.length > 0;
    }
}
 

function traverse(node) {
    tree._append(node);
    
    for (var i = 0, len = node.children.length; i < len; i++) {
        traverse(node.getChild(i));
    }
}
 
var html;

var tree = (function () {
   
    var htmlObject = document.createElement('div');
  
    return {
        
        _append: function (no) {  
            console.log('no:',no)  
          if(no.hRef === "root"){            
            htmlObject.innerHTML = no.html;
          }
          else {                     
            html = $(no.html)[0].outerHTML;    
            htmlObject.querySelector("div[class='"+no.parenthRef+"']").innerHTML += html;          
          }
        },
        
        showAppend: function () {          
          console.log(htmlObject); 
          $('.tree-engeman').html(htmlObject);
          htmlObject = document.createElement('div');
        }
    }
})();

function montarTree(dados) {
    
    var ul = document.createElement('div');
 
    traverse(dados);
    tree.showAppend();
    
  }
 
function run() {
    
/*
 var os = new Node("574","O.S.: 12345", "dados-os-1", "fas fa-file","root");
      
    var data = new Node(null,"Data Programada : 06/05/2020", null, null ,"dados-os-1");
    var setor = new Node(null,"Setor Executante: 123 - Calibração", null, null ,"dados-os-1");
    var pla = new Node(null,"Plano: 123 - Plano 1", null, null ,"dados-os-1");
    var aplic = new Node(null,"Aplicação: 123 - MOTOR WEG 22", null, null ,"dados-os-1");
    var tipManut = new Node(null,"Tipo de Manutnção: 123 - Preventiva", null, null ,"dados-os-1");
    var tipAplic = new Node(null,"Tipo de Aplicação: 123 - Tipo 2", null, null ,"dados-os-1");
    var filial = new Node(null,"Filial: 123 - Unidade 1", null, null ,"dados-os-1");
    var status = new Node(null,"Status da O.S.: A", null, null ,"dados-os-1");
    var cli = new Node(null,"Cliente.: 001 - Roberto Nunes", null, null ,"dados-os-1");
    var forn = new Node(null,"Fornecedor.: 001 - Automaq Máquinas e Motores", null, null ,"dados-os-1");        

    var funcionarios = new Node("0", "Funcionários(1)", "funcionarios", "fas fa-users", "dados-os-1");
    var func1 =new Node("14","777 - Jéssica Souza Campos", null, null ,"funcionarios");

    var servicos = new Node("5", "Serviços(2)", "servicos", "fas fa-hammer", "dados-os-1");

    var reg1 = new Node("21","Registro 4139", "registro-1", "fas fa-wrench", "servicos");
    var reg1_exec = new Node(null,"Executado", null, null ,"registro-1");
    var reg1_oco = new Node(null,"Ocorrência", null, null ,"registro-1");
    var reg1_oco_cau = new Node(null,"Ocorrência Causadora", null ,null,"registro-1");
    var reg1_cau = new Node(null,"Causa", null, null ,"registro-1");
    var reg1_servico = new Node(null,"Serviço", null, null ,"registro-1");
    var reg1_forn = new Node(null,"Fornecedor", null, null ,"registro-1");
    var reg1_aplic = new Node(null,"Aplicação", null, null ,"registro-1");
    var reg1_mat = new Node(null,"Material", null, null ,"registro-1");
    var reg1_qtde = new Node(null,"Qtde", null, null ,"registro-1");
    var reg1_tempo = new Node(null,"Tempo", null, null ,"registro-1");

         
    var reg2 = new Node("28","Registro 4155", "registro-2", "fas fa-wrench", "servicos");
    var reg2_exec 	= new Node(null,"Executado", null, null ,"registro-2");
    var reg2_oco 	= new Node(null,"Ocorrência", null, null ,"registro-2");
    var reg2_oco_cau = new Node(null,"Ocorrência Causadora", null, null ,"registro-2");
    var reg2_cau 	= new Node(null,"Causa", null, null ,"registro-2");
    var reg2_servico = new Node(null,"Serviço", null, null ,"registro-2");
    var reg2_forn 	= new Node(null,"Fornecedor", null, null ,"registro-2");
    var reg2_aplic 	= new Node(null,"Aplicação", null, null ,"registro-2");
    var reg2_mat 	= new Node(null,"Material", null, null ,"registro-2");
    var reg2_qtde 	= new Node(null,"Qtde", null, null ,"registro-2");
    var reg2_tempo 	= new Node(null,"Tempo", null, null ,"registro-2");

    os.add(data);
    os.add(setor);
    os.add(pla);
    os.add(aplic);
    os.add(tipManut);
    os.add(tipAplic);
    os.add(filial);
    os.add(status);
    os.add(cli);
    os.add(forn);
    
    reg1.add(reg1_aplic);
    reg1.add(reg1_exec);
    reg1.add(reg1_oco);
    reg1.add(reg1_oco_cau);
    reg1.add(reg1_cau);
    reg1.add(reg1_servico);
    reg1.add(reg1_forn);
    reg1.add(reg1_mat);
    reg1.add(reg1_qtde);
    reg1.add(reg1_tempo);

    reg2.add(reg2_exec);
    reg2.add(reg2_oco);
    reg2.add(reg2_oco_cau);
    reg2.add(reg2_cau);
    reg2.add(reg2_servico);
    reg2.add(reg2_forn);
    reg2.add(reg2_aplic);
    reg2.add(reg2_mat);
    reg2.add(reg2_qtde);
    reg2.add(reg2_tempo);

    servicos.add(reg1);
    servicos.add(reg2);

    funcionarios.add(func1);

    os.add(servicos);
    os.add(funcionarios);
*/
   


    os_1 = new Node("147","O.S.: 12345", "dados-os-1", "fas fa-file",
    [
        
      new Node(null,"Data Programada : 06/05/2020", null, null, null ,"dados-os-1"),
      new Node(null,"Setor Executante: 123 - Calibração", null, null, null ,"dados-os-1"),
      new Node(null,"Plano: 123 - Plano 1", null, null, null ,"dados-os-1"),
      new Node(null,"Aplicação: 123 - MOTOR WEG 22", null, null , null ,"dados-os-1"),
      new Node(null,"Tipo de Manutnção: 123 - Preventiva", null, null , null ,"dados-os-1"),
      new Node(null,"Tipo de Aplicação: 123 - Tipo 2", null, null , null ,"dados-os-1"),
      new Node(null,"Filial: 123 - Unidade 1", null, null , null ,"dados-os-1"),
      new Node(null,"Status da O.S.: A", null, null , null ,"dados-os-1"),
      new Node(null,"Cliente.: 001 - Roberto Nunes", null, null , null ,"dados-os-1"),
      new Node(null,"Fornecedor.: 001 - Automaq Máquinas e Motores", null, null , null ,"dados-os-1"),

      new Node("0", "Funcionários(1)", "funcionarios", "fas fa-users", [
         new Node("14","777 - Jéssica Souza Campos", null, null , null ,"funcionarios")
      ],"dados-os-1"),

      new Node("5", "Serviços(2)", "servicos", "fas fa-hammer", [

        new Node("21","Registro 4139", "registro-1", "fas fa-wrench", [
          new Node(null,"Executado", null, null , null ,"registro-1"),
          new Node(null,"Ocorrência", null, null , null ,"registro-1"),
          new Node(null,"Ocorrência Causadora", null, null , null ,"registro-1"),
          new Node(null,"Causa", null, null , null ,"registro-1"),
          new Node(null,"Serviço", null, null , null ,"registro-1"),
          new Node(null,"Fornecedor", null, null , null ,"registro-1"),
          new Node(null,"Aplicação", null, null , null ,"registro-1"),
          new Node(null,"Material", null, null , null ,"registro-1"),
          new Node(null,"Qtde", null, null , null ,"registro-1"),
          new Node(null,"Tempo", null, null , null ,"registro-1")

        ], "servicos"),
        new Node("28","Registro 4155", "registro-2", "fas fa-wrench", [
          new Node(null,"Executado", null, null , null ,"registro-2"),
          new Node(null,"Ocorrência", null, null , null ,"registro-2"),
          new Node(null,"Ocorrência Causadora", null, null , null ,"registro-2"),
          new Node(null,"Causa", null, null , null ,"registro-2"),
          new Node(null,"Serviço", null, null , null ,"registro-2"),
          new Node(null,"Fornecedor", null, null , null ,"registro-2"),
          new Node(null,"Aplicação", null, null , null ,"registro-2"),
          new Node(null,"Material", null, null , null ,"registro-2"),
          new Node(null,"Qtde", null, null , null ,"registro-2"),
          new Node(null,"Tempo", null, null , null ,"registro-2")
        ], "servicos")

      ],"dados-os-1"),
    ],"root"
  );

  os_2 = new Node("147","O.S.: 78787", "dados-os-2", "fas fa-file",
  [
      
    new Node(null,"Data Programada : 06/05/2020", null, null, null ,"dados-os-2"),
    new Node(null,"Setor Executante: 123 - Calibração", null, null, null ,"dados-os-2"),
    new Node(null,"Plano: 123 - Plano 1", null, null, null ,"dados-os-2"),
    new Node(null,"Aplicação: 123 - MOTOR WEG 22", null, null , null ,"dados-os-2"),
    new Node(null,"Tipo de Manutnção: 123 - Preventiva", null, null , null ,"dados-os-2"),
    new Node(null,"Tipo de Aplicação: 123 - Tipo 2", null, null , null ,"dados-os-2"),
    new Node(null,"Filial: 123 - Unidade 1", null, null , null ,"dados-os-2"),
    new Node(null,"Status da O.S.: A", null, null , null ,"dados-os-2"),
    new Node(null,"Cliente.: 001 - Roberto Nunes", null, null , null ,"dados-os-2"),
    new Node(null,"Fornecedor.: 001 - Automaq Máquinas e Motores", null, null , null ,"dados-os-2"),

    new Node("0", "Funcionários(1)", "funcionarios2", "fas fa-users", [
       new Node("14","777 - Jéssica Souza Campos", null, null , null ,"funcionarios2")
    ],"dados-os-2"),

    new Node("5", "Serviços(2)", "servicos2", "fas fa-hammer", [

      new Node("21","Registro 4139", "registro-10", "fas fa-wrench", [
        new Node(null,"Executado", null, null , null ,"registro-10"),
        new Node(null,"Ocorrência", null, null , null ,"registro-10"),
        new Node(null,"Ocorrência Causadora", null, null , null ,"registro-10"),
        new Node(null,"Causa", null, null , null ,"registro-10"),
        new Node(null,"Serviço", null, null , null ,"registro-10"),
        new Node(null,"Fornecedor", null, null , null ,"registro-10"),
        new Node(null,"Aplicação", null, null , null ,"registro-10"),
        new Node(null,"Material", null, null , null ,"registro-10"),
        new Node(null,"Qtde", null, null , null ,"registro-10"),
        new Node(null,"Tempo", null, null , null ,"registro-10")

      ], "servicos2"),
      new Node("28","Registro 995", "registro-20", "fas fa-wrench", [
        new Node(null,"Executado", null, null , null ,"registro-20"),
        new Node(null,"Ocorrência", null, null , null ,"registro-20"),
        new Node(null,"Ocorrência Causadora", null, null , null ,"registro-20"),
        new Node(null,"Causa", null, null , null ,"registro-20"),
        new Node(null,"Serviço", null, null , null ,"registro-20"),
        new Node(null,"Fornecedor", null, null , null ,"registro-20"),
        new Node(null,"Aplicação", null, null , null ,"registro-20"),
        new Node(null,"Material", null, null , null ,"registro-20"),
        new Node(null,"Qtde", null, null , null ,"registro-20"),
        new Node(null,"Tempo", null, null , null ,"registro-20")
      ], "servicos2")

    ],"dados-os-2"),
  ],"root"
);

  var master = new Node(null,"Lista de Ordens de Serviço", "root", null, [os_1,os_2] ,"");

  montarTree(master);
}


window.onload = run();