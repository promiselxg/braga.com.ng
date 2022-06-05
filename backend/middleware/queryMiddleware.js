const { Op } = require('sequelize');
const queryFilter = (model) => async (req, res, next) => {
  try {
    let query;
    //  sort by specific fields
    const reqQuery = { ...req.query };
    //  sort based on given condition / create query string
    let queryStr = JSON.stringify(reqQuery);

    //  Finding Resource
    if (Object.keys(req.query).length === 0) {
      query = model.findAll({ order: [['updatedAt', 'DESC']] });
    } else {
      query = model.findAll({
        where: {
          [Op.and]: [JSON.parse(queryStr)],
          qty: {
            [Op.gte]: 1,
          },
        },
      });
    }
    const result = await query;
    if (!result) {
      res.status(404);
      throw new Error('No Record found');
    }
    //    send response back
    res.queryResults = {
      count: result.length,
      data: result,
    };

    next();
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Invalid Request',
    });
  }
};

module.exports = {
  queryFilter,
};
