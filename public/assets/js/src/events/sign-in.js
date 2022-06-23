import adminAuth from "../auth/Admin";
import policeAuth from "../auth/Police";
import residentAuth from "../auth/Resident";
import showError from "../helpers/show-error";

export default () => {
    if (!targetPage || targetPage != 'sign-in')
        return;

    $('#sign-in-form').on('submit', e => {
        try {
            e.preventDefault();

            const loginOptions = { adminAuth, policeAuth, residentAuth }

            const loginType = $('.logger__container__main__form__login-options__option--active')[0].dataset.logintype;

            if (!loginType)
                throw 'Please select account type';

            loginOptions[`${loginType}Auth`].signIn();
        } catch (e) { showError('sign-in-error', e) }
    });
};