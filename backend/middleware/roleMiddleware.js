const verifyUserRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const rolesArray = [...allowedRoles];
    // check if user is logged in
    if (!req?.user.userid) {
      res.status(401);
      throw new Error(`Unauthorized Access ${req.user}`);
    }
    //  check if logged in user has access to view this route
    const role = req.user.userRole.split(',');
    console.log(req.user.userRole);
    const result = req.user.userRole
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) {
      throw new Error('Access denied!!!');
    }
    next();
  };
};

module.exports = {
  verifyUserRoles,
};
