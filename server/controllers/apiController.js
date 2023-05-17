

const apiController = {};
apiController.retrieveData = async (req, res, next) => {
  try {
    console.log('Trying to retrieve data');
    const { category } = req.params;
    let number;
    if (category === 'Sports') {
      number = 21;
    } else if (category === 'Computers') {
      number = 18;
    } else if (category === 'Mathematics') {
      number = 19;
    }
    const url = `https://opentdb.com/api.php?amount=10&category=${number}&difficulty=medium&type=multiple`;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
      console.log('this is the result array' + data.results);
      res.locals.result = data.results;
      return next();
    })

  } catch (err) {
    return next({
      log: 'An error occured in in apiController on retrieveData middleware function',
      status: 400,
      message: { err: 'Data retrieval was not successful' },
    });
  }
};

module.exports = apiController;
