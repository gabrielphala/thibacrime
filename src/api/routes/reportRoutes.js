const reportController = require('../controllers/reportController');
const reportServices = require('../../services/Report');

const { multipleFiles } = require('../../config/multer')

const uploadReportFiles =
    multipleFiles('./public/assets/uploads/report-files', [{ name: 'reportFiles[]', maxCount: 3 }]);

module.exports = (router) => {
    router.post('/report/submit', (req, res) => {
        uploadReportFiles(req, res, err => {
            if (err)
                if (err.code == 'LIMIT_FILE_SIZE')
                    req.fileUploadError = 'File size too large'
                else if (err.code == 'FILE_TYPE_NOT_ALLOWED')
                    req.fileUploadError = 'File type not allowed';
                
            reportController.submitReport(reportServices.submitReport)(req, res)
        })
    });

    router.post('/reports/fetch/resident', reportController.getResidentReports(reportServices.getResidentReports));
    router.post('/reports/fetch/police', reportController.getPoliceReports(reportServices.getPoliceReports));
    router.post('/reports/fetch/all', reportController.getAllReports(reportServices.getAllReports));

    router.post('/report/:reportId/investigate', reportController.investigateReport(reportServices.investigateReport));
    router.post('/report/:reportId/decline', reportController.declineReport(reportServices.declineReport));
};