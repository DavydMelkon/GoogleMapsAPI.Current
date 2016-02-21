<meta charset="UTF-8" />
<?php
if (isset($_POST['name'])) {$name = $_POST['name']; if ($name == '') {unset($name);}}
if (isset($_POST['email'])) {$email = $_POST['email']; if ($email == '') {unset($email);}}
if (isset($_POST['text'])) {$text = $_POST['text']; if ($text == '') {unset($text);}}

if (isset($name) && isset($email) && isset($text)){

$address = "davyd.melkon@gmail.com";
$mes = "Имя: $name \nE-mail: $email \nТекст: $text";
$send = mail ($address,"Новый отзыв от пользователя $name",$mes);
if ($send == 'true')
{echo "Сообщение отправлено успешно, через 6 секунд Вы будете направлены на главную страницу <a href='http://gmapsapi.esy.es/'>GMaps API</a>,где сможете продолжить ваш просмотр";}
else {echo "Ошибка, сообщение не отправлено!";}

}
else
{
echo "Вы заполнили не все поля, вернитесь назад и заполните необходимые поля!";
}
?>