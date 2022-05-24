import fetch from "../helpers/fetch";
import showError from "../helpers/show-error";
import { formatPoliceStations } from "../helpers/format";

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

        showError('edit-police-error', response.error);
    };

    static async getPoliceStationDetails (policeId) {
        const response = await fetch(`/police-station/${policeId}/fetch`);

        return response.policeStation;
    };

    static async getPoliceStations () {
        const response = await fetch('/police-stations/fetch');

        return formatPoliceStations(response.policeStations);
    }
}

export default PoliceStation;