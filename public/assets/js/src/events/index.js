import admin from "./admin";
import resident from "./resident";
import police from "./police";
import signIn from "./sign-in";

export default () => {
    admin();
    resident();
    police();
    signIn();

    $('.sidenav__top__item__icon--toggle-menu').on('click', e => {
        const sidenav = $('.sidenav'),
            container = $('.page-container__main'),
            header = $('.main-header');

        if (Array.from(sidenav[0].classList).includes('sidenav--closed')) {
            sidenav.addClass('sidenav--open');
            sidenav.removeClass('sidenav--closed');

            container.removeClass('page-container__main--nav-closed')
            container.addClass('page-container__main--nav-open')
            header.removeClass('main-header--nav-closed')
            header.addClass('main-header--nav-open')

            return;
        }

        sidenav.removeClass('sidenav--open');
        sidenav.addClass('sidenav--closed');

        container.addClass('page-container__main--nav-closed')
        container.removeClass('page-container__main--nav-open')
        header.addClass('main-header--nav-closed')
        header.removeClass('main-header--nav-open')
    });
};