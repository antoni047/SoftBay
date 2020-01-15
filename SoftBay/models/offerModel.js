const offerModel = function (){

    const createOffer = function (params) {
        let data = {
            ...params,
            creator: JSON.parse(storage.getData('userInfo')).username
        };

        let url = `appdata/${storage.appKey}/offers`;
        let headers = {
            body: JSON.stringify(data),
            headers: {}
        };

        return requester.post(url, headers);
    };

    const getAllOffers = function () {
        let url = `appdata/${storage.appKey}/offers`;
        let headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const getOffer = function (id) {
        let url = `appdata/${storage.appKey}/offers/${id}`;
        let headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const editOffer = function(params) {
        let url = `appdata/${storage.appKey}/offers/${params.offerId}`;

        delete params.eventId;

        let headers = {
            body: JSON.stringify({ ...params }),
            headers: {}
        };

        return requester.put(url, headers);
    };

    const deleteOffer = function(id){
        let url = `appdata/${storage.appKey}/offers/${id}`;
        let header = {
            headers: {}
        };

        return requester.del(url, header);
    };

    return {
        createOffer,
        getAllOffers,
        getOffer,
        editOffer,
        deleteOffer
    }
}();