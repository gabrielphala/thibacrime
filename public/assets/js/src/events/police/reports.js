import Report from "../../auth/Report"

export default async () => {
    if (!targetPage || targetPage != 'police-reports')
        return;

    $('#reported-crimes').html(await Report.getPoliceReports());

    $('.open-pol-report-modal').on('click', (e) => {
        const reportdata = JSON.parse(e.currentTarget.dataset.reportdata);

        $('#report-id').val(reportdata._id);
        $('#crime-type').text(reportdata.typeOfCrime);
        $('#crime-reporter').text(reportdata.resident.firstname + ' ' + reportdata.resident.lastname);

        $('#crime-report-modal').removeClass('modal--closed');

        navigator.geolocation.getCurrentPosition(({ coords }) => {
            calculateRoute(
                `${coords.latitude},${coords.longitude}`,
                `${reportdata.locationOfCrime.lat},${reportdata.locationOfCrime.lng}`,
            );
        }, (error) => { console.log(error); })
    });

    $('#report-investigate').on('click', (e) => {
        Report.investigate($('#report-id').val())
    });
    
    $('#report-decline').on('click', (e) => {
        Report.decline($('#report-id').val())
    });
}