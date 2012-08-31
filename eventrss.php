<?
// Mude esta linha e coloque o XML do seu Google Calendar
// Não sabe onde pegar esse endereço XML? Pode entrar em contato comigo e eu ajudo: moreirapontocom AT gmail DOT com
$URLdoCalendario = '';

$feed = file_get_contents($URLdoCalendario);
header("Content-type: text/xml");
echo $feed;
?>