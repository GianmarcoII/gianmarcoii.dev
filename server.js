const express = require("express");
const nodemailer = require('nodemailer')
const fs = require('fs');
const DOMPurify = require("isomorphic-dompurify");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json());


const PORT = 8080;

app.get("/", function(req,res){res.redirect("/en")});
app.get("/en", function(req,res){res.render("enIndex")});
app.get("/es", function(req,res){res.render("esIndex")});
app.get("/it", function(req,res){res.render("itIndex")});
app.get("/fr", function(req,res){res.render("frIndex")});
app.get("/change", function(req,res){res.render("change")})

app.post("/handler", function(req,res){
        let dt = new Date();
        let years = dt.getFullYear();
        let hours = dt.getHours();
        let minutes = dt.getMinutes();
        let seconds = dt.getSeconds();
        let name = DOMPurify.sanitize(req.body.name);
        let email = DOMPurify.sanitize(req.body.email);
        let msg = DOMPurify.sanitize(req.body.msg);
        const msgTemplate = `Anno: ${years}; Nuovo messaggio ricevuto dal sito web alle ore:${hours}:${minutes}:${seconds}; ${msg}`;
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user:"gimmy.none@gmail.com",
                pass: "rlanttksqoseeqlf"
            }
        })

        let htmlFile = fs.readFileSync("./public/html/email.html", "utf-8");
        htmlFile = htmlFile.replace("{{YEAR}}",years );
        htmlFile = htmlFile.replace("{{HOUR}}",hours );
        htmlFile = htmlFile.replace("{{MINUTE}}",minutes );
        htmlFile = htmlFile.replace("{{SECONDS}}",seconds );
        htmlFile = htmlFile.replace("{{MSG}}",msg );


        msgInfo = {
            from: email,
            to: "gimmy.none@gmail.com",
            subject: "New Message from your website!",
            replyTo: email, 
            text: msgTemplate,
            html: htmlFile
        }

        transporter.sendMail(msgInfo, function(err,info){
            if(err) throw err;
            console.log(info);
            res.redirect("/en")
        } );
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));