/**
 * Role-Based Access Control
 * Usage: authorizeRoles('admin', 'creator')
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user?.role || 'None'}) is not authorized to access this resource.`
      });
    }
    next();
  };
};
