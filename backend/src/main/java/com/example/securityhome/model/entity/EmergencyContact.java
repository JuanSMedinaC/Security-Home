package com.example.securityhome.model.entity;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmergencyContact {
    String from, fromName, to;
    final int PORT=587;
    final String SMTP_USERNAME = "secuhome123@outlook.com";
    final String SMTP_PASSWORD = "securityhome123";
    final String CONFIGSET = "ConfigSet";
    final String HOST = "smtp-mail.outlook.com";
    final String SUBJECT = "EMERGENCIA";
    final String BODY = "Hay una anomalia, revisa la app para ver que pasa!";

    public EmergencyContact(String from, String fromName, String to)
    {
        this.from = from;
        this.fromName = fromName;
        this.to = to;
    }

    public void sendEmail() throws Exception{

        Properties props = System.getProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.port", PORT);
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getDefaultInstance(props);

        MimeMessage msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(from, fromName));
        msg.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
        msg.setSubject(SUBJECT);
        msg.setContent(BODY, "text/html");
        msg.setHeader("X-SES-CONFIGURATION-SET", CONFIGSET);
        Transport transport = session.getTransport();

        System.out.println("Enviando...");

        try {
            transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);
            transport.sendMessage(msg, msg.getAllRecipients());
            System.out.println("el correo fue enviado");
        } catch(Exception e) {
            System.out.println("email not sended" + e.getMessage());
        } finally {
            transport.close();
        }
    }
}
