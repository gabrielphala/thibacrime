import Policeman from "../../auth/Police"

export default async () => {
    if (!targetPage || targetPage != 'admin-policemen')
        return;

    $('#policemen').html(await Policeman.getAllPolicemen());

    $('#policemen-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;

        if (searchValue.length < 3)
            return $('#policemen').html(await Policeman.getAllPolicemen())

        $('#policemen').html(await Policeman.searchAdminPolicemen(searchValue))
    });

    $('.table__body__row__item__delete').on('click', async e => {
        const policemanId = e.currentTarget.parentElement.parentElement.dataset.policemanid;

        await Policeman.adminRemovePolice(policemanId);
    });
};