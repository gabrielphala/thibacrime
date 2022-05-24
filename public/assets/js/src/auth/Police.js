import fetch from "../helpers/fetch";
import showError from "../helpers/show-error";

class PoliceAuth {
    static async signIn () {
        const response = await fetch('/police/sign-in', {
            body: {
                email: $('#police-email-address').val(),
                password: $('#police-password').val()
            }
        });

        if (response.successful) {
            location.href = response.redirect;

            return;
        }

        showError('police-man-sign-in-error', response.error);
    }

    static async getPolicemanDetails (policemanId) {
        const response = await fetch(`/police/${policemanId}/fetch`);

        return response.policeman;
    };

    static async getPoliceAdminByStation (policeStationId) {
        const response = await fetch(`/police/admin/${policeStationId}/fetch/station`);

        return response.policeman;
    };
}

export default PoliceAuth;