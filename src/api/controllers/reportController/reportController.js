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

    getPoliceReports = (getPoliceReports) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.reports = await getPoliceReports(req.policeInfo.policeStation);

            return response;
        }, res);
    });

    getAllReports = (getAllReports) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.reports = await getAllReports();

            return response;
        }, res);
    });

    investigateReport = (investigateReport) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await investigateReport(req.params.reportId, req.policeInfo._id);

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