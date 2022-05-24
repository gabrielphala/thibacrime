import fetch from "../helpers/fetch";
import showError from "../helpers/show-error";
import { formatResidentReports, formatPoliceReports, formatAdminReports } from "../helpers/format";


class ReportAuth {
    static async submitReport () {
        const formData = new FormData();

        for (const file of $('#report-files')[0].files) {
            formData.append('reportFiles[]', file);
        }

        formData.append('typeOfCrime', $('#crime-witnessed').val())
        formData.append('descriptionOfEvents', $('#description-of-events').val())
        formData.append('locationOfCrime', JSON.stringify(targetCrimeScene))

        $.ajax({
            url: '/report/submit',
            data: formData,
            enctype: 'mutipart/form-data',
            method: 'POST',
            processData: false,
            contentType: false,
            success: (response) => {
                if (response.successful) {
                    location.reload(true);

                    return;
                }

                showError('new-report-error', response.error);
            }
        })
    };

    static async getResidentReports () {
        const response = await fetch('/reports/fetch/resident');

        return formatResidentReports(response.reports);
    };

    static async getPoliceReports () {
        const response = await fetch('/reports/fetch/police');

        return formatPoliceReports(response.reports);
    };

    static async getAdminReports () {
        const response = await fetch('/reports/fetch/all');

        return formatAdminReports(response.reports);
    };

    static async investigate (reportId) {
        const response = await fetch(`/report/${reportId}/investigate`);

        if (response.successful)
            return location.reload(true);

        showError('crime-report-modal-error', response.error);

    };

    static async decline (reportId) {
        const response = await fetch(`/report/${reportId}/decline`);

        if (response.successful)
            return location.reload(true);

        showError('crime-report-modal-error', response.error);
    };
}

export default ReportAuth;