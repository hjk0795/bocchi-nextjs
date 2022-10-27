"use strict";
(() => {
var exports = {};
exports.id = 964;
exports.ids = [964];
exports.modules = {

/***/ 7096:
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3745:
/***/ ((module) => {

module.exports = import("firebase/app");;

/***/ }),

/***/ 1492:
/***/ ((module) => {

module.exports = import("firebase/firestore");;

/***/ }),

/***/ 6786:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SignUp)
/* harmony export */ });
/* harmony import */ var _utils_connectFirestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9809);
/* harmony import */ var _models_accountModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2980);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7096);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_0__]);
_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function SignUp(req, res) {
    try {
        await (0,_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
        _models_accountModel__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            email: req.body.email
        }, function(err, account) {
            if (err) {
                console.log(err);
            } else {
                if (!account) {
                    bcrypt__WEBPACK_IMPORTED_MODULE_2___default().hash(req.body.password, 10, function(err, hash) {
                        const account = new _models_accountModel__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
                            email: req.body.email,
                            password: hash
                        });
                        account.save();
                        res.redirect("/dashboard");
                    });
                } else {
                    res.status(400).send("Account already exists");
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [349], () => (__webpack_exec__(6786)));
module.exports = __webpack_exports__;

})();