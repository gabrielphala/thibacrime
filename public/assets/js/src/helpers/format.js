import { getStaticDate } from "./date";

export const formatPoliceStations = (policeStations) => {
    let formated = '', index = 1;

    policeStations.forEach(policeStation => {
        formated += `
            <ul class="table__body__row" data-policestationid="${policeStation._id}">
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${policeStation.name}</li>
                <li class="table__body__row__item">${policeStation.address}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(policeStation.createdAt))}</li>
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
                <li class="table__body__row__item">${report.policeStationID.name}</li>
                <li class="table__body__row__item">${report.statusForResident}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(report.createdAt))}</li>
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
                <li class="table__body__row__item">${report.residentID.firstname +' '+ report.residentID.lastname}</li>
                <li class="table__body__row__item">${report.statusForPolice}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(report.createdAt))}</li>
            </ul>
        `;

        index++;
    });

    return formated;
}

export const formatPolicemen = (policemen) => {
    let formated = '', index = 1;

    policemen.forEach(policeman => {
        formated += `
            <ul class="table__body__row" data-policemanId='${policeman._id}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${policeman.firstname}</li>
                <li class="table__body__row__item">${policeman.lastname}</li>
                <li class="table__body__row__item">${policeman.email}</li>
                <li class="table__body__row__item">${policeman.type}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(policeman.createdAt))}</li>
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
}

export const formatAdminPolicemen = (policemen) => {
    let formated = '', index = 1;

    policemen.forEach(policeman => {
        formated += `
            <ul class="table__body__row" data-policemanId='${policeman._id}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${policeman.firstname}</li>
                <li class="table__body__row__item">${policeman.lastname}</li>
                <li class="table__body__row__item">${policeman.email}</li>
                <li class="table__body__row__item">${policeman.type}</li>
                <li class="table__body__row__item">${policeman.policeStationID.name}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(policeman.createdAt))}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
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
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(resident.createdAt))}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
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
}

export const formatAdminReports = (reports) => {
    let formated = '', index = 1;

    reports.forEach(report => {
        formated += `
            <ul class="table__body__row" data-reportId='${report._id}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${report.typeOfCrime}</li>
                <li class="table__body__row__item">${report.residentID.firstname + ' ' + report.residentID.lastname}</li>
                <li class="table__body__row__item">${report.policeStationID.name}</li>
                <li class="table__body__row__item">${report.statusForPolice}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(report.createdAt))}</li>
            </ul>
        `;

        index++;
    });

    return formated;
}