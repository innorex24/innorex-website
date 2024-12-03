<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifier et nettoyer les données
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    // Validation des données
    if (empty($name) || empty($email) || empty($message)) {
        echo "Tous les champs sont obligatoires.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Adresse email invalide.";
        exit;
    }

    // Paramètres pour l'envoi d'email
    $to = "innorex24@gmail.com";
    $subject = "Nouveau message depuis le site Innorex";
    $body = "Nom : $name\nEmail : $email\n\nMessage :\n$message";
    $headers = "From: $email\r\nReply-To: $email";

    // Envoi de l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "Merci, votre message a été envoyé avec succès.";
    } else {
        echo "Une erreur s'est produite lors de l'envoi du message.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>
