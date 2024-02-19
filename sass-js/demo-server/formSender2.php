<?php
    $registronameee =  $_FILES['registro']['name'];
    $registroName = $_FILES['registro']['tmp_name']; 
    $curriculumnameee =  $_FILES['curriculum']['name'];
    $curriculumName = $_FILES['curriculum']['tmp_name']; 
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
 /*    $usermessage = $_POST['message']; */
    
    $message ="Registro de = ". $nombre . . $apellido . "\r\n  Email = " . $email /* . "\r\n Message =" . $usermessage */; 
    
    $subject ="Registro programa Sin Límites";
    $fromname ="Web Fundación";
    $fromemail = 'papanoelfalso@gmail.com';  //if u dont have an email create one on your cpanel
    $mailto = 'federico.psr@gmail.com';  //the email which u want to recv this email
    $content = file_get_contents($registroName);
    $content = chunk_split(base64_encode($content));
    $content2 = file_get_contents($curriculumName);
    $content2 = chunk_split(base64_encode($content2));

    // a random hash will be necessary to send mixed content
    $separator = md5(time());
    // carriage return type (RFC)
    $eol = "\r\n";
    // main header (multipart mandatory)
    $headers = "From: ".$fromname." <".$fromemail.">" . $eol;     /// los from son mejor propios o del usuario
    $headers .= "MIME-Version: 1.0" . $eol;
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol;
    $headers .= "Content-Transfer-Encoding: 7bit" . $eol;
    $headers .= "This is a MIME encoded message." . $eol;
    // message
    $body = "--" . $separator . $eol;
    $body .= "Content-Type: text/plain; charset=\"iso-8859-1\"" . $eol;
    $body .= "Content-Transfer-Encoding: 8bit" . $eol;
    $body .= $message . $eol;
    // attachment
    $body .= "--" . $separator . $eol;
    $body .= "Content-Type: application/octet-stream; name=\"" . $registronameee . "\"" . $eol;
    $body .= "Content-Transfer-Encoding: base64" . $eol;
    $body .= "Content-Disposition: attachment" . $eol;
    $body .= $content . $eol;
    ///
    $body .= "--" . $separator . $eol;
    $body .= "Content-Type: application/octet-stream; name=\"" . $curriculumnameee . "\"" . $eol;
    $body .= "Content-Transfer-Encoding: base64" . $eol;
    $body .= "Content-Disposition: attachment" . $eol;
    $body .= $content2 . $eol;
    $body .= "--" . $separator . "--";
    //SEND Mail
    if (mail($mailto, $subject, $body, $headers)) {
        echo "registro enviado... OK"; // do what you want after sending the email
        
        
    } else {
        echo "registro no enviado... ERROR!";
        print_r( error_get_last() );
    }