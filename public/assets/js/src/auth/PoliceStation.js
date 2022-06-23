import fetch from "../helpers/fetch";
import showError from "../helpers/show-error";
import { formatPoliceStations } from "../helpers/format";
import { isAlpha, isEmail } from "../helpers/validation";

class PoliceStation {
    static async addPoliceStation () {
        try {
            const policeStationDetails = {
                policeStationName: $('#police-station-name').val(),
                policeStationAddress: $('#police-station-address').val(),
                targetPoliceStation
            };

            const policemanDetails = {
                adminFirstname: $('#pol-admin-first-name').val(),
                adminLastname: $('#pol-admin-last-name').val(),
                adminEmail: $('#pol-admin-email').val()
            }

            if (policeStationDetails.policeStationName == '')
                throw 'Police name cannot be empty!'

            else if ("`~!@#$%^&*()+=[]{};:'<>,./?|\\\"1234567890".includes(policeStationDetails.policeStationName))
                throw 'Police name should not include special characters or numbers';

            if (policeStationDetails.policeStationAddress == '')
                throw 'Police address cannot be empty';

            else if ("`~!@#$%^&*()+=[]{};:<>./?|\\".includes(policeStationDetails.policeStationAddress))
                throw 'Police address should not include special characters execept \' or ,';

            if (policemanDetails.adminFirstname == '')
                throw 'First name cannot be empty';

            else if (!isAlpha(policemanDetails.adminFirstname))
                throw 'First name should only have letters';

            if (policemanDetails.adminLastname == '')
                throw 'Last name cannot be empty';

            else if (!isAlpha(policemanDetails.adminLastname))
                throw 'Last name should only have letters';

            if (policemanDetails.adminEmail == '')
                throw 'Email cannot be empty';

            else if (!isEmail(policemanDetails.adminEmail))
                throw 'Email is invalid';

            if (!targetPoliceStation)
                throw 'Select police station';

            const response = await fetch('/police-station/add', { body: { policeStationDetails, policemanDetails } });

            if (response.successful) {
                location.reload(true)

                return;
            }

            showError('new-police-error', response.error);
        } catch (e) {
            showError('new-police-error', e);
        }
    };

    static async editPoliceStation() {
        const policeStationDetails = {
            policeStationName: $('#edit-police-station-name').val(),
            policeStationAddress: $('#edit-police-station-address').val()
        };

        const policemanDetails = {
            adminFirstname: $('#edit-pol-admin-first-name').val(),
            adminLastname: $('#edit-pol-admin-last-name').val(),
            adminEmail: $('#edit-pol-admin-email').val(),
            policemandId: $('#edit-police-man-id').val()
        }

        if (policeStationDetails.policeStationName == '')
            throw 'Police name cannot be empty!'

        else if ("`~!@#$%^&*()+=[]{};:'<>,./?|\\\"1234567890".includes(policeStationDetails.policeStationName))
            throw 'Police name should not include special characters or numbers';

        if (policeStationDetails.policeStationAddress == '')
            throw 'Police address cannot be empty';

        else if ("`~!@#$%^&*()+=[]{};:<>./?|\\".includes(policeStationDetails.policeStationAddress))
            throw 'Police address should not include special characters execept \' or ,';

        if (policemanDetails.adminFirstname == '')
            throw 'First name cannot be empty';

        else if (!isAlpha(policemanDetails.adminFirstname))
            throw 'First name should only have letters';

        if (policemanDetails.adminLastname == '')
            throw 'Last name cannot be empty';

        else if (!isAlpha(policemanDetails.adminLastname))
            throw 'Last name should only have letters';

        if (policemanDetails.adminEmail == '')
            throw 'Email cannot be empty';

        else if (!isEmail(policemanDetails.adminEmail))
            throw 'Email is invalid';

        const response = await fetch(`/police-station/${$('#edit-police-station-id').val()}/update`, {
            body: {
                policeStationDetails,
                policemanDetails
            }
        });

        if (response.successful) {
            location.reload(true)

            return;
        }

        showError('edit-police-error', response.error);
    };

    static async deletePoliceStation (policeId) {
        const response = await fetch(`/police-station/${policeId}/delete`);

        if (response.successful)
            return location.reload(true);
    };

    static async getPoliceStationDetails (policeId) {
        const response = await fetch(`/police-station/${policeId}/fetch`);

        return response.policeStation;
    };

    static async getPoliceStations () {
        const response = await fetch('/police-stations/fetch');

        if (response.policeStations && response.policeStations.length > 0) {
            $('#registered-police-stations').show()
            $('#no-police-stations').hide()

            return formatPoliceStations(response.policeStations);
        }

        $('#registered-police-stations').hide()
        $('#no-police-stations').show()
    }

    static async searchAdminPoliceStations (searchValue) {
        const response = await fetch(`/police-stations/search/admin?q=${searchValue}`);

        if (response.policeStations && response.policeStations.length > 0) {
            $('#registered-police-stations').show()
            $('#no-police-stations').hide()

            return formatPoliceStations(response.policeStations);
        }

        $('#registered-police-stations').hide()
        $('#no-police-stations').show()
    }
}

export default PoliceStation;