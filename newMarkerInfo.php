<meta charset="UTF-8" />
<?php
if (isset($_POST['marker_name'])) {$name = $_POST['marker_name']; if ($marker_name == '') {unset($marker_name);}}
if (isset($_POST['description'])) {$email = $_POST['description']; if ($description == '') {unset($description);}}
if (isset($_POST['selectionName'])) {$text = $_POST['selectionName']; if ($selectionName == '') {unset($selectionName);}}
if (isset($_POST['coordinates'])) {$text = $_POST['coordinates']; if ($coordinates == '') {unset($coordinates);}}

if (isset($marker_name) && isset($description) && isset($selectionName) && isset($coordinates)){

$address = "gmapsapi.mail@gmail.com";
$mes = "<Placemark>\n<name>$marker_name</name>\n<description>$description</description>\n<styleUrl>$selectionName</styleUrl>\n<Point>\n<coordinates>$coordinates</coordinates>\n</Point>\n";
$send = mail ($address,"Новый маркер на карте",$mes);
if ($send == 'true')
{echo "Сообщение отправлено успешно, через 5 секунд Вы будете направлены на главную страницу <a href='http://gmapsapi.esy.es/'>GMaps API</a>,где сможете продолжить ваш просмотр";}
else {echo "Ошибка, сообщение не отправлено!";}
}
else
{
echo "Вы заполнили не все поля, вернитесь назад и заполните необходимые поля!";
}
?>