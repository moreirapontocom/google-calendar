var RSSRequestObject = false; // Objeto XMLHttpRequest
var Backend = 'eventrss.php'; // URL de processamento
window.setInterval("update_timer()", 1200000); // Atualiza os dados a cada 20 minutos

if (window.XMLHttpRequest) // Tenta criar o objeto XMLHttpRequest
	RSSRequestObject = new XMLHttpRequest();

if (window.ActiveXObject)	// Se for o ActiveXObject faz requisição por Microsoft.XMLHTTP
	RSSRequestObject = new ActiveXObject("Microsoft.XMLHTTP");

// Fuynção onreadystatechange
function ReqChange() {
	if ( RSSRequestObject.readyState == 4 ) { // Se os dados chegaram corretamente
	
		// Se os dados estiverem válidos
		if (RSSRequestObject.responseText.indexOf('invalid') == -1) {
			var node = RSSRequestObject.responseXML.documentElement; // Parser do Feed
			var title = node.getElementsByTagName('title').item(0).firstChild.data; // Pega o título do calendário
			content = '<div class="channeltitle">' + title + '</div>';

			// Pega os eventos
			var items = node.getElementsByTagName('entry');
			if (items.length == 0) {
				content += '<ul><li><div class=error>No events</div></li></ul>';
			} else {
				content += '<ul>';
				for (var n = items.length-1; n >= 0; n--) {
					var itemTitle = items[n].getElementsByTagName('title').item(0).firstChild.data;
					var Summary = items[n].getElementsByTagName('summary').item(0).firstChild.data;
					var itemLink = items[n].getElementsByTagName('id').item(0).firstChild.data;
					try { var itemPubDate = '[' + items[n].getElementsByTagName('published').item(0).firstChild.data + '] ';
					} catch (e) { var itemPubDate = ''; }
					
					// As três linhas abaixo formatam a data que o Google Calendar retornam
					// Se quiser usar o formato original, basta comentar ou excluir as linhas abaixo
					var formatedDate = itemPubDate.substr(1,10);
					var formatedTime = itemPubDate.substr(12,8);
					itemPubDate = '[' + formatedDate + ' ' + formatedTime + '] ';
					
					//content += '<li>' + itemPubDate + '</font><a href="' + itemLink + '">' + itemTitle + '</a></li>'; // Esta linha, coloca um link do título do evento
					content += '<li>' + itemPubDate + '</font>' + itemTitle + '</li>'; // Esta linha não tem o link no título do evento
				}
				content += '</ul>';
			}

			document.getElementById("ajaxreader").innerHTML = content; // Exibe o resultado
			document.getElementById("status").innerHTML = "Pronto!"; // Ok! Tudo certo

		} else
			document.getElementById("status").innerHTML = "<div class=error>Erro ao buscar as informações<div>"; // Opa! Avisa que ocorreram erros
		
		HideShow('status');
	}
}

// Main AJAX RSS reader request
function RSSRequest() {

	// change the status to requesting data
	HideShow('status');
	document.getElementById("status").innerHTML = "Buscando informações...";
	
	RSSRequestObject.open("GET", Backend , true); // Prepara a solicitação
	RSSRequestObject.onreadystatechange = ReqChange; // Define a função onreadystatechange
	RSSRequestObject.send(null); // Envia
}

function update_timer() { RSSRequest(); }

function HideShow(id){
	var el = GetObject(id);
	if (el.style.display == "none") el.style.display = ''; else el.style.display = 'none';
}

function GetObject(id){
	var el = document.getElementById(id);
	return(el);
}