import fetch from "../helpers/fetch";
import { formatPolicemen, formatAdminPolicemen } from "../helpers/format";
import showError from "../helpers/show-error";
import { isAlpha, isEmail } from "../helpers/validation";

class PoliceAuth {
    static async signIn () {
        const response = await fetch('/police/sign-in', {
            body: {
                email: $('#email-address').val(),
                password: $('#password').val()
            }
        });

        if (response.successful) {
            location.href = response.redirect;

            return;
        }

        showError('sign-in-error', response.error);
    }

    static async addPoliceman () {
        const firstname = $('#pol-first-name').val(),
            lastname = $('#pol-last-name').val(),
            email = $('#pol-email').val();

        try {
            if (firstname == '')
                throw 'First name cannot be empty';

            else if (!isAlpha(firstname))
                throw 'First name should only have letters';

            if (lastname == '')
                throw 'Last name cannot be empty';

            else if (!isAlpha(lastname))
                throw 'Last name should only have letters';

            if (email == '')
                throw 'Email cannot be empty';

            else if (!isEmail(email))
                throw 'Email is invalid';

            const response = await fetch(`/police/add`, {
                body: {
                    firstname,
                    lastname,
                    email
                }
            });

            if (response.successful) 
                return location.reload(true)

            throw response.error;
        } catch (e) { showError('new-policeman-error', e); }
    };

    static async editPoliceman () {
        const firstname = $('#edit-pol-first-name').val(),
            lastname = $('#edit-pol-last-name').val(),
            email = $('#edit-pol-email').val();

        try {
            if (firstname == '')
                throw 'First name cannot be empty';

            else if (!isAlpha(firstname))
                throw 'First name should only have letters';

            if (lastname == '')
                throw 'Last name cannot be empty';

            else if (!isAlpha(lastname))
                throw 'Last name should only have letters';

            if (email == '')
                throw 'Email cannot be empty';

            else if (!isEmail(email))
                throw 'Email is invalid';

            const response = await fetch(`/police/edit`, {
                body: {
                    firstname,
                    lastname,
                    email,
                    policemanId: $('#edit-id').val()
                }
            });

            if (response.successful)
                return location.reload(true)

            throw response.error;
        } catch (e) { showError('edit-policeman-error', e); }
    };

    static async getPolicemanDetails (policemanId) {
        const response = await fetch(`/police/${policemanId}/fetch`);

        return response.policeman;
    };

    static async getPoliceAdminByStation (policeStationId) {
        const response = await fetch(`/police/admin/${policeStationId}/fetch/station`);

        return response.policeman;
    };

    static async getPolicemenByStation () {
        const response = await fetch(`/police/fetch/station`);

        if (response.policemen && response.policemen.length > 0) {
            $('#policemen').show()
            $('#no-policemen').hide()

            return formatPolicemen(response.policemen);
        }

        $('#policemen').hide()
        $('#no-policemen').show()
    };

    static async getAllPolicemen () {
        const response = await fetch(`/police/fetch/all`);

        if (response.policemen && response.policemen.length > 0) {
            $('#policemen').show()
            $('#no-policemen').hide()

            return formatAdminPolicemen(response.policemen);
        }

        $('#policemen').hide()
        $('#no-policemen').show()
    };

    static async searchPolicemen (searchValue) {
        const response = await fetch(`/police/search?q=${searchValue}`);

        if (response.policemen && response.policemen.length > 0) {
            $('#policemen').show()
            $('#no-policemen').hide()

            return formatPolicemen(response.policemen);
        }

        $('#policemen').hide()
        $('#no-policemen').show()
    }

    static async adminRemovePolice (policemanId) {
        const response = await fetch(`/police/${policemanId}/remove/admin`);

        if (response.successful) 
            return location.reload(true);
    }

    static async removePoliceAgent (policemanId) {
        const response = await fetch(`/police/${policemanId}/remove`);

        if (response.successful) 
            return location.reload(true);
    }

    static async searchAdminPolicemen (searchValue) {
        const response = await fetch(`/police/search/admin?q=${searchValue}`);

        if (response.policemen && response.policemen.length > 0) {
            $('#policemen').show()
            $('#no-policemen').hide()

            return formatAdminPolicemen(response.policemen);
        }

        $('#policemen').hide()
        $('#no-policemen').show()
    }
}

export default PoliceAuth;