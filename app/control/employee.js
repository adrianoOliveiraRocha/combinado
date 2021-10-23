module.exports.index = (req, res, application) => {
    var message = req.session.message
    req.session.message = ''
    var error = req.session.error
    req.session.error = ''

    res.render('employee/index.ejs', {
        employee: req.session.employee,
        message: message,
        error: error
    })

}

module.exports.profile = (req, res, application) => {
    var message = req.session.message
    req.session.message = ''
    res.render('employee/profile.ejs', {
        employee: req.session.employee,
        message: message
    })
}

module.exports.editProfile = (req, res, application) => {

    const Employee = application.app.models.Employee
    const connect = application.config.connect()
    var data = req.body
    const employeeId = data.id
    var imageName
    const SecurityPassword = application.app.helpers.SecurityPassword

    if (req.files != null) {

        var folder = 'admin/images/profile_images'
        const UploadImage = application.app.helpers.UploadImage
        imageName = UploadImage(req.files.image, folder)

        if (data.currentImage.length > 0) {
            const DeleteImage = application.app.helpers.DeleteImage
            DeleteImage(folder, data.currentImage)
        } else {
            console.log('No image to delete')
        }

    }

    function updateEmployee() {

        return new Promise((resolve, reject) => {
            data.encryptPwd = SecurityPassword.encrypt(data.pwd)
            Employee.update(data, imageName, connect, (errUpd, resultUpd) => {
                if (errUpd) {
                    reject(errUpd)
                } else {
                    resolve(resultUpd)
                }
            })
        })

    }

    updateEmployee().then(resultUpd => { // get the updated user
        return new Promise((resolve, reject) => {
            Employee.getThis(req.session.employee.id, connect, (errEmployee, resultEmployee) => {
                if (errEmployee) {
                    reject(errEmployee)
                } else {
                    resolve(resultEmployee[0])
                }
            })
        })

    }).then(employee => { // does update the session
        req.session.employee = employee // update the user in the session
        req.session.employee.pwdDecrypted = SecurityPassword.decrypt(employee.pwd)
        req.session.message = 'Informações atualizadas com sucesso!'
        res.redirect('/employee-profile')

    }).catch(err => {
        console.error(err)
        req.session.error = err.sqlMessage
        res.redirect('/home-employee')
    }).then(() => {
        connect.end()
    })

}

module.exports.employeeServices = (req, res, application) => {
    const connect = application.config.connect()
    const Service = application.app.models.Service
    const Employee = application.app.models.Employee

    function getServices() {
        return new Promise((resolve, reject) => {
            Service.getAll(req.session.employee.userid, connect, (err, services) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(services)
                }
            })
        })
    }

    function getMyServices() {
        return new Promise((resolve, reject) => {
            Employee.getMyServices(req.session.employee.id, connect, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    Promise.all([getServices(), getMyServices()])
        .then(([services, myServices]) => {

            function isChecked(serviceId) {
                for (let i in myServices) {
                    if (myServices[i].serviceid == serviceId) {
                        return 'checked'
                    }
                }
            }

            res.render('employee/edit-myservices.ejs', {
                employee: req.session.employee,
                services: services,
                myServices: myServices,
                isChecked: isChecked
            })


        }).catch(err => {
            console.error(err)
            req.session.error = 'Erro ao pesquisar os serviços cadastrados'
            res.redirect('/home-employee')
        }).then(() => {
            connect.end()
        })
}

module.exports.updateMyServices = (req, res, application) => {
    var data = req.body
    const connect = application.config.connect()
    const Employee = application.app.models.Employee

    function deleteMyServices() {
        return new Promise((resolve, reject) => {
            Employee.deleteMyServices(req.session.employee.id, connect, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    async function updateMyServices() {
        var result = await deleteMyServices()
        return new Promise((resolve, reject) => {
            Employee.updateMyServices(req.session.employee.id, req.session.employee.userid,
                data, connect, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
        })
    }

    updateMyServices().then(result => {
        req.session.message = 'Atualizado com sucesso!'
        res.redirect('/home-employee')

    }).catch(err => {
        console.error(err)
        if (err.errno == 1065) {
            req.session.error = `
                Você não registrou nenhum serviço. É importante que o cliente saiba que tipo de serviço
                você presta. Você pode registrar um serviço no seu perfil a qualquer momento`
            res.redirect('/home-employee')
        } else {
            req.session.error = 'Ocorreu um problema ao tentar atualizar os serviços!'
            res.redirect('/home-employee')
        }
    })

}

module.exports.configQuery = (req, res, application) => {
    const Employee = application.app.models.Employee
    const connect = application.config.connect()

    Employee.getEmployeeDays(req.session.employee.id, connect, (err, result) => {
        if (err) {
            console.error(err.sqlMessage)
            req.session.error = 'Erro tentando recuperar horários deste colaborador'
            res.redirect('/home-employee')
        } else {

            var configuratedDays = []
            Object.keys(result).forEach(index => {
                configuratedDays.push(result[index].dayCode)
            })

            var days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
                // the current day did be null, But now, it is not possible any more.
                // So, this test, in this moment, is not necessary any more
            function getCurrentDay(dayCode) {
                if (Object.keys(result).length == 0) {
                    return null
                } else {
                    var currentDay = null
                    if (configuratedDays.includes(parseInt(dayCode))) {
                        result.forEach(day => {
                            if (day.dayCode == dayCode) {
                                currentDay = day
                            }
                        })
                    }
                    return currentDay
                }
            }

            res.render('employee/config-query.ejs', {
                employee: req.session.employee,
                days: days,
                getCurrentDay: getCurrentDay,
                currentQueryTime: function() {
                    if (Object.keys(result).length > 0) {
                        return result[0].queryTime
                    } else {
                        return null
                    }
                }
            })
        }
    })

}

module.exports.editQueryConfig = (req, res, application) => {

    const connect = application.config.connect()
    var data = req.body
    const Employee = application.app.models.Employee

    Employee.editQueries(data, req.session.employee.id, connect, (err, result) => {
        connect.end()
        if (err) {
            console.error(err.sqlMessage)
            req.session.error = 'Não foi possível realizar essa operação'
            res.redirect('/home-employee')
        } else {
            req.session.message = 'Configurado com sucesso!'
            res.redirect('/home-employee')
        }
    })

}

module.exports.showAllSchedulings = (req, res, application) => {
    const employeeId = req.session.employee.id
    const Scheduling = application.app.models.Scheduling
    const connect = application.config.connect()

    Scheduling.getAllSchedulings(employeeId, connect, (err, result) => {
        connect.end()
        if (err) {
            console.error(err.sqlMessage)
            req.session.error = 'Não foi possível recuperar os agendamentos'
            res.redirect('/home-employee')
        } else {
            res.render('employee/view-schedulings.ejs', {
                employee: req.session.employee,
                isFuture: application.app.helpers.validDateTime,
                schedulings: result,
                status: 'Todos',
                portugueseDateTime: application.app.helpers.portugueseDateTime
            })
        }
    })
}

module.exports.showOldSchedulings = (req, res, application) => {
    const employeeId = req.session.employee.id
    const Scheduling = application.app.models.Scheduling
    const connect = application.config.connect()

    Scheduling.getOldSchedulings(employeeId, connect, (err, result) => {
        connect.end()
        if (err) {
            console.error(err.sqlMessage)
            req.session.error = 'Não foi possível recuperar os agendamentos'
            res.redirect('/home-employee')
        } else {
            res.render('employee/view-schedulings.ejs', {
                employee: req.session.employee,
                isFuture: application.app.helpers.validDateTime,
                schedulings: result,
                status: 'Antigos',
                portugueseDateTime: application.app.helpers.portugueseDateTime
            })
        }
    })
}

module.exports.showNewSchedulings = (req, res, application) => {
    const employeeId = req.session.employee.id
    const Scheduling = application.app.models.Scheduling
    const connect = application.config.connect()

    Scheduling.getNewSchedulings(employeeId, connect, (err, result) => {
        connect.end()
        if (err) {
            console.error(err.sqlMessage)
            req.session.error = 'Não foi possível recuperar os agendamentos'
            res.redirect('/home-employee')
        } else {
            res.render('employee/view-schedulings.ejs', {
                employee: req.session.employee,
                isFuture: application.app.helpers.validDateTime,
                schedulings: result,
                status: 'Novos',
                portugueseDateTime: application.app.helpers.portugueseDateTime
            })
        }
    })
}

module.exports.shedulingNotifications = (req, res, application) => {
    const Scheduling = application.app.models.Scheduling
    const connect = application.config.connect()
    let currentDate = application.app.helpers.createSQLDateTime(new Date())
    const employeeId = req.session.employee.id
    Scheduling.getNotifications(currentDate, employeeId, connect, (err, result) => {
        connect.end()
        if (err) {
            console.error(err.sqlMessage)
        } else {
            var numberOfNotifications = Object.keys(result).length
            res.render('employee/scheduling-notifications.ejs', {
                notifications: result,
                numberOfNotifications: numberOfNotifications,
            })
        }
    })

}

module.exports.showScheduling = (req, res, application) => {
    var schedulingId = req.query.schedulingId
    const Scheduling = application.app.models.Scheduling
    const connect = application.config.connect()

    const cancellable = () => {
        // It test wether the datetime is future
        return new Promise((resolve, reject) => {
            Scheduling.getThisCancellable(schedulingId, connect, (err, result) => {
                if (err) reject(err)
                else resolve(result[0].ICan)
            })
        })
    }

    async function show() {
        const isItCancellable = await cancellable()
        return new Promise((resolve, reject) => {
            Scheduling.getThis(schedulingId, connect, (err, result) => {
                if (err) reject(err)
                else {
                    const response = {
                        isItCancellable: isItCancellable,
                        scheduling: result[0]
                    }
                    resolve(response)
                }
            })
        })
    }

    show().then(response => {
        connect.end()
        res.render('employee/scheduling-detail.ejs', {
            employee: req.session.employee,
            scheduling: response.scheduling,
            isItCancellable: response.isItCancellable,
            portugueseDateTime: application.app.helpers.portugueseDateTime
        })
    }).catch(err => {
        console.error(err)
        req.session.error = 'Não foi possível recuperar as informações desse agendamento'
        res.redirect('/home-employee')
    })

}

module.exports.cancelScheduling = (req, res, application) => {
    var schedulingId = req.body.schedulingId
    const Scheduling = application.app.models.Scheduling
    const connect = application.config.connect()
    Scheduling.cancelSchuduling(schedulingId, connect, (err, result) => {
        if (err) {
            console.error(err.sqlMessage)
            req.session.error = 'Não foi possível cancelar esse agendamento'
            res.redirect('/home-employee')
        } else {
            req.session.message = 'Operação realizada com sucesso!'
            res.redirect('/home-employee')
        }
    })
}

module.exports.canceledScheduling = (req, res, application) => {
    const Employee = application.app.models.Employee
    const connect = application.config.connect()

    Employee.getCanceledSchedulings(req.session.employee.id, connect, (err, result) => {
        connect.end()
        if (err) {
            console.error(err.sqlMessage)
            req.session.error = 'Não foi possível recuperar os agendamentos cancelados'
            res.redirect('/home-employee')
        } else {
            res.render('employee/view-schedulings.ejs', {
                employee: req.session.employee,
                isFuture: application.app.helpers.validDateTime,
                schedulings: result,
                status: 'Cancelados',
                portugueseDateTime: application.app.helpers.portugueseDateTime
            })
        }
    })

}

module.exports.sendWhatsappMessage = (req, res, application) => {
    const Scheduling = application.app.models.Scheduling
    const connect = application.config.connect()

    Scheduling.getThis(req.query.shedulingId, connect, (err, result) => {
        connect.end()
        if (err) {
            console.error(err)
            req.session.error = 'Não foi possível recuperar as informações desse agendamento'
            res.redirect('/home-employee')
        } else {
            let message = `Olá ${result[0].clientEmail}. Sua visita está marcada para ${application.app.helpers.portugueseDateTime(result[0]._datetime)}. Até lá!`
            let phone = "55" + result[0].clientPhone.replace("(", "").replace(")", "")
            const link = application.app.helpers.getWhatsappLink(phone, message)
            res.redirect(link)
        }
    })
}

module.exports.sendEmailMessage = (req, res, application) => {
    const Scheduling = application.app.models.Scheduling
    const connect = application.config.connect()

    if (req.method == 'GET') {
        Scheduling.getThis(req.query.shedulingId, connect, (err, result) => {
            connect.end()
            if (err) {
                console.error(err)
                req.session.error = 'Não foi possível recuperar as informações desse agendamento'
                res.redirect('/home-employee')
            } else {
                let message = `Olá ${result[0].clientEmail}. Sua visita está marcada para ${application.app.helpers.portugueseDateTime(result[0]._datetime)}. Até lá!`
                res.render('employee/form-email-message.ejs', {
                    employee: req.session.employee,
                    scheduling: result[0],
                    message: message
                })
            }
        })
    } else {
        "use strict"
        const data = req.body
        const nodemailer = require("nodemailer")
        async function main() {
            // my account
            const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'murl.kuvalis@ethereal.email',
                        pass: 'nS8zpVxva1dABmbf32'
                    }
                })
                // send mail with defined transport object
            let text = data.message.trim()
            let html = `
              <h2>${data.subject}</h2>
              <p>${data.message}</p>               
            `.trim()

            let info = await transporter.sendMail({
                from: '"Combinado" <combinado@contato.com>', // sender address
                to: data.email, // receiver
                subject: data.subject, // Subject line
                text: text, // plain text body
                html: html // html body
            })

        }

        main()
            .then(() => {
                req.session.message = 'Mensagem Enviada com sucesso!'
                res.redirect('/home-employee')
            })
            .catch(error => {
                console.error(error)
                req.session.error = "Não foi possível enviar a mensagem"
                res.redirect('/home-employee')
            })
    }
}