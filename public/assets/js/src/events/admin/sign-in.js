import Admin from "../../auth/Admin";

export default async () => {
    if (!targetPage || targetPage != 'admin-sign-in')
        return;

    $('#admin-sign-in-form').on('submit', async (e) => {
        e.preventDefault();

        await Admin.signIn();
    });
};