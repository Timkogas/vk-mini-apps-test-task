module.exports = {
  static_path: "build",
  app_id: Number(process.env.REACT_APP_APP_ID),
  endpoints: {
    mobile: "index.html",
    mvk: "index.html",
    web: "index.html"
  }
}