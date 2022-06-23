import fetch from "../helpers/fetch";
import { formatAdminResidents } from "../helpers/format";
import showError from "../helpers/show-error";
import { isAlpha, isEmail } from "../helpers/validation";

class ResidentAuth {
    static async signUp () {
        const residentDetails = {
            firstname: $('#res-first-name').val(),
            lastname: $('#res-last-name').val(),
            email: $('#res-email-address').val(),
            password: $('#res-password').val(),
            passwordConfirmation: $('#res-con-password').val()
        };

        try {
            if (residentDetails.firstname == '')
                throw 'First name cannot be empty'

            else if (!isAlpha(residentDetails.firstname))
                throw 'First name contains numbers or special characters';

            if (residentDetails.lastname == '')
                throw 'Last name cannot be empty'

            else if (!isAlpha(residentDetails.lastname))
                throw 'Last name contains numbers or special characters';

            if (residentDetails.email == '')
                throw 'Email cannot be empty'

            else if (!isEmail(residentDetails.email))
                throw 'Email is invalid';

            const response = await fetch('/resident/sign-up', { body: residentDetails });

            if (response.successful) {
                location.href = response.redirect;

                return;
            }

            throw response.error;
        } catch (e) { showError('resident-sign-up-error', e); }
    };

    static async signIn () {
        const residentDetails = {
            email: $('#email-address').val(),
            password: $('#password').val()
        };

        const response = await fetch('/resident/sign-in', { body: residentDetails });

        if (response.successful) {
            location.href = response.redirect;

            return;
        }

        showError('sign-in-error', response.error);
    };

    static async getAdminResidents () {
        const response = await fetch('/residents/fetch/all');

        if (response.residents && response.residents.length > 0) {
            $('#residents').show()
            $('#no-residents').hide()

            return formatAdminResidents(response.residents);
        }

        $('#residents').hide()
        $('#no-residents').show()
    };

    static async searchAdminResidents (searchValue) {
        const response = await fetch(`/residents/search/admin?q=${searchValue}`);

        if (response.residents && response.residents.length > 0) {
            $('#residents').show()
            $('#no-residents').hide()

            return formatAdminResidents(response.residents);
        }

        $('#residents').hide()
        $('#no-residents').show()
    }

    static async deleteResident (residentId) {
        const response = await fetch(`/resident/${residentId}/delete`);

        if (response.successful)
            return location.reload(true);
    };
}

export default ResidentAuth;