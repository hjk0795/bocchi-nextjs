"use strict";
exports.id = 349;
exports.ids = [349];
exports.modules = {

/***/ 2980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const accountSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    email: String,
    password: String
});
const Account = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.Account || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)("Account", accountSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Account);


/***/ }),

/***/ 9809:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


async function connectFirestore() {
    const firebaseConfig = {
        apiKey: process.env.API_KEY_FIREBASE,
        authDomain: "bocchi-cd32c.firebaseapp.com",
        databaseURL: "https://bocchi-cd32c-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "bocchi-cd32c",
        storageBucket: "bocchi-cd32c.appspot.com",
        messagingSenderId: "429017394127",
        appId: "1:429017394127:web:97bf9a991af175637340ba",
        measurementId: "G-HW15LB2E2F"
    };
    const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
    // const analytics = getAnalytics(app);
    const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);
    return [
        app,
        db
    ];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectFirestore);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;