import Report from "../../auth/Report";

export default async () => {
    if (!targetPage || targetPage != 'admin-reports')
        return;

    $('#reports').html(await Report.getAdminReports());

    $('#reports-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;

        if (searchValue.length < 3)
            return $('#reports').html(await Report.getAdminReports())

        $('#reports').html(await Report.searchAdminReports(searchValue))
    });
};