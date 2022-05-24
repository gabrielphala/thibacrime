import Resident from "../../auth/Resident";

export default async () => {
    if (!targetPage || targetPage != 'admin-residents')
        return;

    $('#residents').html(await Resident.getAdminResidents());
};