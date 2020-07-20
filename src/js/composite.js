    var Node = function (name, id, parentId) {
        this.children = [];
        this.name = name;
        this.id = id;
        this.parentId = parentId;
        this.html = `<div id=\"${id}\"><div class=\"form-check\"><input type=\"checkbox\" class=\"form-check-input\" ><label class=\"form-check-label\"  for=\"exampleCheck1\">${name}</label></div></div>`;
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
 
// recursively traverse a (sub)tree
 
function traverse(indent, node) {
 
    log.add(Array(indent++).join("  ") + node.name);
    log._append(node);
  
    for (var i = 0, len = node.children.length; i < len; i++) {
        traverse(indent, node.getChild(i));
    }
}
 
var html;
var objeto;

// logging helper
var log = (function () {
    var log = "";
    
    var htmlObject = document.createElement('div');
  
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; },
      
        _append: function (no) {    
          if(no.parentId === 0){            
            htmlObject.innerHTML = no.html;
          }
          else{                     
            html = $(no.html)[0].outerHTML;
            htmlObject.querySelector("[id='"+no.parentId+"']").innerHTML += html;          
          }
        },
        
        showAppend: function () {          
          console.log(htmlObject); 
          htmlObject = document.createElement('div');
        }
    }
})();
 
function run() {
    var vomaria = new Node("vomaria",1,0);
  
    var miria = new Node("miria",2,1)
    var marcia = new Node("marcia",3,1);
    var olimpio = new Node("olimpio",4,1);
    var joaquim = new Node("joaquim",5,1);
    var julio = new Node("julio",6,1);
  
    var julia = new Node("julia",1,6);
    var pedro = new Node("pedro",2,6);

    var gabriel = new Node("gabriel",1,2);
    var jessica = new Node("jessica",2,2);

    var caio = new Node("caio",1,4);
  
    vomaria.add(miria);
    vomaria.add(marcia);
    vomaria.add(joaquim);
    vomaria.add(julio);
    vomaria.add(olimpio);
  
    miria.add(jessica);
    miria.add(gabriel);
  
    julio.add(julia);
    julio.add(pedro);
  
    olimpio.add(caio);
    traverse(1, vomaria);
    
    log.show();
    log.showAppend();
}


window.onload = run();