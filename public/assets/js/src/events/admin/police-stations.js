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

    $('.table__body__row__item__delete').on('click', async e => {
        const policeStationId = e.currentTarget.parentElement.parentElement.dataset.policestationid;

        await PoliceStation.deletePoliceStation(policeStationId);
    });

    $('.table__body__row__item__edit').on('click', async e => {
        const policeStationId = e.currentTarget.parentElement.parentElement.dataset.policestationid;

        const policeAdmin = await Policeman.getPoliceAdminByStation(policeStationId);

        $('#edit-police-station-name').val(policeAdmin.policeStation.name);
        $('#edit-police-station-id').val(policeAdmin.policeStation._id);
        $('#edit-police-man-id').val(policeAdmin._id);
        $('#edit-police-station-address').val(policeAdmin.policeStation.address);
        $('#edit-pol-admin-first-name').val(policeAdmin.firstname);
        $('#edit-pol-admin-last-name').val(policeAdmin.lastname);
        $('#edit-pol-admin-email').val(policeAdmin.email);

        openModal('edit-police-station');
    });
};