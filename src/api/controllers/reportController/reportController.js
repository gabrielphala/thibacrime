class ReportController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };
    
    submitReport = (submitReport) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await submitReport(req);

            response.successful = true;

            return response;
        }, res);
    });

    getResidentReports = (getResidentReports) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.reports = await getResidentReports(req.residentInfo._id);

            return response;
        }, res);
    });

    searchResidentReports = (searchResidentReports) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.reports = await searchResidentReports(req.query.q, req.residentInfo._id);

            return response;
        }, res);
    });

    getPoliceReports = (getPoliceReports) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.reports = await getPoliceReports(req.policeInfo.policeStationID);

            return response;
        }, res);
    });

    searchPoliceReports = (searchPoliceReports) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.reports = await searchPoliceReports(req.query.q, req.policeInfo.policeStationID);

            return response;
        }, res);
    });

    getAllReports = (getAllReports) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.reports = await getAllReports();

            return response;
        }, res);
    });

    searchAdminReports = (searchAdminReports) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.reports = await searchAdminReports(req.query.q);

            return response;
        }, res);
    });

    investigateReport = (investigateReport) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await investigateReport(req.params.reportId, req.policeInfo._id, req.policeInfo.ref);

            response.successful = true;

            return response;
        }, res);
    });

    declineReport = (declineReport) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await declineReport(req.params.reportId);

            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = ReportController;