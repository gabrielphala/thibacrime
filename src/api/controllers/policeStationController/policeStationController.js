class PoliceStationController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };
    
    add = (add) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policeStationDetails = {
                name: req.body.policeStationDetails.policeStationName,
                address: req.body.policeStationDetails.policeStationAddress,
                location: req.body.policeStationDetails.targetPoliceStation
            };

            const policemanDetails = {
                firstname: req.body.policemanDetails.adminFirstname,
                lastname: req.body.policemanDetails.adminLastname,
                email: req.body.policemanDetails.adminEmail
            }

            await add(policeStationDetails, policemanDetails);

            response.successful = true;

            return response;
        }, res);
    });

    editPoliceStation = (editPoliceStation) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policeStationDetails = {
                name: req.body.policeStationDetails.policeStationName,
                address: req.body.policeStationDetails.policeStationAddress,
                policeStationId: req.params.policeStationId
            };

            const policemanDetails = {
                firstname: req.body.policemanDetails.adminFirstname,
                lastname: req.body.policemanDetails.adminLastname,
                email: req.body.policemanDetails.adminEmail,
                policemandId: req.body.policemanDetails.policemandId
            }

            await editPoliceStation(policeStationDetails, policemanDetails);

            response.successful = true;

            return response;
        }, res);
    });

    deletePoliceStation = (deletePoliceStation) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await deletePoliceStation(req.params.policeStationId);

            response.successful = true;

            return response;
        }, res);
    });

    getAll = (getAll) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.policeStations = await getAll();

            return response;
        }, res);
    });

    getPoliceStationDetails = (getPoliceStationDetails) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policeStationDetails = await getPoliceStationDetails(
                req.params.policeStationId
            );

            response.policeStation = policeStationDetails;

            return response;
        }, res);
    });

    searchAdminPoliceStations = (searchAdminPoliceStations) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policeStations = await searchAdminPoliceStations(req.query.q);

            response.policeStations = policeStations;

            return response;
        }, res);
    });
};

module.exports = PoliceStationController;