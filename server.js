var fs       = require('fs');
var path     = require('path');
var express  = require('express');
var app      = express();
var webpack  = require('webpack');
var config   = require('./webpack.config');
var compiler = webpack(config);

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/foods.json', function(req, res) {
    fs.readFile('foods.json', function(err, data) {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });
});

app.post('/foods.json', function(req, res) {
    fs.readFile('foods.json', function(err, data) {
        var foods = JSON.parse(data);
        foods.push(req.body);
        fs.writeFile('foods.json', JSON.stringify(foods, null, 4), function(err) {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(foods);
        });
    });
});

app.listen(app.get('port'), function() {
    console.log('Foodbase running at localhost:' + app.get('port') + '/');
    var spawn = require('child_process').spawn
    spawn('open', ['http://localhost:' + app.get('port')]);
});
