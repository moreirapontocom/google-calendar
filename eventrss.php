<?
// Mude esta linha e coloque o XML do seu Google Calendar
// N�o sabe onde pegar esse endere�o XML? Pode entrar em contato comigo e eu ajudo: moreirapontocom AT gmail DOT com
$URLdoCalendario = '';

$feed = file_get_contents($URLdoCalendario);
header("Content-type: text/xml");
echo $feed;
?>