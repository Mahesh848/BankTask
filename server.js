const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname+'/dist/Bank'));

app.listen(process.env.PORT || 1848, () => {
  console.log('server listening on port 1848');
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/Bank/index.html'));
});




