import Report from "../../auth/Report";

export default async () => {
    if (!targetPage || targetPage != 'res-reports')
        return;

    $('#res-report-form').on('submit', async (e) => {
        e.preventDefault();

        await Report.submitReport();
    });

    $('#reported-crimes').html(await Report.getResidentReports());
};