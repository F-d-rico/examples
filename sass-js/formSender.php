<?php 
// Email settings 
$toEmail = 'f_d_rico@hotmail.com'; // Recipient email 
$from = 'papanoelfalso@gmail.com'; // Sender email 
$fromName = 'Fundacion'; // Sender name 
 
// File upload settings 
$attachmentUploadDir = "uploads/"; 
$allowFileTypes = array('pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg'); 
 
 
/* Form submission handler code */ 
$postData = $uploadedFile = $statusMsg = $valErr = ''; 
$msgClass = 'errordiv'; 
if(isset($_POST['submit'])){ 
    // Get the submitted form data 
    $postData = $_POST; 
    $nombre = trim($_POST['nombre']); 
    $apellido = trim($_POST['apellido']); 
    $email = trim($_POST['email']);
/*     $message = trim($_POST['message']);  */

 
    // Validate input data 
    if(empty($nombre)){ 
        $valErr .= 'Por favor ingrese su nombre.<br/>'; 
    } 
    if(empty($apellido)){ 
        $valErr .= 'Por favor ingrese su apellido.<br/>'; 
    } 
    if(empty($email) || filter_var($email, FILTER_VALIDATE_EMAIL) === false){ 
        $valErr .= 'Por favor ingrese un email valido.<br/>';
    } 
/*     if(empty($message)){ 
        $valErr .= 'Please enter message.<br/>'; 
    }  */
     
    // Check whether submitted data is valid 
    if(empty($valErr)){ 
        $uploadStatus = 1; 
         
        // Upload attachment file registro
        if(!empty($_FILES["registro"]["name"])){ // aca name o nombre?
             
            // File path config 
            $targetDir = $attachmentUploadDir; 
            $fileName = basename($_FILES["registro"]["name"]); // aca name o nombre?
            $targetFilePath = $targetDir . $fileName; 
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
             
            // Allow certain file formats 
            if(in_array($fileType, $allowFileTypes)){ 
                // Upload file to the server 
                if(move_uploaded_file($_FILES["registro"]["tmp_name"], $targetFilePath)){ 
                    $uploadedFile = $targetFilePath; 
                }else{ 
                    $uploadStatus = 0; 
                    $statusMsg = "Lo sentimos hubo un problema en la carga de su archivo."; 
                } 
            }else{ 
                $uploadStatus = 0; 
                $statusMsg = 'Lo sentimos, solo archivos '.implode('/', $allowFileTypes).' son aceptados.'; 
            } 
        } 
        
        // Upload attachment file curriculum
        if(!empty($_FILES["curriculum"]["name"])){ // aca name o nombre?
             
            // File path config 
            $targetDir = $attachmentUploadDir; 
            $fileName = basename($_FILES["curriculum"]["name"]); // aca name o nombre?
            $targetFilePath = $targetDir . $fileName; 
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
             
            // Allow certain file formats 
            if(in_array($fileType, $allowFileTypes)){ 
                // Upload file to the server 
                if(move_uploaded_file($_FILES["curriculum"]["tmp_name"], $targetFilePath)){ 
                    $uploadedFile = $targetFilePath; 
                }else{ 
                    $uploadStatus = 0; 
                    $statusMsg = "Lo sentimos hubo un problema en la carga de su archivo."; 
                } 
            }else{ 
                $uploadStatus = 0; 
                $statusMsg = 'Lo sentimos, solo archivos '.implode('/', $allowFileTypes).' son aceptados.'; 
            } 
        } 
         
        if($uploadStatus == 1){ 
            // Email subject 
            $emailSubject = 'Solicitud al programa Sin Límites de '.$nombre; 
             
            // Email message  
            $htmlContent = '<h2>Solicitud recibida de</h2> 
                <p><b>Name:</b> '.$nombre. .$apellido.'</p> 
                <p><b>Email:</b> '.$email.'</p>'; 
             
            // Header for sender info 
            $headers = "De: $fromName"." <".$from.">"; 
 
            // Add attachment to email 
            if(!empty($uploadedFile) && file_exists($uploadedFile)){ 
                 
                // Boundary  
                $semi_rand = md5(time());  
                $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";  
                 
                // Headers for attachment  
                $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\"";  
                 
                // Multipart boundary  
/*                 $message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" . 
                "Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n";   */
                 
                // Preparing attachment 
                if(is_file($uploadedFile)){ 
                    /* $message .= "--{$mime_boundary}\n";  */
                    $fp =    @fopen($uploadedFile,"rb"); 
                    $data =  @fread($fp,filesize($uploadedFile)); 
                    @fclose($fp); 
                    $data = chunk_split(base64_encode($data)); 
                    $message .= "Content-Type: application/octet-stream; name=\"".basename($uploadedFile)."\"\n" .  
                    "Content-Description: ".basename($uploadedFile)."\n" . 
                    "Content-Disposition: attachment;\n" . " filename=\"".basename($uploadedFile)."\"; size=".filesize($uploadedFile).";\n" .  
                    "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n"; 
                } 
                 
              /*   $message .= "--{$mime_boundary}--";  */
                $returnpath = "-f" . $email; 
                 
                // Send email 
                $mail = mail($toEmail, $emailSubject, $message, $headers, $returnpath); 
                 
                // Delete attachment file from the server 
                @unlink($uploadedFile); 
            }else{ 
                    // Set content-type header for sending HTML email 
                $headers .= "\r\n". "MIME-Version: 1.0"; 
                $headers .= "\r\n". "Content-type:text/html;charset=UTF-8"; 
                 
                // Send email 
                $mail = mail($toEmail, $emailSubject, $htmlContent, $headers);  
            } 
             
            // If mail sent 
            if($mail){ 
                $statusMsg = 'Gracias, su solicitud a sido recibida con éxito.'; 
                $msgClass = 'succdiv'; 
                 
                $postData = ''; 
            }else{ 
                $statusMsg = 'Los sentimos algo ha salido mal, intente de nuevo.'; 
            } 
        } 
    }else{ 
        $valErr = !empty($valErr)?'<br/>'.trim($valErr, '<br/>'):''; 
        $statusMsg = 'Por favor llene los campos requeridos.'.$valErr; 
    } 
} 
?>