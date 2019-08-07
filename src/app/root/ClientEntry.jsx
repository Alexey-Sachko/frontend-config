import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from 'app_routes';


const ClientEntry = (props) => {
	return (
		<Router>
			{renderRoutes(routes)}
		</Router>
	);
};

export default ClientEntry;
