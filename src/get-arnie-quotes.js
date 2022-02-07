const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
	// put promises into array
	// keeps it DRY.
	const promises = [];
	urls.forEach((url) => {
		promises.push(httpGet(url));
	});

	// wait till all the promises have resolved
	const responses = await Promise.all(promises);

	const results = [];
	responses.forEach((response) => {
		if (response.status == 200) {
			// parse the request and place in object
			// Normally i'd prefer to have proper interface and undefined checks here too
			results.push({ "Arnie Quote": JSON.parse(response.body).message });
		} else {
			results.push({ FAILURE: JSON.parse(response.body).message });
		}
	});

	return results;
};

module.exports = {
	getArnieQuotes,
};
