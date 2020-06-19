import nodemailer from 'nodemailer'

async function sendMail(destiny: string, subject: string, text: string, html: string) {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'proredtesting@gmail.com',
            pass: 'ProRed2020'
        }
    });

    // send mail with defined transport object
    var mailOptions = {
        from: 'proredtesting@gmail.com',
        to: destiny,
        subject: subject,
        text: text, // plain text body
        html: html, // html body
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent");
        }
    });
}

export default sendMail;