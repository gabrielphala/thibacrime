import Report from "../../auth/Report";

export default async () => {
    if (!targetPage || targetPage != 'res-reports')
        return;

    $('#res-report-form').on('submit', async (e) => {
        e.preventDefault();

        await Report.submitReport();
    });

    $('#reported-crimes').html(await Report.getResidentReports());

    $('#reports-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;

        if (searchValue.length < 3)
            return $('#reported-crimes').html(await Report.getResidentReports())

        $('#reported-crimes').html(await Report.searchResidentReports(searchValue))
    });
};