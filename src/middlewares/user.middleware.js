const User = require( '../dataBase/User' );
const CError = require( '../error/CustomError' );
const userValidator = require( '../validators/user.validator' );

module.exports = {
  isNewUserValid : ( req, res, next ) => {
    try {
      const { error, value } = userValidator.newUserValidator.validate(
        req.body
      );

      if ( error ) {
        throw new CError( error.details[0].message );
      }

      req.body = value;

      next();
    } catch ( e ) {
      next( e );
    }
  },

  isEmailRegistered : async ( req, res, next ) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne( { email } );

      if ( userByEmail ) {
        throw new CError( 'User with such email already registered', 409 );
      }

      next();
    } catch ( e ) {
      next( e );
    }
  },

  checkIsUserPresent : async ( req, res, next ) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne( { email } );

      if ( !userByEmail ) {
        throw new CError( 'User not found', 409 );
      }

      req.user = userByEmail;

      next();
    } catch ( e ) {
      next( e );
    }
  },
};
