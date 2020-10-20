const servestatic = require('serve-static')
const path = require('path')
const express = require('express')
const port = process.env.PORT || 8080
const app = express()

if(process.env.NODE_ENV === 'production'){
   app.use(servestatic(path.join(path.resolve(), 'dist')))
}
app.listen(port, () => {console.log("API server started on "+app.get('port'))})
