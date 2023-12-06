export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'No tienes acceso' })
    } else {
      next()
    }
  }
}
