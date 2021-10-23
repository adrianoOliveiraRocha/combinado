module.exports.home = (req, res, application) => {
  var message = req.session.message
  req.session.message = undefined
  var error = req.session.error
  req.session.error = undefined
	const connect = application.config.connect()

	async function getMessages() {
		const Message = application.app.models.Message	

		return new Promise((resolve, reject) => {
			Message.getAll(connect, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	}

	getMessages()
		.then(result => {
			res.render('user/admin/index.ejs', {
				user: req.session.user,
				message: message,
				error: error,
				messages: result // email from users
			})
		})
		.catch(err => {
			res.json(err)
		}) 
		.finally(() => {
			connect.end()
		}) 
		
}

module.exports.deleteOldSchedulings = () => {
  const User = application.app.models.User
  const connect = application.config.connect()

  User.deleteOldSchedulings(connect, (err, result) => {
    // The system delete shcedulings that has more then 6 months old
    connect.end()
    if (err) res.json(err.sqlMessage)
    else {
      res.render('user/admin/index.ejs', {
          user: req.session.user,
      })
    }
  })
}

module.exports.notifications = (req, res, application) => {
  res.json('notifications ok')
}

module.exports.showUsers = (req, res, application) => {
  const User = application.app.models.User
	const Message = application.app.models.Message
  const connect = application.config.connect()

	const getMessages = new Promise((resolve, reject) => {
		Message.getAll(connect, (err, result) => {
			err ? reject(err) : resolve(result)
		})
	})

	const getUsers = new Promise((resolve, reject) => {
		User.showUsers(connect, (err, result) => {
			err ? reject(err) : resolve(result)			
		})
	})

  Promise.all([getMessages, getUsers])
		.then(([messages, users]) => {
			res.render('user/admin/show-users.ejs', {
				user: req.session.user,
				users: users,
				messages: messages
			})
		})
		.catch(err => {
			console.log(typeof err)
			res.json(err.toString())
		})
		.finally(() => {
			connect.end()
		})

}

module.exports.userDetails = (req, res, application) => {
    const userId = req.query.userId
    const User = application.app.models.User
		const Message = application.app.models.Message
    const connect = application.config.connect()

		const getMessages = new Promise((resolve, reject) => {
			Message.getAll(connect, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})

		const getThisUser = new Promise((resolve, reject) => {
			User.getThis(userId, connect, (err, result) => {
				err ? reject(err) : resolve(result[0])
			})
		})

    Promise.all([getMessages, getThisUser])
			.then(([messages, currentUser]) => {				
				res.render('user/admin/user-details.ejs', {
					user: req.session.user,
					myUser: currentUser,
					messages: messages,
					pwd: application.app.helpers.SecurityPassword.decrypt(currentUser.pwd)
				})
			})
			.catch(err => {
				console.log(err)
				req.session.error = "It isn't possible get user's informations"
				res.redirect('/admin')
			})
			.finally(() => {
				connect.end()
			})

}

module.exports.createNotyfication = (req, res, application) => {

    if (req.method == 'GET') {
        res.render('user/admin/notification-form.ejs', {
					user: req.session.user,
					idToNotify: req.query.idToNotify
        })
    } else {
			var data = req.body
			const User = application.app.models.User
			const connect = application.config.connect()

			User.createNotification(data, connect, (err, result) => {
				connect.end()
				if (err) throw new Error(err)
				else {
					req.session.message = 'The user was notyfield'
					res.redirect('/admin')
				}
			})
    }
}

module.exports.showNotifications = function(req, res, application) {
	userId = req.query.userId
	const connect = application.config.connect()
	const User = application.app.models.User

	User.getNotification(userId, connect, function(err, result) {
		connect.end()
		if (err) throw new Error(err)
		else {
			res.render('user/admin/show-notifications.ejs', {
					user: req.session.user,
					notifications: result
			})
		}
	})

}

module.exports.deleteNotification = function(req, res, application) {
	var notificationId = req.query.notificationId
	const connect = application.config.connect()

	const User = application.app.models.User
	User.deleteNotification(notificationId, connect, (err, result) => {
		connect.end()
		if (err) throw new Error(err)
		else {
			req.session.message = 'This message was deleted!'
			res.redirect('/admin')
		}
	})
}

module.exports.inTrialPeriod = function(req, res, application) {
	const User = application.app.models.User
	const connect = application.config.connect()

	User.inTrialPeriod(connect, function(err, result) {
		if (err) res.json({
			error: err
		})
		else {
			res.render('user/admin/in-trial-period.ejs', {
					user: req.session.user,
					users: result,
					decrypt: application.app.helpers.SecurityPassword.decrypt
			})
		}
	})
}

module.exports.itIsRegular = function(req, res, application) {
	const userId = req.query.userId
	const User = application.app.models.User
	const connect = application.config.connect()

	User.itIsRegular(userId, connect, (err, result) => {
		connect.end()
		if (err) throw new Error(err)
		else {
			req.session.message = 'The status of this user was updated'
			res.redirect('/admin')
		}
	})

}

module.exports.block = function(req, res, application) {
	const User = application.app.models.User
	const connect = application.config.connect()
	User.block(req.query, connect, (err, result) => {
		connect.end()
		if (err) res.json(err)
		else {
			req.session.message = 'This user was blocked'
			res.redirect('/admin')
		}
	})

}

module.exports.unblock = function(req, res, application) {
	const User = application.app.models.User
	const connect = application.config.connect()
	User.unblock(req.query, connect, (err, result) => {
		connect.end()
		if (err) res.json(err)
		else {
			req.session.message = 'This user was blocked'
			res.redirect('/admin')
		}
	})
}

module.exports.sendPaymentOrder = (req, res, application) => {

	if (req.method == 'GET') {
		const Message = application.app.models.Message
		const connect = application.config.connect()

		Message.getAll(connect, (err, result) => {
			connect.end()
			if(err) res.json({error: err.sqlMessage})
			else {
					res.render('user/admin/form-payment-request.ejs', {
					user: req.session.user,
					userId: req.query.userId,
					messages: result
				})
			}
		})

		
	} else {
		const PaymentRequest = application.app.models.PaymentRequest
		const connect = application.config.connect()

		PaymentRequest.save(req.body, connect, (error, result) => {
			connect.end()
			if (error) res.json(error)
			else {
					req.session.message = "Saved"
					res.redirect('/admin')
			}
		})

	}
}

module.exports.getAllPaymentRequests = (req, res, application) => {
	const PaymentRequest = application.app.models.PaymentRequest
	const User = application.app.models.User
	const Message = application.app.models.Message
	const connect = application.config.connect()

	const getMessages = new Promise((resolve, reject) => {
		Message.getAll(connect, (err, result) => {
			err ? reject(err) : resolve(result)
		})
	})

	const allPaymentRequests = new Promise((resolve, reject) => {
		PaymentRequest.getAll(connect, (error, result) => {
			error ? reject(error) : resolve(result)
		})
	})


	const getUsers = new Promise((resolve, reject) => {
		User.getNamesAndIds(connect, (error, result) => {
			error ? reject(error) : resolve(result)
		})
	})


	Promise.all([allPaymentRequests, getUsers, getMessages])
		.then(([paymentsRequests, users, messages]) => {
				paymentsRequests.forEach(pr => {
					users.forEach(user => {
							if (pr.userId == user.id) {
									pr.userName = user.username
							}
					})
				})
				res.render('user/admin/show-payments-requests.ejs', {
					messages: messages,
					user: req.session.user,
					paymentsRequests: paymentsRequests
				})
		})
		.catch(error => {
			res.json({
					error: error
			})
		})
		.then(() => {
			connect.end()
		})

}

module.exports.paymentRequestDetails = function(req, res, application) {
	const Message = application.app.models.Message
	const connect = application.config.connect()

	Message.getAll(connect, (err, result) => {
		connect.end()
		if(err) res.json({error: err.sqlMessage})
		else {
			res.render('user/admin/payment-request-details.ejs', {
				user: req.session.user,
				data: req.body,
				messages: result
			})
		}
	})
	
}

module.exports.deletePaymentRequest = (req, res, application) => {
	const requestPaymentId = req.body.paymentRequestId
	const PaymentRequest = application.app.models.PaymentRequest
	const connect = application.config.connect()

	PaymentRequest.delete(requestPaymentId, connect, (error, result) => {
		if (error) {
			req.session.error = error.sqlMessage
			res.redirect('/admin')
		} else {
			req.session.message = result
			res.redirect('/admin')
		}
	})

}

module.exports.showMessage = (req, res, application) => {
	const User = application.app.models.Message
	const connect = application.config.connect()
	User.getAll(connect, (err, result) => {
		if(err) {
			req.session.error = err.sqlMessage
			res.redirect('./admin')
		} else {
			res.render('user/admin/show-messages.ejs', {
				user: req.session.user,
				messages: result
			})
		}
	})	
}

module.exports.messageDatail = (req, res, application) => {
	const Message = application.app.models.Message
	const connect = application.config.connect()
	const messageId = req.query.messageId

	const getMessages = new Promise((resolve, reject) => {
		Message.getAll(connect, (err, result) => {
			err ? reject(err) : resolve(result)
		})
	})

	const getMessage = new Promise((resolve, reject) => {
		Message.getMessage(connect, messageId, (err, result) => {
			err ? reject(err) : resolve(result[0])
		})
	})

	Promise.all([getMessages, getMessage])
		.then(([messages, message]) => {
			// res.json({ messages, message })

			res.render('user/admin/message-datails.ejs', {
				user: req.session.user,
				message: message,
				messages: messages
			})

		})
		.catch(err => {
			res.json({err})
		})
		.finally(() => {
			connect.end()
		})

}

module.exports.deleteMessage = (req, res, application) => {
	const Message = application.app.models.Message
	const connect = application.config.connect()
	const messageId = req.query.messageId
	Message.delete(connect, messageId, (err, result) => {
		connect.end()
		if(err) res.json({ error: err.sqlMessage })
		else res.redirect('/admin')	
	})
}
