const Joi = require( 'joi' );

const { emailValidator } = require( './share' );
const { PASSWORD_REGEX } = require( '../constants/constant' );

const userSubScheme = {
  name : Joi.string().alphanum().min( 2 ).max( 100 ).required(),
  age : Joi.number().integer().min( 1 ).max( 130 ),
};

const testArraySubSchema = Joi.object( {
  car : Joi.boolean(),
} );

module.exports = {
  newUserValidator : Joi.object( {
    ...userSubScheme,
    email : emailValidator.required(),
    password : Joi.string().regex( PASSWORD_REGEX ).required(),
  } ),

  updateUderValidator : Joi.object( userSubScheme ),

  testValid : Joi.object( {
    isAdult : Joi.boolean(),
    array : Joi.array()
      .items( testArraySubSchema )
      .when( 'isAdult', { is : true, then : Joi.required() } ),
  } ),

  // module.exports = {
  //   newUserValidator: Joi.object({
  //     name: Joi.string().alphanum().min(2).max(100).required(),
  //     email: emailValidator.required(),
  //     age: Joi.number().integer().min(1).max(130),
  //     password: Joi.string().regex(PASSWORD_REGEX).required(),
  //   }),

  //   updateUderValidator: Joi.object({
  //     name: Joi.string().alphanum().min(2).max(100),
  //     age: Joi.number().integer().min(1).max(130),
  //   }),
};
