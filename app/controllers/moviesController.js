const { extractObject, queryModel } = require( "../utilities" );
const mongoose = require( "mongoose" );

const Movie = mongoose.model( "Movie" );
exports.getMovie = ( req, res ) => {
    const movie = req.movie;
    if ( !movie ) {
        return res.notFound();
    }
    return res.success( extractObject(
        movie,
        [ "title", "description", "director", "categories",
            "cast", "rating", "releaseDate", "reviews", "picture" ],
    ) );
};

exports.getAllMovies = ( req, res ) => {
    const field = req.body.field;

    queryModel( res, Movie, field );
};

exports.getMoviesForUser = ( req, res ) => {
    const { id } = req.user;
    const queryCondition = { addedBy: id };

    queryModel( res, Movie, queryCondition );
};
