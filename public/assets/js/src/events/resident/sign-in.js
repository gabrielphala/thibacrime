import Resident from "../../auth/Resident";

export default () => {
    if (!targetPage || targetPage != 'res-sign-in')
        return;

    $('#res-sign-in-form').on('submit', (e) => {
        e.preventDefault();

        Resident.signIn();
    });
};