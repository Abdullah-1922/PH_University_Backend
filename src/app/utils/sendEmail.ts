import nodemailer from 'nodemailer' ;
import config from '../config';

export const sendEmail=async(emailTo:string,subject:string,htmlData:string,text?:string,)=>{


   

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    host:"smpt.gmail.com",
    port:597,
    secure: config.NODE_ENV === 'production' ,
    auth: {
        user: 'kafikafi1922@gmail.com',
        pass: 'oens esxp eswd usyt'
    }
});

const mailOptions = {
    from: 'kafikafi1922@mail.com',
    to:emailTo,
    subject: subject,
    text: text,
    html: htmlData
};

await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
}