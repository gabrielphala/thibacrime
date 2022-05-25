import fetch from "../helpers/fetch";
import { formatAdminResidents } from "../helpers/format";
import showError from "../helpers/show-error";

class ResidentAuth {
    static async signUp () {
        const residentDetails = {
            firstname: $('#res-first-name').val(),
            lastname: $('#res-last-name').val(),
            email: $('#res-email-address').val(),
            password: $('#res-password').val(),
            passwordConfirmation: $('#res-con-password').val()
        };
        

        const response = await fetch('/resident/sign-up', { body: residentDetails });

        if (response.successful) {
            location.href = response.redirect;
        
            return;
        }
            
        showError('resident-sign-up-error', response.error);
    };

    static async signIn () {
        const residentDetails = {
            email: $('#res-email-address').val(),
            password: $('#res-password').val()
        };

        const response = await fetch('/resident/sign-in', { body: residentDetails });

        if (response.successful) {
            location.href = response.redirect;

            return;
        }

        showError('resident-sign-in-error', response.error);
    };

    static async getAdminResidents () {
        const response = await fetch('/residents/fetch/all');

        console.log(response.residents);

        if (!response.residents || response.residents && response.residents.length == 0)
            $('#no-residents').show()

        return formatAdminResidents(response.residents);
    };

    static async deleteResident (residentId) {
        const response = await fetch(`/resident/${residentId}/delete`);

        if (response.successful)
            return location.reload(true);
    };
}

export default ResidentAuth;