module.exports.home = (req, res, application) => {
	var message = req.session.message
	req.session.message = ''
	var error = req.session.error
	req.session.error = ''
	const connect = application.config.connect()

	if (req.session.user.blocked === 1) {

		User.getNotification(req.session.user.id, connect, (err, result) => {
			connect.end()
			if (err) res.json(err)
			else {
				res.render('user/blocked.ejs', {
					user: req.session.user,
					notifications: result
				})
			}
		})

	} else {
		const PaymentRequest = application.app.models.PaymentRequest
		PaymentRequest.getForThisUser(req.session.user.id, connect, (err, paymentRequests) => {
			if (err) {
				res.render('user/error.ejs', {
					user: req.session.user,
					error: err
				})
			} else {
				res.render('user/index.ejs', {
					user: req.session.user,
					paymentRequests,
					message: message,
					error: error
				})

			}
		})
	}

}

module.exports.logout = (req, res, application) => {
	req.session.destroy()
	res.redirect('/')
}

module.exports.profile = (req, res, application) => {
	if (req.session.user.admin == 0) {
		res.render('user/profile.ejs', {
			user: req.session.user
		})
	} else {
		const Message = application.app.models.Message
		const connect = application.config.connect()

		Message.getAll(connect, (err, result) => {
			connect.end()
			if(err) res.json({err: error.sqlMessage})
			else {
				res.render('user/admin/profile.ejs', {
				user: req.session.user,
				messages: result
			})
			}
		})

	}
}

module.exports.editProfile = (req, res, application) => {

	const User = application.app.models.User
	const connect = application.config.connect()
	var data = req.body
	const userId = data.id
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

	function updateUser() {

		return new Promise((resolve, reject) => {
			data.encryptPwd = SecurityPassword.encrypt(data.pwd)
			User.update(data, imageName, connect, (errUpd, resultUpd) => {
				if (errUpd) {
					reject(errUpd)
				} else {
					resolve(resultUpd)
				}
			})
		})

	}

	updateUser().then(resultUpd => { // get the updated user

		return new Promise((resolve, reject) => {
			User.getThis(userId, connect, (errUser, resultUser) => {
				if (errUser) {
					reject(errUser)
				} else {
					resolve(resultUser[0])
				}
			})
		})

	}).then(user => { // does update the session

		req.session.user = user // update the user in the session
		req.session.user.pwdDecrypted = SecurityPassword.decrypt(user.pwd)
		
		if (user.admin == 0) {
			res.render('user/advise.ejs', {
				advise: "Informações atualizadas com sucesso!",
				type: 'success'
			})
		}
		else res.redirect('/admin')

	}).catch(err => {
		console.error(err.sqlMessage)
		let errorMessage = err.sqlMessage
		res.render('user/error-ajax.ejs', {
			user: req.session.user,
			error: errorMessage
		})
	}).then(() => {
		connect.end()
	})

}

module.exports.cancel = (req, res, application) => {
	res.render('user/advise.ejs', {
		advise: "Operação cancelada!",
		type: "warning"
	})
}

module.exports.newEmployee = (req, res, application) => {
	const connect = application.config.connect()
	const Service = application.app.models.Service
	const Employee = application.app.models.Employee
	if (req.method == 'GET') {

		Service.getAll(req.session.user.id, connect, (errService, resultService) => {
			if (errService) {
				let errorMessage = "Não foi possível recuperar os serviços"
				res.render('user/error-ajax.ejs', {
						user: req.session.user,
						error: errorMessage
				})
			} else {
				res.render('user/new-employee.ejs', {
					user: req.session.user,
					services: resultService
				})
			}
		})

	} else { // POST

		function saveEmployee() {
			return new Promise((resolve, reject) => {
				const SecurityPassword = application.app.helpers.SecurityPassword
				var data = req.body
				data.userid = req.session.user.id
				data.pwd = SecurityPassword.encrypt(data.pwd)
				Employee.save(data, connect, (errEmpl, result) => {
					if (errEmpl) {
						reject(errEmpl.sqlMessage)
					} else {
						resolve(result)
					}
				})
			})
		}

		async function saveEmployeeDays() {
			let resultSaveEmployee = await saveEmployee()
			const employeeId = resultSaveEmployee.insertId
			return new Promise((resolve, reject) => {
				Employee.saveEmployeeDays(employeeId, connect, (err, result) => {
					if (err) reject(err.sqlMessage)
					else {
						resolve(employeeId)
					}
				})
			})
		}

		async function saveES() {
			const employeeId = await saveEmployeeDays()
			const userId = req.session.user.id
			const services = req.body.service

			return new Promise((resolve, reject) => {

					if (services === undefined) {
						resolve(true)
					} else {
						Service.saveES(employeeId, userId, services, connect, (errES, resultES) => {
							if (errES) {
								reject(errES.sqlMessage)
							} else {
								resolve(resultES)
							}
						})
					}

			})

		}

		saveES().then(resultES => {
			res.render('user/advise.ejs', {
				advise: "Os dados do colaborador foram salvos com sucesso!",
				type: "success"
			})
		}).catch(err => {
			let error = err.sqlMessage ? err.sqlMessage : err
			res.render('user/error-ajax.ejs', {
				user: req.session.user,
				error: error
			})
		}).then(() => {
			connect.end()
		})

	}
}

module.exports.showEmployees = (req, res, application) => {
	const User = application.app.models.User
	const connect = application.config.connect()

	User.getAll(req.session.user.id, connect, (error, result) => {
		connect.end()
		if (error) {
			console.error(error.sqlMessage)
			let errorMessage = "Não foi possível recuperar as informações dos colaboradores"
			res.render('user/error.ejs', {
					user: req.session.user,
					error: errorMessage
			})
		} else {
			res.render('user/show-employees.ejs', {
				user: req.session.user,
				employees: result
			})
		}
	})

}

module.exports.employeeDetail = (req, res, application) => {
	let employeeData = req.body;
	res.render('user/employee-detail.ejs', {employeeData})
}

module.exports.sendLoginPass = (req, res, application) => {

	if (req.method == "GET") {

		const employeeId = req.query.id
		const Employee = application.app.models.Employee
		const connect = application.config.connect()

		Employee.getCredentials(employeeId, connect, (error, result) => {
			if (error) {
				console.error(error.sqlMessage)
				let errorMessage = "Não foi possível recuperar as credenciais do colaborador"
				res.render('user/error.ejs', {
						user: req.session.user,
						error: errorMessage
				})
			} else {

				res.render('user/form-send-login-pass.ejs', {
					user: req.session.user,
					data: {
						pwd: application.app.helpers.SecurityPassword.decrypt(result[0].pwd),
						phone: result[0].phone,
						email: result[0].email,
						name: result[0].name
					}
				})

			}
		})
	} else {
		let data = req.body
		let number = "55" + data.phone.replace("(", "").replace(")", "")
		let msg = `Olá ${data.name}! Seu login é ${data.email} e sua senha é ${data.pwd}`
		const link = application.app.helpers.getWhatsappLink(number, msg)
		res.redirect(link)
	}

}

module.exports.newService = (req, res, application) => {
	var message = req.session.message
	req.session.message = ''
	if (req.method == 'GET') {
		res.render('user/new-service.ejs', {
			user: req.session.user,
			message: message
		})
	} else {
		const Service = application.app.models.Service
		const connect = application.config.connect()
		var data = req.body
		data.userid = req.session.user.id
		Service.save(data, connect, (err, result) => {
			connect.end()
			if (err) {
				console.error(err.sqlMessage)
				let errorMessage = "Não foi possível registrar o serviço"
				res.render('user/error-ajax.ejs', {
					user: req.session.user,
					error: errorMessage
				})
			} else {
				res.render('user/advise.ejs', {
					type: 'success',
					advise: "Serviço registrado com sucesso!"
				})
			}
		})
	}
}

module.exports.showServices = (req, res, application) => {
	const Service = application.app.models.Service
	const connect = application.config.connect()

	Service.getAll(req.session.user.id, connect, (err, result) => {
		if (err) {
			console.error(err.sqlMessage)
			let errorMessage = "Não foi possível recuperar os serviços"
			res.render('user/error-ajax.ejs', {
				user: req.session.user,
				error: errorMessage
			})
		} else {
			res.render('user/show-services.ejs', {
				user: req.session.user,
				services: result
			})
		}
	})

}

module.exports.serviceDetail = (req, res) => {
	let service = req.query;
	res.render('user/service-detail.ejs', { service });
}

module.exports.editService = (req, res, application) => {
	var data = req.body;
	const Service = application.app.models.Service
	const connect = application.config.connect()
	Service.edit(data, connect, (err, result) => {
		connect.end();
		if (err) {
			let errorMessage = "Não foi possível editar as informações desse serviço: " + err;
			res.render('user/error-ajax.ejs', {
				error: errorMessage
			})
		} else {
			res.render('user/advise', {
				type: "success", 
				advise: "Atualizado com sucesso!" 
			})
		}
	})
}

module.exports.deleteService = (req, res, application) => {
	const serviceId = req.query.serviceId
	const Service = application.app.models.Service
	const connect = application.config.connect()

	Service.delete(serviceId, connect, (err, result) => {
		if (err) {
			console.error(err.sqlMessage)
			if (err.errno == 1451) {
				let errorMessage = `Você não pode deletar esse serviço porque
				pelo menos um de seus colaboradores presta esse tipo de serviço`
				res.render('user/error.ejs', {
					user: req.session.user,
					error: errorMessage
				})
			} else {
				let errorMessage = "Problema tentando deletar o serviço: " + err.sqlMessage
				res.render('user/error.ejs', {
					user: req.session.user,
					error: errorMessage
				})
			}

		} else {
			res.redirect('/show-services')
		}
	})
}

module.exports.deleteEmployee = (req, res, application) => {
	const Employee = application.app.models.Employee

	const connect = application.config.connect()
	let employeeId = req.query.employeeId;
	let image = req.query.image; 
	
	async function deleteEmployee() {
		// delete image
		if (image.length > 0) {
			const DeleteImage = application.app.helpers.DeleteImage
			DeleteImage('admin/images/profile_images', image)
		}

		return new Promise((resolve, reject) => {
			Employee.deleteEmployee(employeeId, connect, (err, result) => {
				if (err) {
					reject(err.sqlMessage)
				} else {
					resolve(result)
				}
			})
		})

	}

	deleteEmployee().then(result => {
		connect.end()
		res.render('user/advise.ejs', {
			type: 'success', advise: "Colaborador deletado com sucesso!"
		})
	}).catch(err => {
		res.render('user/error-ajax.ejs', {
			user: req.session.user,
			error: err
		})
	})

}

module.exports.userAllSchedulings = (req, res, application) => {
	const userId = req.session.user.id
	const User = application.app.models.User
	const connect = application.config.connect()

	User.getAllSchedulings(userId, connect, (err, result) => {
		if (err) {
			console.error(err.sqlMessage)
			let errorMessage = 'Não foi possível recuperar as informações dos agendamentos'
			res.render('user/error-ajax.ejs', {
					user: req.session.user,
					error: errorMessage
			})
		} else {
				res.render('user/schedulings.ejs', {
					user: req.session.user,
					schedulings: result,
					isFuture: application.app.helpers.validDateTime,
					portugueseDateTime: application.app.helpers.portugueseDateTime,
					status: 'Todos'
				})
		}
	})

}

module.exports.userOldSchedulings = (req, res, application) => {
	const userId = req.session.user.id
	const User = application.app.models.User
	const connect = application.config.connect()

	User.getOldSchedulings(userId, connect, (err, result) => {
			if (err) {
				console.error(err.sqlMessage)
				let errorMessage = 'Não foi possível recuperar as informações dos agendamentos'
				res.render('user/error.ejs', {
						user: req.session.user,
						error: errorMessage
				})
			} else {
				res.render('user/schedulings.ejs', {
					user: req.session.user,
					schedulings: result,
					isFuture: application.app.helpers.validDateTime,
					portugueseDateTime: application.app.helpers.portugueseDateTime,
					status: 'Antigos'
				})
			}
	})

}

module.exports.userNewSchedulings = (req, res, application) => {
	const userId = req.session.user.id
	const User = application.app.models.User
	const connect = application.config.connect()

	User.getNewSchedulings(userId, connect, (err, result) => {
			connect.end()
			if (err) {
				console.error(err.sqlMessage)
				let errorMessage = 'Não foi possível recuperar as informações dos agendamentos'
				res.render('user/error.ejs', {
					user: req.session.user,
					error: errorMessage
				})
			} else {
				res.render('user/schedulings.ejs', {
					user: req.session.user,
					schedulings: result,
					isFuture: application.app.helpers.validDateTime,
					portugueseDateTime: application.app.helpers.portugueseDateTime,
					status: 'Novos'
				})
			}
	})

}

module.exports.showScheduling = (req, res, application) => {
	const schedulingId = req.query.schedulingId
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
			Scheduling.showSchedulingToUser(schedulingId, connect, (err, result) => {
				if (err) reject(err.sqlMessage)
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
		res.render('user/scheduling-detail.ejs', {
			user: req.session.user,
			scheduling: response.scheduling,
			isItCancellable: response.isItCancellable,
			portugueseDateTime: application.app.helpers.portugueseDateTime
		})

	}).catch(err => {
		console.error(err)
		let errorMessage = 'Não foi possível recuperar as informações desse agendamento'
		res.render('user/error-ajax.ejs', {
			user: req.session.user,
			error: errorMessage
		})
	})

}

module.exports.cancelScheduling = (req, res, application) => {
	const schedulingId = req.body.schedulingId
	const Scheduling = application.app.models.Scheduling
	const connect = application.config.connect()

	Scheduling.cancelSchuduling(schedulingId, connect, (err, result) => {
		if (err) {
			console.error(err.sqlMessage)
			let errorMessage = 'Não foi possível cancelar o agendamento'
			res.render('user/error.ejs', {
				user: req.session.user,
				error: errorMessage
			})
		} else {
			req.session.message = 'Agendamento cancelado com sucesso!'
			res.redirect('/user-home')
		}
	})

}

module.exports.canceledSchedulings = (req, res, application) => {
	const User = application.app.models.User
	const connect = application.config.connect()
	const userId = req.session.user.id

	User.getCanceledSchedulings(userId, connect, (err, result) => {
		if (err) {
			console.error(err.sqlMessage)
			let errorMessage = 'Não foi possível recuperar os agendamentos cancelados'
			res.render('user/error.ejs', {
					user: req.session.user,
					error: errorMessage
			})
		} else {
			res.render('user/schedulings.ejs', {
				user: req.session.user,
				schedulings: result,
				isFuture: application.app.helpers.validDateTime,
				status: 'Cancelados',
				portugueseDateTime: application.app.helpers.portugueseDateTime
			})
		}
	})

}

module.exports.notifications = (req, res, application) => {
	const Scheduling = application.app.models.Scheduling
	const connect = application.config.connect()
	let currentDate = application.app.helpers.createSQLDateTime(new Date())
	const userId = req.session.user.id
	Scheduling.getUserSchedulingNotifications(currentDate, userId, connect, (err, result) => {
		connect.end()
		if (err) {
			let errorMessage = err.sqlMessage
			res.render('user/error.ejs', {
				user: req.session.user,
				error: errorMessage
			})
		} else {
			var numberOfSchedulingNotifications = Object.keys(result).length
			res.render('user/notifications.ejs', {
				schedulingNotifications: result,
				numberOfSchedulingNotifications: numberOfSchedulingNotifications,
			})
		}
	})
}

module.exports.makeLink = (req, res, application) => {
	const domain = application.config.domain;
	var link = `${domain}/schedule?userId=${req.session.user.id}`
	res.render('user/my-link.ejs', {
		user: req.session.user,
		link: link
	})
}

module.exports.testLink = (req, res, application) => {
	const domain = application.config.domain
	var link = `${domain}/schedule?userId=${req.session.user.id}`
	res.render('user/test-link.ejs', {
		user: req.session.user,
		link: link
	})
}

module.exports.settings = (req, res, application) => {

	res.render('user/settings.ejs', {
		user: req.session.user,
	})

}

module.exports.updateSettings = (req, res, application) => {
	var data = req.body
	const User = application.app.models.User
	const connect = application.config.connect()

	User.updateSettings(req.session.user.id, data, connect, (err, result) => {
		connect.end()
		if (err) {
			console.error(err.sqlMessage)
			let errorMessage = 'Não foi possível alterar as configurações'
			res.render('user/error.ejs', {
				user: req.session.user,
				error: errorMessage
			})
		} else {
			req.session.message = 'Você alterou suas configurações com sucesso!'
			res.redirect('/user-home')
		}
	})

}

module.exports.billingAgremment = function(req, res, application) {
	var paypal = require('paypal-rest-sdk')
	const credentials = application.app.helpers.paypalCombinado
	paypal.configure({
		mode: 'sandbox',
		client_id: credentials.client_id,
		client_secret: credentials.client_secret
	})

	var billingPlan = credentials.billingPlan
	var billingAgreementAttributes
	var isoDate = new Date()

	isoDate.setSeconds(isoDate.getSeconds() + 4)
	isoDate.toISOString().slice(0, 19) + 'z'

	billingAgreementAttributes = {
		name: 'Standart Membershit',
		description: 'Combinado Club Standard Membership',
		start_date: isoDate,
		plan: {
			id: billingPlan
		},
		payer: {
			payment_method: 'paypal'
		}
	}

	var links = {}

	paypal.billingAgreement.create(billingAgreementAttributes, function(error, billingAgreement) {
		if (error) {
			console.error(JSON.stringify(error))
			let errorMessage = "Erro: " + JSON.stringify(error)
			res.render('user/error.ejs', {
				user: req.session.user,
				error: errorMessage
			})
		} else {
			// Capture HATEOAS links
			billingAgreement.links.forEach(linkObj => {
					links[linkObj.rel] = {
						href: linkObj.href,
						method: linkObj.method
					}
			})
				// If redirect url present, redirect user
			if (links.hasOwnProperty('approval_url')) {
				//REDIRECT USER TO links['approval_url'].href
				res.redirect(links['approval_url'].href)
			} else {
				res.send('No links receiveds')
			}
		}
	})

}

module.exports.processAgreement = function(req, res, application) {
	const token = req.query.token
	const userId = req.session.user.id
	const User = application.app.models.User
	const connect = application.config.connect()

	User.agreement(userId, token, connect, (err, result) => {
		if (err) {
			let errorMessage = "Erro: " + err.sqlMessage
			res.render('user/error.ejs', {
				user: req.session.user,
				error: errorMessage
			})
		} else {
			req.session.user.blocked = 0
			req.session.message = `Desbloqueado`
			res.redirect('/user-home')
		}
	})

}

module.exports.cancelAgreement = function(req, res, application) {
	res.render('user/blocked.ejs', {
		user: req.session.user,
		message: 'Operação cancelada!'
	})
}

module.exports.sendWhatsappMessageEmployee = (req, res, application) => {
	let number = '55' + req.query.employeePhone.replace('(', '').replace(')', '')
	let message = `Olá ${req.query.employeeName}! Você tem uma agendamento para ${req.query._dt}`
	let wappLink = application.app.helpers.getWhatsappLink(number, message)
	res.redirect(wappLink)
}

module.exports.sendWhatsappMessageClient = (req, res, application) => {
	let number = '55' + req.query.clientPhone.replace('(', '').replace(')', '')
	let message = `Olá ${req.query.clientEmail}! Obrigado pela preferencia. Você tem um agendamento para ${req.query._dt}. Até lá`
	let wappLink = application.app.helpers.getWhatsappLink(number, message)
	res.redirect(wappLink)
}

module.exports.employeeScheduling = (req, res, application) => {
	const employeeId = req.query.id;
	const Employee = application.app.models.Employee
	const connect = application.config.connect()
	Employee.getEmployeeScheduling(employeeId, connect, (err, result) => {
		if(err) {
			let errorMessage = "Erro: " + err.sqlMessage
			res.render('user/error-ajax.ejs', {
				error: errorMessage
			})
		} else {
			console.log(result);
			res.render('user/employee-scheduling.ejs', {
				schedulings: result,
				isFuture: application.app.helpers.validDateTime,
				portugueseDateTime: application.app.helpers.portugueseDateTime,
			})
		}
	})
}
