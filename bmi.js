const port = 3000

// Loading the dependencies.
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

try {
    // Getting the bmi html page.
    app.get('/', (req, res) => {
        res.render('bmi');
    });

    app.post('/', (req, res) => {
        // Get the variables from the form.
        let age = Number(req.body.age);
        let weight = Number(req.body.weight);
        let height = Number(req.body.height);

        // Calculate the BMI.
        let bmi = Math.round((weight / Math.pow((height / 100), 2)) * 100) / 100;
        res.render('bmi', {
            age: age,
            weight: weight,
            height: height,
            bmi: bmi
        });

        req.on('error', (error) => console.log(`Error Code: ${error.code}`));
    });

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404
        next(err)
    });

    app.use((err, req, res, next) => {
        res.render('error', { error: err });
    });

} catch (error) {
    console.error(`Error Message: ${error.message}`);
}
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});