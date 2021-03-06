/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/assets/js/src/auth/Admin.js":
/*!********************************************!*\
  !*** ./public/assets/js/src/auth/Admin.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");



class PoliceAuth {
  static async signIn() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/admin/sign-in', {
      body: {
        email: $('#email-address').val(),
        password: $('#password').val()
      }
    });

    if (response.successful) {
      location.href = response.redirect;
      return;
    }

    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_1__["default"])('sign-in-error', response.error);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PoliceAuth);

/***/ }),

/***/ "./public/assets/js/src/auth/Police.js":
/*!*********************************************!*\
  !*** ./public/assets/js/src/auth/Police.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/format */ "./public/assets/js/src/helpers/format.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");





class PoliceAuth {
  static async signIn() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/police/sign-in', {
      body: {
        email: $('#email-address').val(),
        password: $('#password').val()
      }
    });

    if (response.successful) {
      location.href = response.redirect;
      return;
    }

    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_2__["default"])('sign-in-error', response.error);
  }

  static async addPoliceman() {
    const firstname = $('#pol-first-name').val(),
          lastname = $('#pol-last-name').val(),
          email = $('#pol-email').val();

    try {
      if (firstname == '') throw 'First name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(firstname)) throw 'First name should only have letters';
      if (lastname == '') throw 'Last name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(lastname)) throw 'Last name should only have letters';
      if (email == '') throw 'Email cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isEmail)(email)) throw 'Email is invalid';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/add`, {
        body: {
          firstname,
          lastname,
          email
        }
      });
      if (response.successful) return location.reload(true);
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_2__["default"])('new-policeman-error', e);
    }
  }

  static async editPoliceman() {
    const firstname = $('#edit-pol-first-name').val(),
          lastname = $('#edit-pol-last-name').val(),
          email = $('#edit-pol-email').val();

    try {
      if (firstname == '') throw 'First name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(firstname)) throw 'First name should only have letters';
      if (lastname == '') throw 'Last name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(lastname)) throw 'Last name should only have letters';
      if (email == '') throw 'Email cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isEmail)(email)) throw 'Email is invalid';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/edit`, {
        body: {
          firstname,
          lastname,
          email,
          policemanId: $('#edit-id').val()
        }
      });
      if (response.successful) return location.reload(true);
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_2__["default"])('edit-policeman-error', e);
    }
  }

  static async getPolicemanDetails(policemanId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/${policemanId}/fetch`);
    return response.policeman;
  }

  static async getPoliceAdminByStation(policeStationId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/admin/${policeStationId}/fetch/station`);
    return response.policeman;
  }

  static async getPolicemenByStation() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/fetch/station`);

    if (response.policemen && response.policemen.length > 0) {
      $('#policemen').show();
      $('#no-policemen').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_1__.formatPolicemen)(response.policemen);
    }

    $('#policemen').hide();
    $('#no-policemen').show();
  }

  static async getAllPolicemen() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/fetch/all`);

    if (response.policemen && response.policemen.length > 0) {
      $('#policemen').show();
      $('#no-policemen').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_1__.formatAdminPolicemen)(response.policemen);
    }

    $('#policemen').hide();
    $('#no-policemen').show();
  }

  static async searchPolicemen(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/search?q=${searchValue}`);

    if (response.policemen && response.policemen.length > 0) {
      $('#policemen').show();
      $('#no-policemen').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_1__.formatPolicemen)(response.policemen);
    }

    $('#policemen').hide();
    $('#no-policemen').show();
  }

  static async adminRemovePolice(policemanId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/${policemanId}/remove/admin`);
    if (response.successful) return location.reload(true);
  }

  static async removePoliceAgent(policemanId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/${policemanId}/remove`);
    if (response.successful) return location.reload(true);
  }

  static async searchAdminPolicemen(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police/search/admin?q=${searchValue}`);

    if (response.policemen && response.policemen.length > 0) {
      $('#policemen').show();
      $('#no-policemen').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_1__.formatAdminPolicemen)(response.policemen);
    }

    $('#policemen').hide();
    $('#no-policemen').show();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PoliceAuth);

/***/ }),

/***/ "./public/assets/js/src/auth/PoliceStation.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/auth/PoliceStation.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");
/* harmony import */ var _helpers_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/format */ "./public/assets/js/src/helpers/format.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");





class PoliceStation {
  static async addPoliceStation() {
    try {
      const policeStationDetails = {
        policeStationName: $('#police-station-name').val(),
        policeStationAddress: $('#police-station-address').val(),
        targetPoliceStation
      };
      const policemanDetails = {
        adminFirstname: $('#pol-admin-first-name').val(),
        adminLastname: $('#pol-admin-last-name').val(),
        adminEmail: $('#pol-admin-email').val()
      };
      if (policeStationDetails.policeStationName == '') throw 'Police name cannot be empty!';else if ("`~!@#$%^&*()+=[]{};:'<>,./?|\\\"1234567890".includes(policeStationDetails.policeStationName)) throw 'Police name should not include special characters or numbers';
      if (policeStationDetails.policeStationAddress == '') throw 'Police address cannot be empty';else if ("`~!@#$%^&*()+=[]{};:<>./?|\\".includes(policeStationDetails.policeStationAddress)) throw 'Police address should not include special characters execept \' or ,';
      if (policemanDetails.adminFirstname == '') throw 'First name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(policemanDetails.adminFirstname)) throw 'First name should only have letters';
      if (policemanDetails.adminLastname == '') throw 'Last name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(policemanDetails.adminLastname)) throw 'Last name should only have letters';
      if (policemanDetails.adminEmail == '') throw 'Email cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isEmail)(policemanDetails.adminEmail)) throw 'Email is invalid';
      if (!targetPoliceStation) throw 'Select police station';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/police-station/add', {
        body: {
          policeStationDetails,
          policemanDetails
        }
      });

      if (response.successful) {
        location.reload(true);
        return;
      }

      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_1__["default"])('new-police-error', response.error);
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_1__["default"])('new-police-error', e);
    }
  }

  static async editPoliceStation() {
    const policeStationDetails = {
      policeStationName: $('#edit-police-station-name').val(),
      policeStationAddress: $('#edit-police-station-address').val()
    };
    const policemanDetails = {
      adminFirstname: $('#edit-pol-admin-first-name').val(),
      adminLastname: $('#edit-pol-admin-last-name').val(),
      adminEmail: $('#edit-pol-admin-email').val(),
      policemandId: $('#edit-police-man-id').val()
    };
    if (policeStationDetails.policeStationName == '') throw 'Police name cannot be empty!';else if ("`~!@#$%^&*()+=[]{};:'<>,./?|\\\"1234567890".includes(policeStationDetails.policeStationName)) throw 'Police name should not include special characters or numbers';
    if (policeStationDetails.policeStationAddress == '') throw 'Police address cannot be empty';else if ("`~!@#$%^&*()+=[]{};:<>./?|\\".includes(policeStationDetails.policeStationAddress)) throw 'Police address should not include special characters execept \' or ,';
    if (policemanDetails.adminFirstname == '') throw 'First name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(policemanDetails.adminFirstname)) throw 'First name should only have letters';
    if (policemanDetails.adminLastname == '') throw 'Last name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(policemanDetails.adminLastname)) throw 'Last name should only have letters';
    if (policemanDetails.adminEmail == '') throw 'Email cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isEmail)(policemanDetails.adminEmail)) throw 'Email is invalid';
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police-station/${$('#edit-police-station-id').val()}/update`, {
      body: {
        policeStationDetails,
        policemanDetails
      }
    });

    if (response.successful) {
      location.reload(true);
      return;
    }

    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_1__["default"])('edit-police-error', response.error);
  }

  static async deletePoliceStation(policeId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police-station/${policeId}/delete`);
    if (response.successful) return location.reload(true);
  }

  static async getPoliceStationDetails(policeId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police-station/${policeId}/fetch`);
    return response.policeStation;
  }

  static async getPoliceStations() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/police-stations/fetch');

    if (response.policeStations && response.policeStations.length > 0) {
      $('#registered-police-stations').show();
      $('#no-police-stations').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_2__.formatPoliceStations)(response.policeStations);
    }

    $('#registered-police-stations').hide();
    $('#no-police-stations').show();
  }

  static async searchAdminPoliceStations(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/police-stations/search/admin?q=${searchValue}`);

    if (response.policeStations && response.policeStations.length > 0) {
      $('#registered-police-stations').show();
      $('#no-police-stations').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_2__.formatPoliceStations)(response.policeStations);
    }

    $('#registered-police-stations').hide();
    $('#no-police-stations').show();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PoliceStation);

/***/ }),

/***/ "./public/assets/js/src/auth/Report.js":
/*!*********************************************!*\
  !*** ./public/assets/js/src/auth/Report.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");
/* harmony import */ var _helpers_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/format */ "./public/assets/js/src/helpers/format.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");





class ReportAuth {
  static async submitReport() {
    const formData = new FormData();

    for (const file of $('#report-files')[0].files) {
      formData.append('reportFiles[]', file);
    }

    const typeOfCrime = $('#crime-witnessed').val();
    const descriptionOfEvents = $('#description-of-events').val();
    formData.append('typeOfCrime', typeOfCrime);
    formData.append('descriptionOfEvents', descriptionOfEvents);
    formData.append('locationOfCrime', JSON.stringify(targetCrimeScene));

    try {
      if (typeOfCrime == '') throw 'Please fill in type of crime';else if ((0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.hasNumbers)(typeOfCrime) || (0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isSpecialChar)(typeOfCrime)) throw 'Type of crime cannot contain any special characters or numbers';
      if (descriptionOfEvents == '') throw 'Please describe the crime';
      $.ajax({
        url: '/report/submit',
        data: formData,
        enctype: 'mutipart/form-data',
        method: 'POST',
        processData: false,
        contentType: false,
        success: response => {
          if (response.successful) {
            location.reload(true);
            return;
          }

          (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_1__["default"])('new-report-error', response.error);
        }
      });
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_1__["default"])('new-report-error', e);
    }
  }

  static async getResidentReports() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/reports/fetch/resident');

    if (response.reports && response.reports.length > 0) {
      $('#reported-crimes').show();
      $('#no-reports').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_2__.formatResidentReports)(response.reports);
    }

    $('#reported-crimes').hide();
    $('#no-reports').show();
  }

  static async searchResidentReports(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/reports/search/resident?q=${searchValue}`);

    if (response.reports && response.reports.length > 0) {
      $('#reported-crimes').show();
      $('#no-reports').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_2__.formatResidentReports)(response.reports);
    }

    $('#reported-crimes').hide();
    $('#no-reports').show();
  }

  static async getPoliceReports() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/reports/fetch/police');

    if (response.reports && response.reports.length > 0) {
      $('#reported-crimes').show();
      $('#no-reports').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_2__.formatPoliceReports)(response.reports);
    }

    $('#reported-crimes').hide();
    $('#no-reports').show();
  }

  static async searchPoliceReports(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/reports/search/police?q=${searchValue}`);

    if (response.reports && response.reports.length > 0) {
      $('#reported-crimes').show();
      $('#no-reports').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_2__.formatPoliceReports)(response.reports);
    }

    $('#reported-crimes').hide();
    $('#no-reports').show();
  }

  static async getAdminReports() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/reports/fetch/all');

    if (response.reports && response.reports.length > 0) {
      $('#reports').show();
      $('#no-reports').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_2__.formatAdminReports)(response.reports);
    }

    $('#reports').hide();
    $('#no-reports').show();
  }

  static async searchAdminReports(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/reports/search/admin?q=${searchValue}`);

    if (response.reports && response.reports.length > 0) {
      $('#reports').show();
      $('#no-reports').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_2__.formatAdminReports)(response.reports);
    }

    $('#reports').hide();
    $('#no-reports').show();
  }

  static async investigate(reportId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/report/${reportId}/investigate`);
    if (response.successful) return location.reload(true);
    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_1__["default"])('crime-report-modal-error', response.error);
  }

  static async decline(reportId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/report/${reportId}/decline`);
    if (response.successful) return location.reload(true);
    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_1__["default"])('crime-report-modal-error', response.error);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReportAuth);

/***/ }),

/***/ "./public/assets/js/src/auth/Resident.js":
/*!***********************************************!*\
  !*** ./public/assets/js/src/auth/Resident.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/format */ "./public/assets/js/src/helpers/format.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");





class ResidentAuth {
  static async signUp() {
    const residentDetails = {
      firstname: $('#res-first-name').val(),
      lastname: $('#res-last-name').val(),
      email: $('#res-email-address').val(),
      password: $('#res-password').val(),
      passwordConfirmation: $('#res-con-password').val()
    };

    try {
      if (residentDetails.firstname == '') throw 'First name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(residentDetails.firstname)) throw 'First name contains numbers or special characters';
      if (residentDetails.lastname == '') throw 'Last name cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isAlpha)(residentDetails.lastname)) throw 'Last name contains numbers or special characters';
      if (residentDetails.email == '') throw 'Email cannot be empty';else if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.isEmail)(residentDetails.email)) throw 'Email is invalid';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/resident/sign-up', {
        body: residentDetails
      });

      if (response.successful) {
        location.href = response.redirect;
        return;
      }

      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_2__["default"])('resident-sign-up-error', e);
    }
  }

  static async signIn() {
    const residentDetails = {
      email: $('#email-address').val(),
      password: $('#password').val()
    };
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/resident/sign-in', {
      body: residentDetails
    });

    if (response.successful) {
      location.href = response.redirect;
      return;
    }

    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_2__["default"])('sign-in-error', response.error);
  }

  static async getAdminResidents() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/residents/fetch/all');

    if (response.residents && response.residents.length > 0) {
      $('#residents').show();
      $('#no-residents').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_1__.formatAdminResidents)(response.residents);
    }

    $('#residents').hide();
    $('#no-residents').show();
  }

  static async searchAdminResidents(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/residents/search/admin?q=${searchValue}`);

    if (response.residents && response.residents.length > 0) {
      $('#residents').show();
      $('#no-residents').hide();
      return (0,_helpers_format__WEBPACK_IMPORTED_MODULE_1__.formatAdminResidents)(response.residents);
    }

    $('#residents').hide();
    $('#no-residents').show();
  }

  static async deleteResident(residentId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/resident/${residentId}/delete`);
    if (response.successful) return location.reload(true);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResidentAuth);

/***/ }),

/***/ "./public/assets/js/src/events/admin/index.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/events/admin/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _police_stations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./police-stations */ "./public/assets/js/src/events/admin/police-stations.js");
/* harmony import */ var _policemen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./policemen */ "./public/assets/js/src/events/admin/policemen.js");
/* harmony import */ var _reports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reports */ "./public/assets/js/src/events/admin/reports.js");
/* harmony import */ var _residents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./residents */ "./public/assets/js/src/events/admin/residents.js");
/* harmony import */ var _sign_in__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sign-in */ "./public/assets/js/src/events/admin/sign-in.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_police_stations__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_policemen__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_reports__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_residents__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_sign_in__WEBPACK_IMPORTED_MODULE_4__["default"])();
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/police-stations.js":
/*!**************************************************************!*\
  !*** ./public/assets/js/src/events/admin/police-stations.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_PoliceStation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/PoliceStation */ "./public/assets/js/src/auth/PoliceStation.js");
/* harmony import */ var _auth_Police__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../auth/Police */ "./public/assets/js/src/auth/Police.js");
/* harmony import */ var _helpers_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/modal */ "./public/assets/js/src/helpers/modal.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'admin-police-stations') return;
  $('#admin-police-station-form').on('submit', async e => {
    e.preventDefault();
    await _auth_PoliceStation__WEBPACK_IMPORTED_MODULE_0__["default"].addPoliceStation();
  });
  $('#edit-admin-police-station-form').on('submit', async e => {
    e.preventDefault();
    await _auth_PoliceStation__WEBPACK_IMPORTED_MODULE_0__["default"].editPoliceStation();
  });
  $('#registered-police-stations').html(await _auth_PoliceStation__WEBPACK_IMPORTED_MODULE_0__["default"].getPoliceStations());
  $('#police-stations-search-box').on('keyup', async e => {
    const searchValue = e.currentTarget.value;
    if (searchValue.length < 3) return $('#registered-police-stations').html(await _auth_PoliceStation__WEBPACK_IMPORTED_MODULE_0__["default"].getPoliceStations());
    $('#registered-police-stations').html(await _auth_PoliceStation__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminPoliceStations(searchValue));
  });
  $('.table__body__row__item__delete').on('click', async e => {
    const policeStationId = e.currentTarget.parentElement.parentElement.dataset.policestationid;
    await _auth_PoliceStation__WEBPACK_IMPORTED_MODULE_0__["default"].deletePoliceStation(policeStationId);
  });
  $('.table__body__row__item__edit').on('click', async e => {
    const policeStationId = e.currentTarget.parentElement.parentElement.dataset.policestationid;
    const policeAdmin = await _auth_Police__WEBPACK_IMPORTED_MODULE_1__["default"].getPoliceAdminByStation(policeStationId);
    $('#edit-police-station-name').val(policeAdmin.policeStationID.name);
    $('#edit-police-station-id').val(policeAdmin.policeStationID._id);
    $('#edit-police-man-id').val(policeAdmin._id);
    $('#edit-police-station-address').val(policeAdmin.policeStationID.address);
    $('#edit-pol-admin-first-name').val(policeAdmin.firstname);
    $('#edit-pol-admin-last-name').val(policeAdmin.lastname);
    $('#edit-pol-admin-email').val(policeAdmin.email);
    (0,_helpers_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('edit-police-station');
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/policemen.js":
/*!********************************************************!*\
  !*** ./public/assets/js/src/events/admin/policemen.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Police__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Police */ "./public/assets/js/src/auth/Police.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'admin-policemen') return;
  $('#policemen').html(await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].getAllPolicemen());
  $('#policemen-search-box').on('keyup', async e => {
    const searchValue = e.currentTarget.value;
    if (searchValue.length < 3) return $('#policemen').html(await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].getAllPolicemen());
    $('#policemen').html(await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminPolicemen(searchValue));
  });
  $('.table__body__row__item__delete').on('click', async e => {
    const policemanId = e.currentTarget.parentElement.parentElement.dataset.policemanid;
    await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].adminRemovePolice(policemanId);
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/reports.js":
/*!******************************************************!*\
  !*** ./public/assets/js/src/events/admin/reports.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Report__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Report */ "./public/assets/js/src/auth/Report.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'admin-reports') return;
  $('#reports').html(await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].getAdminReports());
  $('#reports-search-box').on('keyup', async e => {
    const searchValue = e.currentTarget.value;
    if (searchValue.length < 3) return $('#reports').html(await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].getAdminReports());
    $('#reports').html(await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminReports(searchValue));
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/residents.js":
/*!********************************************************!*\
  !*** ./public/assets/js/src/events/admin/residents.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Resident__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Resident */ "./public/assets/js/src/auth/Resident.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'admin-residents') return;
  $('#residents').html(await _auth_Resident__WEBPACK_IMPORTED_MODULE_0__["default"].getAdminResidents());
  $('#residents-search-box').on('keyup', async e => {
    const searchValue = e.currentTarget.value;
    if (searchValue.length < 3) return $('#residents').html(await _auth_Resident__WEBPACK_IMPORTED_MODULE_0__["default"].getAdminResidents());
    $('#residents').html(await _auth_Resident__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminResidents(searchValue));
  });
  $('.table__body__row__item__delete').on('click', async e => {
    const residentId = e.currentTarget.parentElement.parentElement.dataset.residentid;
    await _auth_Resident__WEBPACK_IMPORTED_MODULE_0__["default"].deleteResident(residentId);
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/sign-in.js":
/*!******************************************************!*\
  !*** ./public/assets/js/src/events/admin/sign-in.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Admin */ "./public/assets/js/src/auth/Admin.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'admin-sign-in') return;
  $('#admin-sign-in-form').on('submit', async e => {
    e.preventDefault();
    await _auth_Admin__WEBPACK_IMPORTED_MODULE_0__["default"].signIn();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/index.js":
/*!**********************************************!*\
  !*** ./public/assets/js/src/events/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin */ "./public/assets/js/src/events/admin/index.js");
/* harmony import */ var _resident__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resident */ "./public/assets/js/src/events/resident/index.js");
/* harmony import */ var _police__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./police */ "./public/assets/js/src/events/police/index.js");
/* harmony import */ var _sign_in__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sign-in */ "./public/assets/js/src/events/sign-in.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_admin__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_resident__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_police__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_sign_in__WEBPACK_IMPORTED_MODULE_3__["default"])();
  $('.sidenav__top__item__icon--toggle-menu').on('click', e => {
    const sidenav = $('.sidenav'),
          container = $('.page-container__main'),
          header = $('.main-header');

    if (Array.from(sidenav[0].classList).includes('sidenav--closed')) {
      sidenav.addClass('sidenav--open');
      sidenav.removeClass('sidenav--closed');
      container.removeClass('page-container__main--nav-closed');
      container.addClass('page-container__main--nav-open');
      header.removeClass('main-header--nav-closed');
      header.addClass('main-header--nav-open');
      return;
    }

    sidenav.removeClass('sidenav--open');
    sidenav.addClass('sidenav--closed');
    container.addClass('page-container__main--nav-closed');
    container.removeClass('page-container__main--nav-open');
    header.addClass('main-header--nav-closed');
    header.removeClass('main-header--nav-open');
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/police/index.js":
/*!*****************************************************!*\
  !*** ./public/assets/js/src/events/police/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sign_in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sign-in */ "./public/assets/js/src/events/police/sign-in.js");
/* harmony import */ var _reports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reports */ "./public/assets/js/src/events/police/reports.js");
/* harmony import */ var _policemen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./policemen */ "./public/assets/js/src/events/police/policemen.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_sign_in__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_reports__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_policemen__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

/***/ }),

/***/ "./public/assets/js/src/events/police/policemen.js":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/events/police/policemen.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Police__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Police */ "./public/assets/js/src/auth/Police.js");
/* harmony import */ var _helpers_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/modal */ "./public/assets/js/src/helpers/modal.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'police-policemen') return;
  $('#policemen').html(await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].getPolicemenByStation());
  $('#new-policeman-form').on('submit', async e => {
    e.preventDefault();
    await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].addPoliceman();
  });
  $('#policemen-search-box').on('keyup', async e => {
    const searchValue = e.currentTarget.value;
    if (searchValue.length < 3) return $('#policemen').html(await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].getPolicemenByStation());
    $('#policemen').html(await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].searchPolicemen(searchValue));
  });
  $('.table__body__row__item__delete').on('click', async e => {
    const policemanId = e.currentTarget.parentElement.parentElement.dataset.policemanid;
    await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].removePoliceAgent(policemanId);
  });
  $('.table__body__row__item__edit').on('click', async e => {
    const policemanId = e.currentTarget.parentElement.parentElement.dataset.policemanid;
    const policemanDetails = await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].getPolicemanDetails(policemanId);
    $('#edit-pol-first-name').val(policemanDetails.firstname);
    $('#edit-pol-last-name').val(policemanDetails.lastname);
    $('#edit-pol-email').val(policemanDetails.email);
    $('#edit-id').val(policemanId);
    (0,_helpers_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('edit-policeman');
  });
  $('#edit-policeman-form').on('submit', async e => {
    e.preventDefault();
    console.log('Hey');
    await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].editPoliceman();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/police/reports.js":
/*!*******************************************************!*\
  !*** ./public/assets/js/src/events/police/reports.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Report__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Report */ "./public/assets/js/src/auth/Report.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'police-reports') return;
  $('#reported-crimes').html(await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].getPoliceReports());
  $('#reports-search-box').on('keyup', async e => {
    const searchValue = e.currentTarget.value;
    if (searchValue.length < 3) return $('#reported-crimes').html(await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].getPoliceReports());
    $('#reported-crimes').html(await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].searchPoliceReports(searchValue));
  });
  $('.open-pol-report-modal').on('click', e => {
    const reportdata = JSON.parse(e.currentTarget.dataset.reportdata);
    $('#report-id').val(reportdata._id);
    $('#crime-type').text(reportdata.typeOfCrime);
    $('#crime-reporter').text(reportdata.residentID.firstname + ' ' + reportdata.residentID.lastname);
    $('#crime-report-modal').removeClass('modal--closed');
    navigator.geolocation.getCurrentPosition(({
      coords
    }) => {
      calculateRoute(`${coords.latitude},${coords.longitude}`, `${reportdata.locationOfCrime.lat},${reportdata.locationOfCrime.lng}`);
    }, error => {
      console.log(error);
    });
  });
  $('#report-investigate').on('click', e => {
    _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].investigate($('#report-id').val());
  });
  $('#report-decline').on('click', e => {
    _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].decline($('#report-id').val());
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/police/sign-in.js":
/*!*******************************************************!*\
  !*** ./public/assets/js/src/events/police/sign-in.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Police__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Police */ "./public/assets/js/src/auth/Police.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'police-sign-in') return;
  $('#police-sign-in-form').on('submit', async e => {
    e.preventDefault();
    await _auth_Police__WEBPACK_IMPORTED_MODULE_0__["default"].signIn();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/resident/index.js":
/*!*******************************************************!*\
  !*** ./public/assets/js/src/events/resident/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sign_up__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sign-up */ "./public/assets/js/src/events/resident/sign-up.js");
/* harmony import */ var _sign_in__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign-in */ "./public/assets/js/src/events/resident/sign-in.js");
/* harmony import */ var _reports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reports */ "./public/assets/js/src/events/resident/reports.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_sign_up__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_sign_in__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_reports__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

/***/ }),

/***/ "./public/assets/js/src/events/resident/reports.js":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/events/resident/reports.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Report__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Report */ "./public/assets/js/src/auth/Report.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'res-reports') return;
  $('#res-report-form').on('submit', async e => {
    e.preventDefault();
    await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].submitReport();
  });
  $('#reported-crimes').html(await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].getResidentReports());
  $('#reports-search-box').on('keyup', async e => {
    const searchValue = e.currentTarget.value;
    if (searchValue.length < 3) return $('#reported-crimes').html(await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].getResidentReports());
    $('#reported-crimes').html(await _auth_Report__WEBPACK_IMPORTED_MODULE_0__["default"].searchResidentReports(searchValue));
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/resident/sign-in.js":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/events/resident/sign-in.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Resident__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Resident */ "./public/assets/js/src/auth/Resident.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'res-sign-in') return;
  $('#res-sign-in-form').on('submit', e => {
    e.preventDefault();
    _auth_Resident__WEBPACK_IMPORTED_MODULE_0__["default"].signIn();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/resident/sign-up.js":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/events/resident/sign-up.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Resident__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Resident */ "./public/assets/js/src/auth/Resident.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'res-sign-up') return;
  $('#res-sign-up-form').on('submit', e => {
    e.preventDefault();
    _auth_Resident__WEBPACK_IMPORTED_MODULE_0__["default"].signUp();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/sign-in.js":
/*!************************************************!*\
  !*** ./public/assets/js/src/events/sign-in.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/Admin */ "./public/assets/js/src/auth/Admin.js");
/* harmony import */ var _auth_Police__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/Police */ "./public/assets/js/src/auth/Police.js");
/* harmony import */ var _auth_Resident__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/Resident */ "./public/assets/js/src/auth/Resident.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'sign-in') return;
  $('#sign-in-form').on('submit', e => {
    try {
      e.preventDefault();
      const loginOptions = {
        adminAuth: _auth_Admin__WEBPACK_IMPORTED_MODULE_0__["default"],
        policeAuth: _auth_Police__WEBPACK_IMPORTED_MODULE_1__["default"],
        residentAuth: _auth_Resident__WEBPACK_IMPORTED_MODULE_2__["default"]
      };
      const loginType = $('.logger__container__main__form__login-options__option--active')[0].dataset.logintype;
      if (!loginType) throw 'Please select account type';
      loginOptions[`${loginType}Auth`].signIn();
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('sign-in-error', e);
    }
  });
});

/***/ }),

/***/ "./public/assets/js/src/helpers/date.js":
/*!**********************************************!*\
  !*** ./public/assets/js/src/helpers/date.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticDate": () => (/* binding */ getStaticDate)
/* harmony export */ });
const getMonths = () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const makeTime = date => {
  let hours = date.getHours(),
      minutes = date.getMinutes();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let time = hours + ':' + minutes,
      day = date.getDate(),
      month = getMonths()[date.getMonth()],
      year = date.getFullYear().toString();
  return {
    time,
    day,
    month,
    year
  };
};

const getStaticDate = date => {
  const {
    time,
    day,
    month,
    year
  } = makeTime(date);
  return `${time}, ${day} ${month} ${year[2] + year[3]}'`;
};

/***/ }),

/***/ "./public/assets/js/src/helpers/fetch.js":
/*!***********************************************!*\
  !*** ./public/assets/js/src/helpers/fetch.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (uri, {
  method = 'POST',
  headers = {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body
} = {}) => {
  const response = await fetch(uri, {
    method,
    headers,
    body: JSON.stringify(body)
  });
  return await response.json();
});

/***/ }),

/***/ "./public/assets/js/src/helpers/format.js":
/*!************************************************!*\
  !*** ./public/assets/js/src/helpers/format.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatAdminPolicemen": () => (/* binding */ formatAdminPolicemen),
/* harmony export */   "formatAdminReports": () => (/* binding */ formatAdminReports),
/* harmony export */   "formatAdminResidents": () => (/* binding */ formatAdminResidents),
/* harmony export */   "formatPoliceReports": () => (/* binding */ formatPoliceReports),
/* harmony export */   "formatPoliceStations": () => (/* binding */ formatPoliceStations),
/* harmony export */   "formatPolicemen": () => (/* binding */ formatPolicemen),
/* harmony export */   "formatResidentReports": () => (/* binding */ formatResidentReports)
/* harmony export */ });
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date */ "./public/assets/js/src/helpers/date.js");

const formatPoliceStations = policeStations => {
  let formated = '',
      index = 1;
  policeStations.forEach(policeStation => {
    formated += `
            <ul class="table__body__row" data-policestationid="${policeStation._id}">
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${policeStation.name}</li>
                <li class="table__body__row__item">${policeStation.address}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(policeStation.createdAt))}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <span class="table__body__row__item__edit">
                        <svg class="image--icon">
                            <use href="#pencil"></use>
                        </svg>
                    </span>
                    <span class="table__body__row__item__delete">
                        <svg class="image--icon">
                            <use href="#cancel"></use>
                        </svg>
                    </span>
                </li>
            </ul>
        `;
    index++;
  });
  return formated;
};
const formatResidentReports = reports => {
  let formated = '',
      index = 1;
  reports.forEach(report => {
    formated += `
            <ul class="table__body__row">
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${report.typeOfCrime}</li>
                <li class="table__body__row__item">${report.policeStationID.name}</li>
                <li class="table__body__row__item">${report.statusForResident}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(report.createdAt))}</li>
            </ul>
        `;
    index++;
  });
  return formated;
};
const formatPoliceReports = reports => {
  let formated = '',
      index = 1;
  reports.forEach(report => {
    formated += `
            <ul class="table__body__row open-pol-report-modal" data-reportData='${JSON.stringify(report)}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${report.typeOfCrime}</li>
                <li class="table__body__row__item">${report.residentID.firstname + ' ' + report.residentID.lastname}</li>
                <li class="table__body__row__item">${report.statusForPolice}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(report.createdAt))}</li>
            </ul>
        `;
    index++;
  });
  return formated;
};
const formatPolicemen = policemen => {
  let formated = '',
      index = 1;
  policemen.forEach(policeman => {
    formated += `
            <ul class="table__body__row" data-policemanId='${policeman._id}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${policeman.firstname}</li>
                <li class="table__body__row__item">${policeman.lastname}</li>
                <li class="table__body__row__item">${policeman.email}</li>
                <li class="table__body__row__item">${policeman.type}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(policeman.createdAt))}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <span class="table__body__row__item__edit">
                        <svg class="image--icon">
                            <use href="#pencil"></use>
                        </svg>
                    </span>
                    <span class="table__body__row__item__delete">
                        <svg class="image--icon">
                            <use href="#cancel"></use>
                        </svg>
                    </span>
                </li>
            </ul>
        `;
    index++;
  });
  return formated;
};
const formatAdminPolicemen = policemen => {
  let formated = '',
      index = 1;
  policemen.forEach(policeman => {
    formated += `
            <ul class="table__body__row" data-policemanId='${policeman._id}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${policeman.firstname}</li>
                <li class="table__body__row__item">${policeman.lastname}</li>
                <li class="table__body__row__item">${policeman.email}</li>
                <li class="table__body__row__item">${policeman.type}</li>
                <li class="table__body__row__item">${policeman.policeStationID.name}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(policeman.createdAt))}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <span class="table__body__row__item__delete">
                        <svg class="image--icon">
                            <use href="#cancel"></use>
                        </svg>
                    </span>
                </li>
            </ul>
        `;
    index++;
  });
  return formated;
};
const formatAdminResidents = residents => {
  let formated = '',
      index = 1;
  residents.forEach(resident => {
    formated += `
            <ul class="table__body__row" data-residentId='${resident._id}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${resident.firstname}</li>
                <li class="table__body__row__item">${resident.lastname}</li>
                <li class="table__body__row__item">${resident.email}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(resident.createdAt))}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <span class="table__body__row__item__delete">
                        <svg class="image--icon">
                            <use href="#cancel"></use>
                        </svg>
                    </span>
                </li>
            </ul>
        `;
    index++;
  });
  return formated;
};
const formatAdminReports = reports => {
  let formated = '',
      index = 1;
  reports.forEach(report => {
    formated += `
            <ul class="table__body__row" data-reportId='${report._id}'>
                <li class="table__body__row__item short">${index}</li>
                <li class="table__body__row__item">${report.typeOfCrime}</li>
                <li class="table__body__row__item">${report.residentID.firstname + ' ' + report.residentID.lastname}</li>
                <li class="table__body__row__item">${report.policeStationID.name}</li>
                <li class="table__body__row__item">${report.statusForPolice}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(report.createdAt))}</li>
            </ul>
        `;
    index++;
  });
  return formated;
};

/***/ }),

/***/ "./public/assets/js/src/helpers/modal.js":
/*!***********************************************!*\
  !*** ./public/assets/js/src/helpers/modal.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
const closeModal = id => {
  const modal = $(`#${id}-modal`);
  modal.addClass('modal--closed');
  setTimeout(() => modal.remove(), 300);
};
const openModal = id => {
  const modal = $(`#${id}-modal`);
  modal.removeClass('modal--closed');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  $('.open-modal').on('click', e => {
    $(`#${e.currentTarget.dataset.modal}-modal`).removeClass('modal--closed');
  });
  $('.close-modal').on('click', e => {
    const modal = $(`#${e.currentTarget.dataset.modal}-modal`);
    modal.addClass('modal--closed');
  });
});

/***/ }),

/***/ "./public/assets/js/src/helpers/show-error.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/helpers/show-error.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((parentId, error) => {
  const parent = $(`#${parentId}`);
  parent.show();
  $('.error-container__p__text', parent[0]).html(error);
});

/***/ }),

/***/ "./public/assets/js/src/helpers/validation.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/helpers/validation.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasNumbers": () => (/* binding */ hasNumbers),
/* harmony export */   "hasSpecialChars": () => (/* binding */ hasSpecialChars),
/* harmony export */   "isAlpha": () => (/* binding */ isAlpha),
/* harmony export */   "isEmail": () => (/* binding */ isEmail),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isSpecialChar": () => (/* binding */ isSpecialChar),
/* harmony export */   "isWhitespace": () => (/* binding */ isWhitespace)
/* harmony export */ });
const isAlpha = str => /^[A-Za-z]+$/.test(str);
const isNumber = str => /^\d+$/.test(str);
const hasNumbers = str => /\d/g.test(str);
const isWhitespace = str => /\s/g.test(str);
const isEmail = str => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
const isSpecialChar = str => /[^a-zA-Z0-9 ]/.test(str);
const hasSpecialChars = str => /[a-zA-Z0-9 ]/g.test(str);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./public/assets/js/src/app.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./public/assets/js/src/events/index.js");
/* harmony import */ var _helpers_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/modal */ "./public/assets/js/src/helpers/modal.js");


(0,_events__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_helpers_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;