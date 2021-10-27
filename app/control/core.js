module.exports.index = (req, res) => {
  res.render('core/index.ejs')
}

module.exports.register = (req, res, application) => {
    if (req.method == 'GET') {
        res.render('core/register.ejs')
    } else {
        const connect = application.config.connect()
        const User = application.app.models.User
        var data = req.body
        const SecurityPassword = application.app.helpers.SecurityPassword
        data.pwd = SecurityPassword.encrypt(data.pwd)

        User.save(data, connect, (err, result) => {
            if (err) {
                console.error(err)
                res.render('core/register.ejs', {
                    error: err
                })
            } else {
                let message = 'Usuário registrado com sucesso!'
                res.render('core/login.ejs', {
                    message: message
                })
            }
        })

    }
}

module.exports.login = (req, res, application) => {
    var message = req.session.message
    req.session.message = ''
    var error = req.session.error
    req.session.error = ''

    if (req.method == 'GET') {

        if (req.session.loged) { // someone is loged

            if (typeof req.session.user != 'undefined') { // it is a user
                if (req.session.user.admin == 1) { // it is admin
                    res.redirect('/admin')
                } else { // it is a user
                    req.session.message = `Bem-Vindo ${req.session.user.email}`
                    res.redirect('/user-home')
                }

            } else { // it is a employee
                res.redirect('home-employee')
            }

        } else {
            res.render('core/login.ejs', {
                message: message,
                error: error
            })
        }

    } else {

        const User = application.app.models.User
        const connect = application.config.connect()
        const SecurityPassword = application.app.helpers.SecurityPassword
        var data = req.body
        var pwdDecrypted = data.pwd
        data.pwd = SecurityPassword.encrypt(data.pwd)

        User.verify(data, connect, (err, result) => { // verify wheter it is a user
            connect.end()
            if (err) {
                console.error(err)
                req.session.error = err.sqlMessage
                res.redirect(req.originalUrl)
            } else {
                if (Object.keys(result).length > 0) { // It was found in the user table
                    req.session.user = result[0]
                    req.session.user.pwdDecrypted = pwdDecrypted
                    req.session.message = `Bem vindo ${req.session.user.username}`
                    req.session.loged = true
                    res.redirect('/login')
                } else { // loking for it in employee table
                    const Employee = application.app.models.Employee
                    const connect = application.config.connect()
                    Employee.verify(data, connect, (errEmployee, resultEmployee) => {
                        connect.end()
                        if (errEmployee) {
                            console.error(errEmployee)
                            req.session.error = err.sqlMessage
                            res.redirect(req.originalUrl)
                        } else { // it was found in employee table
                            if (Object.keys(resultEmployee).length > 0) {
                                req.session.employee = resultEmployee[0]
                                req.session.employee.pwdDecrypted = pwdDecrypted
                                req.session.message = `Bem vindo ${req.session.employee.name}`
                                req.session.loged = true
                                res.redirect('/login')
                            } else {
                                req.session.error = "Não encontrado"
                                res.redirect(req.originalUrl)
                            }
                        }
                    })

                }
            }
        })

    }
}

module.exports.schedule = (req, res, application) => {
	const userId = req.query.userId
	const connect = application.config.connect()

	async function getColors() {
		const User = application.app.models.User;
		return new Promise((resolve, reject) => {
			User.getColors(userId, connect, (err, colors) => {
				if(err) reject(err);
				else resolve(colors);
			})
		})

	}

	async function getEmployes() {
		req.session.colors = await getColors();
		const Employee = application.app.models.Employee
		return new Promise((resolve, reject) => {
			// get all employeers of this user
			Employee.getOfThisUser(userId, connect, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	}

	async function getServices() {
		const Service = application.app.models.Service
		var employeers = await getEmployes()

		return new Promise((resolve, reject) => {

			if (employeers.length == 0) reject('no employeers')

			Service.getServicesOfThisEmployeers(connect, employeers, (err, servicesEmployeers) => {
				if (err) {
					reject(err)
				} else {
					var EmployeersServices = []
					if (employeers.length == 1) { // It has just one employee
						employeers[0].services = []
						if (servicesEmployeers.length == 1) // this employee has just one service
							employeers[0].services.push(servicesEmployeers[0].service)
						else { // this employee has more then one service
							servicesEmployeers.forEach(se => {
								employeers[0].services.push(se.service)
							})
						}

						EmployeersServices.push(employeers[0])

					} else { // It have more then one employee
						employeers.forEach(employee => {
							employee.services = []
							servicesEmployeers.forEach(se => {
								se.forEach(se1 => {
									if (employee.id == se1.employeeId) {
										employee.services.push(se1.service)
									}
								})
							})
							EmployeersServices.push(employee)
						})
					}

					resolve(EmployeersServices)

				}
			})
		})
	}

	getServices().then(EmployeersServices => {
		res.render('core/schedule.ejs', {
			EmployeersServices: EmployeersServices,
			colors: req.session.colors[0]
		})
	}).catch(err => {
		console.error(err)
		res.render('core/error.ejs', {
			error: 'Esse usuário ainda não tem colaboradores cadastrados'
		})
	}).then(() => {
		connect.end()
	})

}

module.exports.schedule1 = (req, res, application) => {
	const employeeId = req.query.employeeId
	var jsDate = new Date()
	const sqlDate = application.app.helpers.createSQLDate(jsDate)

	const connect = application.config.connect()
	const Scheduling = application.app.models.Scheduling
	const Employee = application.app.models.Employee

	const getSchedulings = new Promise((resolve, reject) => {
		Scheduling.getSchedulings(sqlDate,
			employeeId, connect, (err, result) => {
				if (err) reject(err)
				else resolve(result)
			})
	})

	const getThisDay = new Promise((resolve, reject) => {
		Employee.getThisDay(employeeId, jsDate.getDay(), connect, (err, result) => {
			if (err) reject(err)
			else if (result.length == 0) {
				let error = `
				Esse colaborador ainda não definiu
				seu horário de atendimento. Por favor,
				escolha outro colaborador.`
				reject(error)
			} else {
				let queryTime = result[0].queryTime
				let morningInit = result[0].morningInit
				let morningEnd = result[0].morningEnd
				let afternoonInit = result[0].afternoonInit
				let afternoonEnd = result[0].afternoonEnd

				const calculateHours = application.app.helpers.calculateHours

				var morning = null
				var afternoon = null

				if (typeof morningInit == 'string' && typeof morningEnd == 'string') {
					var morning = calculateHours(queryTime, morningInit, morningEnd)
				}

				if (typeof afternoonInit == 'string' && typeof afternoonEnd == 'string') {
					var afternoon = calculateHours(queryTime, afternoonInit, afternoonEnd)
				}

				var response = {
					morning: morning,
					afternoon: afternoon,
					queryTime: queryTime
				}

				resolve(response)

			}
		})
	})

	Promise.all([getSchedulings, getThisDay])
		.then(([schedulings, dayConfigs]) => {
			const schedulingHours = application.app.helpers.getSchedulingHours(schedulings)
			const testBusyTime = (_time) => {
				return application.app.helpers.isItBusyTime(_time, schedulingHours)
			}

			res.render('core/schedule1.ejs', {
				employeeId: employeeId,
				morning: dayConfigs.morning,
				afternoon: dayConfigs.afternoon,
				today: jsDate,
				validDate: application.app.helpers.validDateTime(jsDate),
				isItBusyTime: testBusyTime,
				portuguesedateTime: application.app.helpers.portugueseDateTime,
        colors: req.session.colors[0]
			})
		})
		.catch(err => {
			res.render('core/error.ejs', {
				error: err
			})
		})
		.then(() => {
			connect.end()
		})

}

module.exports.coreChangeDate = (req, res, application) => {
    var jsDate = new Date(req.query.date)
    const sqlDate = application.app.helpers.createSQLDate(jsDate)

    const employeeId = req.query.employeeId
    const dayCode = jsDate.getDay()

    const connect = application.config.connect()
    const Scheduling = application.app.models.Scheduling
    const Employee = application.app.models.Employee

    const getSchedulings = new Promise((resolve, reject) => {
        Scheduling.getSchedulings(sqlDate, employeeId, connect, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })

    const getThisDay = new Promise((resolve, reject) => {
			Employee.getThisDay(employeeId, dayCode, connect, (err, result) => {
				if (err) reject(err)
				else {

					let queryTime = result[0].queryTime
					let morningInit = result[0].morningInit
					let morningEnd = result[0].morningEnd
					let afternoonInit = result[0].afternoonInit
					let afternoonEnd = result[0].afternoonEnd

					const calculateHours = application.app.helpers.calculateHours

					var morning = null
					var afternoon = null

					if (typeof morningInit == 'string' && typeof morningEnd == 'string') {
						var morning = calculateHours(queryTime, morningInit, morningEnd)
					}

					if (typeof afternoonInit == 'string' && typeof afternoonEnd == 'string') {
						var afternoon = calculateHours(queryTime, afternoonInit, afternoonEnd)
					}

					var response = {
						morning: morning,
						afternoon: afternoon,
						queryTime: queryTime
					}

					resolve(response)

				}
			})
    })

    Promise.all([getSchedulings, getThisDay])
			.then(([schedulings, dayConfigs]) => {
				const schedulingHours = application.app.helpers.getSchedulingHours(schedulings)
				const testBusyTime = (_time) => {
					return application.app.helpers.isItBusyTime(_time, schedulingHours)
				}

				res.render('core/change-date.ejs', {
					employeeId: employeeId,
					morning: dayConfigs.morning,
					afternoon: dayConfigs.afternoon,
					currentDate: jsDate,
					validDate: application.app.helpers.validDateTime(jsDate),
					isItBusyTime: testBusyTime,
					portuguesedateTime: application.app.helpers.portugueseDateTime,
          colors: req.session.colors[0]
				})

			})
			.catch(err => {
				res.json(err)
			})
			.then(() => {
				connect.end()
			})

}

module.exports.schedule2 = (req, res, application) => {
	var data = req.query
	const jsDate = new Date(`${data._date} ${data._time}`)
	const sqlDateTime = application.app.helpers.createSQLDateTime(jsDate)

	const employeeId = req.query.employeeId
	const Employee = application.app.models.Employee
	const connect = application.config.connect()

	Employee.getThis(employeeId, connect, (err, result) => {
		if (err) {
			console.error(err.sqlMessage)
			res.redirect('/')
		} else {
			res.render('core/formScheduling.ejs', {
				jsDate: jsDate,
				employee: result[0],
				sqlDateTime: sqlDateTime,
				portugueseDateTime: application.app.helpers.portugueseDateTime,
        colors: req.session.colors[0]
			})
		}
	})
}

module.exports.confirmScheduling = (req, res, application) => {

	const data = req.body
	const Scheduling = application.app.models.Scheduling
	connect = application.config.connect()

	Scheduling.save(data, connect, (err, result) => {
		if (err) {
			res.render('core/error.ejs', {error: err})
		} else {
			var msg = `Agendamento realizado com sucesso!`
			res.render('core/confirm-scheduling.ejs', {
				message: msg
			})
		}
	})

}

module.exports.testSchedule = (req, res, application) => {

	const User = application.app.models.User
	const connect = application.config.connect()

	User.getAllUsers(connect, (err, result) => {
		if (err) res.send(err)
		else {
			res.render('core/test-schedule.ejs', {
				users: result
			})
		}
	})

}

module.exports.mySchedulings = (req, res, application) => {
  const Scheduling = application.app.models.Scheduling
  connect = application.config.connect()
  Scheduling.getMySchedulings(req.body.clientEmail, connect, (err, result) => {
    if (err) res.json(err)
    else {
      res.render('core/my-schedulings.ejs', {
        mySchedulings: result,
        colors: req.session.colors[0]
      })
    }
  })
}

module.exports.cancelScheduling = (req, res, application) => {
    const schedulingId = req.body.schedulingId
    const websiteUser = req.body.websiteUser
    const Scheduling = application.app.models.Scheduling
    const connect = application.config.connect()

    Scheduling.cancelSchuduling(schedulingId, connect, (err, result) => {
        if (err) {
            console.json(err)
        } else {
            res.render('core/it-is-canceled.ejs', {
                websiteUser: websiteUser
            })
        }
    })
}

module.exports.clientMessage = (req, res, application) => {
    const data = req.body
    const Core = application.app.models.Core
    const connect = application.config.connect()

    Core.saveMessage(data, connect, (err, result) => {
        if (err) {
            res.render('core/error.ejs', {
                error: err.sqlMessage
            })
        } else {
            let message = "Mensagem enviada com sucesso. Obrigado!"
            res.render('core/success.ejs', {
                message: message
            })
        }
    })

}

module.exports.clientMessageWApp = (req, res, application) => {
    if (req.method == 'GET') {
        res.render('core/client-message-wapp.ejs')
    } else {
        let phone = '5585999473839'
        let message = req.body.message
        let link = application.app.helpers.getWhatsappLink(phone, message)
        res.redirect(link)
    }
}
