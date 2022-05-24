export const formatPoliceStations = (policeStations) => {
    let formated = '', index = 1;

    policeStations.forEach(policeStation => {
        formated += `
            <ul class="table__body__row" data-policestationid="${policeStation._id}">
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${policeStation.name}</li>
                <li class="table__body__row__item">${policeStation.address}</li>
                <li class="table__body__row__item last-cell">Date</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <span class="table__body__row__item__edit">
                        <svg class="image--icon">
                            <use href="#pencil"></use>
                        </svg>
                    </span>
                    <span class="table__body__row__item__delete">
                        <svg class="image--icon">
                            <use href="#cancel"></use>
                        </svg>
                    </span>
                </li>
            </ul>
        `;

        index++;
    });

    return formated;
};

export const formatResidentReports = (reports) => {
    let formated = '', index = 1;

    reports.forEach(report => {
        formated += `
            <ul class="table__body__row">
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${report.typeOfCrime}</li>
                <li class="table__body__row__item">${report.assignedPoliceStation.name}</li>
                <li class="table__body__row__item">${report.statusForResident}</li>
                <li class="table__body__row__item last-cell">Date</li>
            </ul>
        `;

        index++;
    });

    return formated;
}

export const formatPoliceReports = (reports) => {
    let formated = '', index = 1;

    reports.forEach(report => {
        formated += `
            <ul class="table__body__row open-pol-report-modal" data-reportData='${JSON.stringify(report)}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${report.typeOfCrime}</li>
                <li class="table__body__row__item">${report.resident.firstname +' '+ report.resident.lastname}</li>
                <li class="table__body__row__item">${report.statusForPolice}</li>
                <li class="table__body__row__item last-cell">Date</li>
            </ul>
        `;

        index++;
    });

    return formated;
}

export const formatAdminResidents = (residents) => {
    let formated = '', index = 1;

    residents.forEach(resident => {
        formated += `
            <ul class="table__body__row" data-residentId='${resident._id}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${resident.firstname}</li>
                <li class="table__body__row__item">${resident.lastname}</li>
                <li class="table__body__row__item">${resident.email}</li>
                <li class="table__body__row__item last-cell">Date</li>
            </ul>
        `;

        index++;
    });

    return formated;
}


export const formatAdminReports = (reports) => {
    let formated = '', index = 1;

    reports.forEach(report => {
        formated += `
            <ul class="table__body__row" data-reportId='${report._id}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${report.typeOfCrime}</li>
                <li class="table__body__row__item">${report.resident.firstname + ' ' + report.resident.lastname}</li>
                <li class="table__body__row__item">${report.assignedPoliceStation.name}</li>
                <li class="table__body__row__item">${report.statusForPolice}</li>
                <li class="table__body__row__item last-cell">Date</li>
            </ul>
        `;

        index++;
    });

    return formated;
}