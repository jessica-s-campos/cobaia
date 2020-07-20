
var array1 = "DEFGHIJKLMNOPQRSTUVWXYZABC".toLowerCase().split('');
var array2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split('');

var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split('');

var url_get = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=c8885a75fd6bcf5f923cf34bee42498ec8dea665' ;
var url_post = 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=c8885a75fd6bcf5f923cf34bee42498ec8dea665' ;
var _dados;

function Decifra(cifrado){ 
  
  var decifrado = [];
   cifrado.map((l) => {
     l = `${l}`;    
     if(array1.indexOf(l) > -1)
     {
       var pos = array1.indexOf(l);      
       decifrado.push(array2[pos]); 
     }else{	    
       decifrado.push(l); 
     }
      
   })
  
  return decifrado.join('');
}

function SalvaJson(){
    
    function encode( s ) {
        var out = [];
        for ( var i = 0; i < s.length; i++ ) {
            out[i] = s.charCodeAt(i);
        }
        return new Uint8Array( out );
    }

    var data = encode( JSON.stringify(_dados, null, 4) );

    var blob = new Blob( [ data ], {
        type: 'application/octet-stream'
    });
    
    url = URL.createObjectURL( blob );
    var link = document.createElement( 'a' );
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', 'answer.json' );
    
    var event = document.createEvent( 'MouseEvents' );
    event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent( event );
  
}

function ObterDados(){
  $.get(url_get,{},(dados) => {  

    _dados = dados;
    _dados.decifrado = Decifra(dados.cifrado.split(''));
    _dados.resumo_criptografico = Criptografa();

    SalvaJson();

 });
}

function Criptografa(){    
    if(_dados.decifrado)
        return CryptoJS.SHA1(_dados.decifrado, 'answer').toString();    
}

function EnviaDados(){
    var fileInput = document.getElementById('arquivo');

    if(fileInput.files[0]){        

        var form = new FormData();
        form.append("answer", fileInput.files[0]);

        var settings = {
        "url": "https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=c8885a75fd6bcf5f923cf34bee42498ec8dea665",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
        };

        $.ajax(settings).done(function (response) {
            alert('Score:', JSON.parse(response).score)
        });
    }
    else{
        alert('Selecione um arquivo!')
    }
    
}

