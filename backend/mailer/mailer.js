const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'agilypet@outlook.com',
        pass: '12abc34!"#'
    }
});

module.exports = {
    sendEmail: (to, subject, text) => {
        transporter.sendMail({
            from: '"AgilyPet" <agilypet@outlook.com>',
            to: to,
            subject: subject,
            text: text
        }, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info.response);
            }
        });
    }
}