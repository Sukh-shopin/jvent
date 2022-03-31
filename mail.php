<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$phone= $_POST['tel'];
$message= $_POST['message'];
$to = "navjotsinghdelhi6@gmail.com";
$subject = "Mail From jvent";
$txt ="Name = ". $name . "\r\n  Email = " . $email .  "\r\n  tel = " . $phone . "\r\n Message =" . $message;
$headers = "From: noreply@navjot.com" . "\r\n" .
"CC: somebodyelse@example.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:a/thankyou.html");
?>