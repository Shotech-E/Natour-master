const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {

    // Get tour data from the collection
    const tours = await Tour.find();

    // Build Template


    // Render that template using tour data from data from collection
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
});

exports.getTour = catchAsync(async (req, res) => {

    // Get the data for the requested tour (including review)
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
    })

    // Build Template


    // Render template using data from the requested data
    res.status(200).render('tour', {
        title: `${tour.name} Tour`,
        tour
    });
});


exports.getLoginForm = (req, res) => {
    res.status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://unpkg.com/axios@1.6.8/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';",
    ).set(
      'Content-Security-Policy',
      "script-src 'self' https://api.mapbox.js 'unsafe-inline' 'unsafe-eval';",
    )
    .render('login', {
        title: 'Log in to your account'
    });
}