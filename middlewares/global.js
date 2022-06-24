import express from 'express';
import helmet from 'helmet';
// import compression from 'compression';

const app = express();
// const compressMiddleware = (req, res) => {
// 	if (req.headers['x-no-compression']) {
// 		return false;
// 	}
// 	return compression.filter(req, res);
// };
// app.use(compression({ filter: compressMiddleware }));
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

const globalMiddleware = app.all('*', (req, res, next) => {
	res.cookie('XSRF-TOKEN', req.csrfToken());

	const idToken = req.cookies.idToken || null;
	if (idToken) {
		const expiresIn = process.env.NODE_ENV === 'development' ? 1000 * 60 * 60 * 24 : Number(process.env.EXPIRES_COOKIE);
		res.cookie('idToken', idToken, { httpOnly: true, secure: true, expires: new Date(Date.now() + expiresIn) });
	}

	next();
});

export default globalMiddleware;
