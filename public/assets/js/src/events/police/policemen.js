import Policeman from "../../auth/Police"
import { openModal } from "../../helpers/modal"

export default async () => {
    if (!targetPage || targetPage != 'police-policemen')
        return;

    $('#policemen').html(await Policeman.getPolicemenByStation());

    $('#new-policeman-form').on('submit', async (e) => {
        e.preventDefault();

        await Policeman.addPoliceman();
    });

    $('#policemen-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;

        if (searchValue.length < 3)
            return $('#policemen').html(await Policeman.getPolicemenByStation())

        $('#policemen').html(await Policeman.searchPolicemen(searchValue))
    })

    $('.table__body__row__item__delete').on('click', async e => {
        const policemanId = e.currentTarget.parentElement.parentElement.dataset.policemanid;

        await Policeman.removePoliceAgent(policemanId);
    });

    $('.table__body__row__item__edit').on('click', async e => {
        const policemanId = e.currentTarget.parentElement.parentElement.dataset.policemanid;

        const policemanDetails = await Policeman.getPolicemanDetails(policemanId);

        $('#edit-pol-first-name').val(policemanDetails.firstname)
        $('#edit-pol-last-name').val(policemanDetails.lastname)
        $('#edit-pol-email').val(policemanDetails.email)
        $('#edit-id').val(policemanId)

        openModal('edit-policeman');
    });

    $('#edit-policeman-form').on('submit', async e => {
        e.preventDefault();

        console.log('Hey');

        await Policeman.editPoliceman();
    });
}