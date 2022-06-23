import fetch from "../helpers/fetch";
import showError from "../helpers/show-error";
import { formatResidentReports, formatPoliceReports, formatAdminReports } from "../helpers/format";
import { hasNumbers, hasSpecialChars, isSpecialChar } from "../helpers/validation";

class ReportAuth {
    static async submitReport () {
        const formData = new FormData();

        for (const file of $('#report-files')[0].files) {
            formData.append('reportFiles[]', file);
        }

        const typeOfCrime = $('#crime-witnessed').val();
        const descriptionOfEvents = $('#description-of-events').val();

        formData.append('typeOfCrime', typeOfCrime)
        formData.append('descriptionOfEvents', descriptionOfEvents)
        formData.append('locationOfCrime', JSON.stringify(targetCrimeScene))

        try {
            if (typeOfCrime == '')
                throw 'Please fill in type of crime';

            else if (hasNumbers(typeOfCrime) || isSpecialChar(typeOfCrime))
                throw 'Type of crime cannot contain any special characters or numbers';

            if (descriptionOfEvents == '')
                throw 'Please describe the crime';

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
        } catch (e) { showError('new-report-error', e); }
    };

    static async getResidentReports () {
        const response = await fetch('/reports/fetch/resident');

        if (response.reports && response.reports.length > 0) {
            $('#reported-crimes').show()
            $('#no-reports').hide()

            return formatResidentReports(response.reports);
        }

        $('#reported-crimes').hide()
        $('#no-reports').show()
    };

    static async searchResidentReports (searchValue) {
        const response = await fetch(`/reports/search/resident?q=${searchValue}`);

        if (response.reports && response.reports.length > 0) {
            $('#reported-crimes').show()
            $('#no-reports').hide()

            return formatResidentReports(response.reports);
        }

        $('#reported-crimes').hide()
        $('#no-reports').show()
    }

    static async getPoliceReports () {
        const response = await fetch('/reports/fetch/police');

        if (response.reports && response.reports.length > 0) {
            $('#reported-crimes').show()
            $('#no-reports').hide()

            return formatPoliceReports(response.reports);
        }

        $('#reported-crimes').hide()
        $('#no-reports').show()

    };

    static async searchPoliceReports (searchValue) {
        const response = await fetch(`/reports/search/police?q=${searchValue}`);

        if (response.reports && response.reports.length > 0) {
            $('#reported-crimes').show()
            $('#no-reports').hide()

            return formatPoliceReports(response.reports);
        }

        $('#reported-crimes').hide()
        $('#no-reports').show()
    }

    static async getAdminReports () {
        const response = await fetch('/reports/fetch/all');

        if (response.reports && response.reports.length > 0) {
            $('#reports').show()
            $('#no-reports').hide()

            return formatAdminReports(response.reports);
        }

        $('#reports').hide()
        $('#no-reports').show()
    };

    static async searchAdminReports (searchValue) {
        const response = await fetch(`/reports/search/admin?q=${searchValue}`);

        if (response.reports && response.reports.length > 0) {
            $('#reports').show()
            $('#no-reports').hide()

            return formatAdminReports(response.reports);
        }

        $('#reports').hide()
        $('#no-reports').show()
    }

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