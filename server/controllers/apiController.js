const apiController = {};
apiController.retrieveData = async (req, res, next) => {
  try {
    console.log('Trying to retrieve data');
    const { category } = req.params;
    const numberObj = {
      Sports: 21,
      Computers: 18,
      Mathematics: 19,
      Music: 12,
      Games: 15,
      Television: 14,
    };

    const url = `https://opentdb.com/api.php?amount=3&category=${numberObj[category]}&difficulty=easy&type=multiple`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('this is the result array' + data.results);
        res.locals.result = data.results;
        return next();
      });
  } catch (err) {
    return next({
      log: 'An error occured in in apiController on retrieveData middleware function',
      status: 400,
      message: { err: 'Data retrieval was not successful' },
    });
  }
};

module.exports = apiController;
