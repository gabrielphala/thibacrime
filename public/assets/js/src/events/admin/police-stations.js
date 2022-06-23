import PoliceStation from "../../auth/PoliceStation";
import Policeman from "../../auth/Police"
import { openModal } from "../../helpers/modal";

export default async () => {
    if (!targetPage || targetPage != 'admin-police-stations')
        return;

    $('#admin-police-station-form').on('submit', async (e) => {
        e.preventDefault();

        await PoliceStation.addPoliceStation();
    });

    $('#edit-admin-police-station-form').on('submit', async (e) => {
        e.preventDefault();

        await PoliceStation.editPoliceStation();
    });

    $('#registered-police-stations').html(await PoliceStation.getPoliceStations());

    $('#police-stations-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;

        if (searchValue.length < 3)
            return $('#registered-police-stations').html(await PoliceStation.getPoliceStations())

        $('#registered-police-stations').html(await PoliceStation.searchAdminPoliceStations(searchValue))
    });

    $('.table__body__row__item__delete').on('click', async e => {
        const policeStationId = e.currentTarget.parentElement.parentElement.dataset.policestationid;

        await PoliceStation.deletePoliceStation(policeStationId);
    });

    $('.table__body__row__item__edit').on('click', async e => {
        const policeStationId = e.currentTarget.parentElement.parentElement.dataset.policestationid;

        const policeAdmin = await Policeman.getPoliceAdminByStation(policeStationId);

        $('#edit-police-station-name').val(policeAdmin.policeStationID.name);
        $('#edit-police-station-id').val(policeAdmin.policeStationID._id);
        $('#edit-police-man-id').val(policeAdmin._id);
        $('#edit-police-station-address').val(policeAdmin.policeStationID.address);
        $('#edit-pol-admin-first-name').val(policeAdmin.firstname);
        $('#edit-pol-admin-last-name').val(policeAdmin.lastname);
        $('#edit-pol-admin-email').val(policeAdmin.email);

        openModal('edit-police-station');
    });
};