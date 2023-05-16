const axios = require('axios');

const apiController = {};
apiController.retrieveData = async (req, res, next) => {
  try {
    console.log('Trying to retrieve data');
    const { subject } = req.body;
    let number;
    if (subject === 'sports') {
      number = 21;
    } else if (subject === 'computers') {
      number = 18;
    } else if (subject === 'Mathematics') {
      number = 19;
    }
    const url = `https://opentdb.com/api.php?amount=10&category=${number}&difficulty=medium&type=multiple`;
    const reponse = await axios.get(url);
    const data = response.data;

    console.log('data in apiController' + data);

    const result = data.result;
    res.locals.result = result;
    return next();
  } catch (err) {
    return next({
      log: 'An error occured in in apiController on retrieveData middleware function',
      status: 400,
      message: { err: 'Data retrieval was not successful' },
    });
  }
};

module.exports = apiController;
