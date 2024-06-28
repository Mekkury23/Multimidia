module.exports = (...role) => (req, res, next) => {
  if (!role.includes(req.userData.role)) {
    return res.status(403).json({
      message: 'Permission denied'
    });
  } 
  next();
}