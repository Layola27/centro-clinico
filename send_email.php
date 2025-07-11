<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger y limpiar los datos del formulario
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Validar los datos
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor, completa el formulario correctamente.";
        exit;
    }

    // Dirección de correo del destinatario
    $recipient = "glayolacvs@gmail.com";

    // Asunto del correo
    $subject = "Nuevo mensaje de contacto de: $name";

    // Contenido del correo
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mensaje:\n$message\n";

    // Cabeceras del correo
    $email_headers = "From: $name <$email>";

    // Enviar el correo
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado.";
    } else {
        http_response_code(500);
        echo "Oops! Algo salió mal. No se pudo enviar tu mensaje.";
    }

} else {
    http_response_code(403);
    echo "Hubo un problema con el envío. Inténtalo de nuevo.";
}
?>