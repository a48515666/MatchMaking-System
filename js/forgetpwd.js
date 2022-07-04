function send1(){
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        type:'OAuth2',
        user: 'zx033582957@gmail.com',
        clientId: '1078389177539-9g1crdndfejhl6m7cj3kmiutuglkst45.apps.googleusercontent.com',
        clientSecret: 'wJYuumTxW5CPnA1QFPibL4y7',
        refreshToken: '1/Bk9gRdrYZJRrZZXAI-BE2HZall3oFUA17dwfN2TLD84',
        accessToken:'ya29.GlsgB1O79nANdjk4SVcCBOGzuIykyvxulkq-MVNy_U4IkAfRkXfonF8sSBIuypfwcELiTU-pNG4O2WteqeewT17PBiZMUgQbA4H90FEvT2RWuFQHxHR4MiUAbLG4'
    },
});

var mailOptions = {
    from: 'Match Monkey <zx033582957@gmail.com>',
    to: 'zx033582957@gmail.com',
    subject: 'Nodemailer test',
    text: 'Hello World!!'
};

transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('成功');
    document.location.href="changepwd.html";
});
}