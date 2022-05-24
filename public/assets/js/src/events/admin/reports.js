import Report from "../../auth/Report";

export default async () => {
    if (!targetPage || targetPage != 'admin-reports')
        return;

    $('#reports').html(await Report.getAdminReports());
};