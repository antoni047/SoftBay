const offerController = function () {

    const getCreateOffer = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs"
        }).then(function () {
            this.partial("./views/offers/createOffer.hbs")
        })
    };

    const postCreateOffer = function (context) {
        offerModel.createOffer(context.params)
            .then(helper.handler)
            .then((data) => {
                homeController.getHome(context);
            });
    };

    const getDashboard = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            try {
                let response = await offerModel.getAllOffers();
                context.offers = await response.json();

            } catch (e) {
                console.log(e);
            }

            let someBool;
            Object.keys(context.offers).forEach((key) => {
                if(context.offers[key].creator === username){
                    someBool = true;
                }
                else{
                    someBool = false;
                }
            });

            context.isCreator = someBool;
        }

        context.loadPartials({
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs"
        }).then(function () {
            this.partial("./views/offers/dashboard.hbs")
        })
    };

    const getEditOffer = async function(context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        let response = await offerModel.getOffer(context.params.offerId);
        let offer = await response.json();

        Object.keys(offer).forEach((key) => {
            context[key] = offer[key];
        })

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial("../views/offers/editOffer.hbs")
        })
    };

    const postEditOffer = async function(context){
        console.log(conte.params);

        offerModel.offerModel(context.params)
            .then(helper.handler)
            .then((data) => {
                homeController.getHome(context);
            })
    };

    const getDeleteOffer = async function(context){
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        let response = await offerModel.getOffer(context.params.offerId);
        let offer = await response.json();

        Object.keys(offer).forEach((key) => {
            context[key] = offer[key];
        })

        context.loadPartials({
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs"
        }).then(function () {
            this.partial("./views/offers/deleteOffer.hbs")
        })
    };

    const postDeleteOffer = async function(context){
        debugger;
        offerModel.deleteOffer(context.params.offerId)
        .then(helper.handler)
        .then((data) => {
           context.redirect('#/dashboard');
        })
    };

    const getOfferDetails = async function(context){
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            let response = await offerModel.getOffer(context.params.offerId);
            let offer = await response.json();

            Object.keys(offer).forEach((key) => {
                context[key] = offer[key];
            });
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/offers/offerDetails.hbs')
        });
    }

    return {
        getCreateOffer,
        postCreateOffer,
        getDashboard,
        getEditOffer,
        postEditOffer,
        getDeleteOffer,
        postDeleteOffer,
        getOfferDetails

    }
}();