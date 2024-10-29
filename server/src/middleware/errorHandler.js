export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: '输入验证失败',
      errors: err.errors
    });
  }

  res.status(500).json({
    message: process.env.NODE_ENV === 'production'
      ? '服务器内部错误'
      : err.message
  });
}