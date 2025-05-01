import webpush from 'web-push'

export const handler = async (event) =>
{
	// set Command
	const Command = JSON.parse(event['body']);
	
	// set webpush
	webpush.setVapidDetails('mailto:' + Command['Email'], Command['PublicKey'], Command['PrivateKey']);

	// send
	const PushSubscription = JSON.parse(Command['PushSubscription']);
	const Payload = JSON.stringify({title:Command['Title'], body:Command['Body']});

	let Result = {};
	try {await webpush.sendNotification(PushSubscription, Payload); Result['statusCode'] = 201; Result['body'] = 'OK!';}
	catch(Error) {Result['statusCode'] = 400; Result['body'] = Error.message;}

	return Result;
};
