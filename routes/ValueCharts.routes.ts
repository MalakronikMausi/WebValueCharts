/*
* @Author: aaronpmishkin
* @Date:   2016-07-26 14:49:33
* @Last Modified by:   aaronpmishkin
* @Last Modified time: 2016-07-29 16:54:27
*/

// Import the express typings:
import * as Express from 'express';
import * as MongoDB from 'mongodb';
import * as Monk from 'monk';

var path = require('path');
var express = require('express');
var router: Express.Router = express.Router();
var hostEventEmitter = require('../utilities/HostEventEmitters');


router.post('/', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');

	groupVcCollection.insert(req.body, function(err: Error, doc: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });

		} else {
			if (doc) {
				res.location('/ValueCharts/' + doc._id)
					.status(201)
					.json({ data: JSON.stringify(doc) });
			} else {
				res.sendStatus(404);				
			}
		}
	});
});

router.get('/:chart', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');
	var chartId: string = req.params.chart;
	
	var password: string = req.query.password;

	groupVcCollection.findOne({ _id: chartId, password: password }, function(err: Error, doc: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });

		} else {
			if (doc) {
				res.location('/ValueCharts/' + chartId)
					.status(200)
					.json({ data: JSON.stringify(doc) });
			} else {
				res.sendStatus(404)
			}
		}
	});
});

router.put('/:chart', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');
	var chartId: string = req.params.chart;

	groupVcCollection.update({ _id: chartId }, (req.body), [] ,function(err: Error, doc: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });

		} else {
			if (doc) {
				req.body._id = chartId;
				res.location('/ValueCharts/' + chartId)
					.status(200)
					.json({ data: JSON.stringify(req.body) });
			} else {
				res.sendStatus(404);
			}
		}
	});
});

router.delete('/:chart', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');
	var chartId: string = req.params.chart;

	(<any> groupVcCollection).findOneAndDelete({ _id: chartId }, function(err: Error, doc: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });
		} else {		
			if (doc._id) {
				res.sendStatus(200);
			} else {
				res.sendStatus(404);
			}
		}
	});
});

router.get('/:chart/structure', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');
	var chartId: string = req.params.chart;

	var password: string = req.query.password;


	groupVcCollection.findOne({ _id: chartId, password: password }, function(err: Error, doc: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });

		} else {
			if (doc) {
				// Remove the users from the ValueChart so that it only contains the objectives and alternatives
				doc.users = undefined;
				res.location('/ValueCharts/' + chartId + '/structure')
					.status(200)
					.json({ data: JSON.stringify(doc) });
			} else {
				return res.sendStatus(404);
			}
		}
	});
});

router.put('/:chart/structure', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');
	var chartId: string = req.params.chart;

	groupVcCollection.findOne({ _id: chartId }, function (err: Error, foundDocument: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });
		} else {
			if (foundDocument) {
			// Attach the users to the structure object.
				req.body.users = foundDocument.users;

				groupVcCollection.update({ _id: chartId }, (req.body), [], function(err: Error, doc: any) {
					if (err) {
						res.status(400)
							.json({ data: JSON.stringify(err) });

					} else {
						// Remove the users from the ValueChart so that it only contains the objectives and alternatives
						req.body.users = undefined;
						req.body._id = foundDocument._id;

						res.location('/ValueCharts/' + chartId + '/structure')
							.status(200)
							.json({ data: JSON.stringify(req.body) });
					}
				});
			} else {
				res.sendStatus(404);
			}
		}
	});
});

router.post('/:chart/users', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');
	var chartId: string = req.params.chart;

	groupVcCollection.findOne({ _id: chartId }, function (err: Error, doc: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });
		} else {
			if (doc) {
				doc.users.push(req.body);

				groupVcCollection.update({ _id: chartId }, (doc), [], function(err: Error, doc: any) {
					if (err) {
						res.status(400)
							.json({ data: JSON.stringify(err) });

					} else {
						res.location('/ValueCharts/' + chartId + '/users' + req.body.username)
							.status(201)
							.json({ data: JSON.stringify(req.body) });
					}
				});
			} else {
				res.sendStatus(404);
			}
		}
	});
});

router.get('/:chart/users/:username', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');
	var chartId: string = req.params.chart;
	var username: string = req.params.username;

	groupVcCollection.findOne({ _id: chartId }, function (err: Error, doc: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });
		} else {
			if (doc) {
		
				var user = doc.users.find((user: any) => {
					return user.username === username;
				});

				if (!user) {
					res.sendStatus(404);
					return;
				}

				res.location('/ValueCharts/' + chartId + '/users' + user.username)
							.status(200)
							.json({ data: JSON.stringify(user) });

			} else {
				res.sendStatus(404);
			}
		}
	});
});

router.put('/:chart/users/:username', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');
	var chartId: string = req.params.chart;
	var username: string = req.params.username;

	groupVcCollection.findOne({ _id: chartId }, function (err: Error, doc: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });
		} else {
			if (doc) {
				var userIndex: number = doc.users.findIndex((user: any) => {
					return user.username === username;
				});

				if (userIndex === -1) {
					doc.users.push(req.body);
				} else {
					doc.users.splice(userIndex, 1, req.body);
				}


				groupVcCollection.update({ _id: chartId }, (doc), [], function(err: Error, doc: any) {
					if (err) {
						res.status(400)
							.json({ data: JSON.stringify(err) });

					} else {
						res.location('/ValueCharts/' + chartId + '/users' + req.body.username)
							.status(200)
							.json({ data: JSON.stringify(req.body) });
					}
				});
			} else {
				res.sendStatus(404);
			}
		}
	});
});

router.delete('/:chart/users/:username', function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	var groupVcCollection: Monk.Collection = (<any> req).db.get('GroupValueCharts');
	var chartId: string = req.params.chart;
	var username: string = req.params.username;

	groupVcCollection.findOne({ _id: chartId }, function (err: Error, doc: any) {
		if (err) {
			res.status(400)
				.json({ data: JSON.stringify(err) });
		} else {
			if (doc) {
		
				var userIndex: number = doc.users.findIndex((user: any) => {
					return user.username === username;
				});

				if (userIndex === -1) {
					res.sendStatus(404);
					return;
				}

				doc.users.splice(userIndex, 1);

				groupVcCollection.update({ _id: chartId }, (doc), [], function(err: Error, doc: any) {
					if (err) {
						res.status(400)
							.json({ data: JSON.stringify(err) });

					} else {
						res.sendStatus(200);
					}
				});
			} else {
				res.sendStatus(404);
			}
		}
	});
});

module.exports = router;
