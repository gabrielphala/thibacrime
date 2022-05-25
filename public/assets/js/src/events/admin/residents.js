import Resident from "../../auth/Resident";

export default async () => {
    if (!targetPage || targetPage != 'admin-residents')
        return;

    $('#residents').html(await Resident.getAdminResidents());

    $('.table__body__row__item__delete').on('click', async e => {
        const residentId = e.currentTarget.parentElement.parentElement.dataset.residentid;

        await Resident.deleteResident(residentId);
    });
};