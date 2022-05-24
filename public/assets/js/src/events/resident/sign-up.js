import Resident from "../../auth/Resident";

export default () => {
    if (!targetPage || targetPage != 'res-sign-up')
        return;

    $('#res-sign-up-form').on('submit', (e) => {
        e.preventDefault();
        
        Resident.signUp();
    });
};