<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'C:/xampp/htdocs/tnp/vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 2;  // Enable verbose debug output
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'supradeept.07@gmail.com';  // Your Gmail address
        $mail->Password   = 'awyr rclj arsb ario';      // Your Gmail app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('supradeept.07@gmail.com', 'Contact Form');  // Set this to your Gmail address
        $mail->addReplyTo($email, $name);  // Set reply-to as the user's email
        $mail->addAddress('supradeept.07@gmail.com', 'Admin');  // Your email address to receive messages

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission from $name";
        $mail->Body    = "Name: $name<br>Email: $email<br>Message: $message";
        $mail->AltBody = "Name: $name\nEmail: $email\nMessage: $message";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Message has been sent']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}