const emailActions = require( '../constants/email.action.enum' );

module.exports = {
  [emailActions.WELCOME] : {
    subject : 'Welcome on board',
    template : 'welcome',
  },

  [emailActions.FORGOT_PASSWORD] : {
    subject : 'Ooops look like you forgot password',
    template : 'forgot.password',
  },

  [emailActions.USER_BANNED] : {
    subject : 'Account was blocked',
    template : 'account-blocked',
  },
};
