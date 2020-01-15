const app = Sammy("body", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);
    this.get('#/logout', userController.logout);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    
    //Offers
    this.get('#/createOffer', offerController.getCreateOffer);
    this.get('#/dashboard', offerController.getDashboard);
    this.get('#/editOffer/:offerId', offerController.getEditOffer);
    this.get('#/deleteOffer/:offerId', offerController.getDeleteOffer);
    this.get('#/offerDetails/:offerId', offerController.getOfferDetails)

    this.post('#/createOffer', offerController.postCreateOffer);
    this.post('#/editOffer/:offerId', offerController.postEditOffer);
    this.post('#/deleteOffer/:offerId', offerController.postDeleteOffer);
   
});

(() => {
    app.run('#/home');
})();