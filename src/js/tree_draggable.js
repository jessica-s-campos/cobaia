var Node = function (id, text, hRef, icon, children,parenthRef) {        
    this.text = text;
    this.hRef = hRef;
    this.id = id;
    this.icon = icon;    
    this.children = !children ? [] : children;        
    this.parenthRef = parenthRef;
    this.html = "";
    
   

    if (this.hRef){
      this.html = `<div draggable="true" ondragstart="drag(event)">      
          <a data-toggle=\"collapse\" href=\"#${this.hRef}\">           
          <span>${this.text}</span>
          </a>
          <div id=\"${this.hRef}\" class=\"collapse\"><div class=\"${this.hRef}\"></div></div></div>`; 
  }else{
      this.html = `<div draggable="true" ondragstart="drag(event)">
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

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  console.log('drop ',ev);
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function traverse(node) {
    tree._append(node);
    
    for (var i = 0, len = node.children.length; i < len; i++) {
        traverse(node.getChild(i));
    }
}
 
var html;

var tree = (function () {
    //// ondrop="drop(event)" ondragover="allowDrop(event)"
    var htmlObject = document.createElement('div');
    htmlObject.addEventListener("ondragover",allowDrop);
    htmlObject.addEventListener("ondrop",drop);
  
    return {
        
        _append: function (no) {  
         
          if(no.hRef === "root"){            
            htmlObject.innerHTML = no.html;
          }
          else {                     
            html = $(no.html)[0].outerHTML;    
            htmlObject.querySelector("div[class='"+no.parenthRef+"']").innerHTML += html;          
          }
        },
        
        showAppend: function () {          
       
          $('.tree-engeman').html(htmlObject);
          htmlObject = document.createElement('div');
        }
    }
})();

function montarTree(dados) {
    
 
    traverse(dados);
    tree.showAppend();
    
  }
 
function run() {
    
  var root = new Node("0","Raiz", "root", "fas fa-file", null ,"root");

  var dado1 = new Node("1","Dado 1", "dado", "fas fa-file", null ,"root");
      
  var item1 = new Node('1.1',"Item A", "item11", "", null  ,"dado");
  var item2 = new Node('1.2',"Item B", "item12", "" , null ,"dado");
  var item3 = new Node('1.3',"Item C", "item13", "", null  ,"dado");
  var item4 = new Node('1.4',"Item D", "item14", "", null  ,"dado");
  var item5 = new Node('1.5',"Item E", "item15", "", null  ,"dado");
  
  dado1.add(item1);
  dado1.add(item2);
  dado1.add(item3);
  dado1.add(item4);
  dado1.add(item5);

  root.add(dado1);

  var dado1 = new Node("2","Dado 2", "dado2", "fas fa-file", null ,"root");
      
  var item1 = new Node('2.1',"Item 0", "item21", "", null  ,"dado2");
  var item2 = new Node('2.2',"Item 2", "item22", "" , null ,"dado2");
  var item3 = new Node('2.3',"Item 3", "item23", "", null  ,"dado2");
  var item4 = new Node('2.4',"Item 4", "item24", "", null  ,"dado2");
  var item5 = new Node('2.5',"Item 5", "item25", "", null  ,"dado2");
  
  dado1.add(item1);
  dado1.add(item2);
  dado1.add(item3);
  dado1.add(item4);
  dado1.add(item5);

  root.add(dado1);

  montarTree(root);
}


window.onload = run();