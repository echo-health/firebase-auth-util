#!/usr/bin/env node

const fs = require('fs');
const commander = require('commander');
const fbAuth = require('./auth');
const chalk = require('chalk');

commander
	.option(
	'-c --credentials <credentials>',
	'Path to your Firebase credentials file',
	process.env.GOOGLE_APPLICATION_CREDENTIALS
	)
	.option('-u --url <databaseUrl>', 'URL of your Firebase database')
	.option('-j --json', 'Output in json')
	.option('-t --type <type>', 'Type can be either add, update or remove.')
	.option('-u --user <user>', 'The user object. Value must be in json format.')
	.parse(process.argv);

const { credentials, url, json, type, user } = commander;

try {
	if (!fs.statSync(credentials).isFile()) {
		throw new Error();
	}
} catch (e) {
	console.log(chalk.bold.red('You must provide valid Firebase credentials.'));
	console.log('');
	console.log(
		chalk.yellow(
			'This can be done by either setting the --credentials,-c option or by setting the GOOGLE_APPLICATION_CREDENTIALS environment variable.'
		)
	);
	console.log('');
	process.exit(1);
}

if (typeof fbAuth[type] !== 'function') {
	console.log(chalk.bold.red('Invalid action option.'));
	console.log('');
	console.log('Expected one of the following:');
	console.log(' - add');
	console.log(' - update');
	console.log(' - remove');
	console.log(' - get');
	console.log('');
	console.log(`But ${chalk.bold(type)} was provided.`);
	console.log('');
	process.exit(1);
}

let userObj = {}
try {
	userObj = JSON.parse(user);
} catch (e) {
	console.log(chalk.bold.red('Could not parse user data. (Is it valid JSON?'));
	console.log('');
	process.exit(1);
}

fbAuth[type](credentials, userObj)
	.then((result) => {
		const response = result? result : {success: true};

		if (json) {
			console.log(JSON.stringify(response));
		} else {
			console.log(response)
		}
		process.exit(0);
	})
	.catch((e) => {
		console.log(chalk.bold.red(e));
		console.log('');
		process.exit(1);
	});