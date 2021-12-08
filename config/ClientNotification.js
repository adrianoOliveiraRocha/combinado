async function sendMail() {
  const nodemailer = require('nodemailer')
  const gmailConfig = require('./gmail-config.json')
  
  let transporter = nodemailer.createTransport({
    host: gmailConfig.smtp,
    port: gmailConfig.tls_port,
    //secure: false, // true for 465, false for other ports
    auth: {
      user: gmailConfig.username, 
      pass: gmailConfig.password, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${companyName}" <${companyEmail}>`, // sender address
    to: `${clientEmail}`, // list of receivers
    subject: "Agendamento ✔", // Subject line
    text: `Olá ${clientName}`, // plain text body
    html: `
    <h2>Olá ${clientName}</h2>
    <p>Passando pra lembrar do nosso agendamento ${schedulingDatetime}</p>
    <p>Caso queira cancelar, acesse o nosso link: ${companyLink}</p>
    <p>Até lá</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

}

const ClientNotification = (function (application) {
  return {
    getTomorrowSheduling: function(callback) {
      const mysql = require('mysql')
      let connection = mysql.createConnection({
        host: 'localhost',
        user: 'adriano',
        password: '453231',
        database: 'combinado'
      })

      let sql = `
      select scheduling.id, scheduling.clientPhone, scheduling.clientEmail, 
      user.companyName, user.companyEmail 
      from scheduling, employee, user 
      where year(_datetime) = year(ADDDATE(CURDATE(), INTERVAL 1 DAY))
      and month(_datetime) = month(ADDDATE(CURDATE(), INTERVAL 1 DAY))
      and day(_datetime) = day(ADDDATE(CURDATE(), INTERVAL 1 DAY))
      and scheduling.employeeId = employee.id
      and scheduling.canceled = 0
      and employee.userId = user.id`

      connection.connect()

      connection.query(sql, (err, result, fields) => {
        if(err) {
          console.log("OOPS!", err);
        } else {
          for(let i = 0; i < result.length; i++) {
            console.log(result[0].clientEmail)
          }
          
        }
      })

      connection.end(() => {
        console.log('Data base closed')
      })
      
    }
  }
})()

module.exports = ClientNotification;