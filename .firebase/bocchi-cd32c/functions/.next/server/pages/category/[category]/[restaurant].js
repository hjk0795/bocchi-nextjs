(() => {
var exports = {};
exports.id = 480;
exports.ids = [480];
exports.modules = {

/***/ 8522:
/***/ ((module) => {

// Exports
module.exports = {
	"textareaContainer": "detailCard_textareaContainer__ZRYXf"
};


/***/ }),

/***/ 7521:
/***/ ((module) => {

// Exports
module.exports = {
	"cardText": "review_cardText__IsbF4",
	"BiEdit": "review_BiEdit__82AI6",
	"BsTrash": "review_BsTrash__RlGF3"
};


/***/ }),

/***/ 5068:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ DetailCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _review__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4734);
/* harmony import */ var react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6964);
/* harmony import */ var react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_imageLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2750);
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4336);
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3819);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _detailCard_module_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8522);
/* harmony import */ var _detailCard_module_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_detailCard_module_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _mui_material_Rating__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(802);
/* harmony import */ var _mui_material_Rating__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Rating__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3745);
/* harmony import */ var _utils_connectFirestore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1743);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_review__WEBPACK_IMPORTED_MODULE_1__, firebase_app__WEBPACK_IMPORTED_MODULE_10__, _utils_connectFirestore__WEBPACK_IMPORTED_MODULE_11__, firebase_firestore__WEBPACK_IMPORTED_MODULE_12__]);
([_review__WEBPACK_IMPORTED_MODULE_1__, firebase_app__WEBPACK_IMPORTED_MODULE_10__, _utils_connectFirestore__WEBPACK_IMPORTED_MODULE_11__, firebase_firestore__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












// import { getAnalytics } from "firebase/analytics";


function DetailCard(props) {
    const reviewPropArray = props.review.map((foundItem, index)=>{
        return {
            star: foundItem.star,
            review: foundItem.statement,
            userName: foundItem.userName,
            id: foundItem.id
        };
    });
    const { data: session , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_9__.useSession)();
    const name = props.name;
    const { 0: totalCount , 1: setTotalCount  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(props.totalCount);
    const { 0: hasMore , 1: setHasMore  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(true);
    var { 0: reviews , 1: setReviews  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(reviewPropArray);
    const { 0: reviewWrite , 1: setReviewWrite  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)({
        star: null,
        review: "",
        userName: "",
        id: ""
    });
    const { 0: isChecked , 1: setIsChecked  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    async function getMoreReviews() {
        const [app, db] = await (0,_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)();
        const next = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.collection)(db, `restaurants/${name}/reviews`), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.orderBy)("id"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.startAfter)(`${reviews.length}`), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.limit)(1));
        const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.getDocs)(next);
        const nextReview = querySnapshot.docs[0];
        reviews = [
            ...reviews,
            {
                id: nextReview.data().id,
                star: nextReview.data().star,
                review: nextReview.data().statement,
                userName: nextReview.data().userName
            }, 
        ];
        setReviews(reviews);
        setHasMore(reviews.length < totalCount ? true : false);
    }
    function handleChange(event) {
        const { name , value  } = event.target;
        setReviewWrite((prevReviewWrite)=>{
            if (name === "reviewStar") {
                return {
                    star: Number(value),
                    review: prevReviewWrite.text
                };
            } else {
                return {
                    star: prevReviewWrite.star,
                    review: value
                };
            }
        });
    }
    function toggleHidden() {
        setIsChecked(!isChecked);
    }
    const addReview = async (reviewWrite)=>{
        const [app, db] = await (0,_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)();
        if (status === "authenticated") {
            const docRef = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.doc)(db, `restaurants/${name}/reviews`, `${reviews.length + 1}`), {
                id: `${reviews.length + 1}`,
                star: `${reviewWrite.star}`,
                statement: `${reviewWrite.review}`,
                userName: `${session.user.name}`
            });
        } else if (status === "unauthenticated") {
            const docRef1 = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_12__.doc)(db, `restaurants/${name}/reviews`, `${reviews.length + 1}`), {
                id: `${reviews.length + 1}`,
                star: `${reviewWrite.star}`,
                statement: `${reviewWrite.review}`,
                userName: "anonymous"
            });
        }
        console.log("created!");
        totalCount = totalCount + 1;
        setHasMore(true);
    };
    function deleteReview(id) {
        setReviews(reviews.filter((review)=>{
            return review.id !== id;
        }));
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                children: name
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        class: "py-5 text-center container",
                        children: [
                            (0,_utils_imageLoader__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                        href: "https://www.freepik.com/free-vector/hot-dog-restaurant-menu-template-with-illustrations_5059593.htm#query=food%20menu&position=1&from_view=keyword",
                                        passHref: true,
                                        children: "Image by BiZkettE1"
                                    }),
                                    " ",
                                    "on Freepik"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        class: "album py-5 bg-light",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            class: "container",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    class: "row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            class: "col",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                class: "card shadow-sm",
                                                style: {
                                                    height: "100%"
                                                },
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    class: "card-body",
                                                    children: "Google map"
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            class: "col",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                class: "card shadow-sm",
                                                style: {
                                                    height: "100%"
                                                },
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    class: "card-body",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        style: {
                                                            filter: "invert(100%)"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_2___default().Item), {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                    style: {
                                                                        filter: "invert(100%)"
                                                                    },
                                                                    className: "d-block w-100",
                                                                    src: "https://cdn-icons-png.flaticon.com/512/84/84042.png",
                                                                    alt: "First slide"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_2___default().Item), {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                    style: {
                                                                        filter: "invert(100%)"
                                                                    },
                                                                    className: "d-block w-100",
                                                                    src: "https://cdn-icons-png.flaticon.com/512/84/84042.png",
                                                                    alt: "Second slide"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_2___default().Item), {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                    style: {
                                                                        filter: "invert(100%)"
                                                                    },
                                                                    className: "d-block w-100",
                                                                    src: "https://cdn-icons-png.flaticon.com/512/84/84042.png",
                                                                    alt: "Third slide"
                                                                })
                                                            })
                                                        ]
                                                    })
                                                })
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    class: "row",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            class: "col-3 d-flex justify-content-between align-items-center",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Rating__WEBPACK_IMPORTED_MODULE_8___default()), {
                                                name: "reviewStar",
                                                value: reviewWrite.star,
                                                size: "small",
                                                style: {
                                                    padding: "7px 0 0 7px"
                                                },
                                                onChange: handleChange
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            class: "col-9",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                class: "mt-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_detailCard_module_css__WEBPACK_IMPORTED_MODULE_13___default().textareaContainer),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                                            class: "form-control",
                                                            rows: isChecked ? "3" : "1",
                                                            name: "reviewText",
                                                            placeholder: "Write a review",
                                                            onChange: handleChange,
                                                            value: reviewWrite.review,
                                                            onClick: toggleHidden
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                                            variant: "outlined",
                                                            size: "small",
                                                            style: {
                                                                display: isChecked ? "block" : "none"
                                                            },
                                                            onClick: ()=>{
                                                                return addReview(reviewWrite);
                                                            },
                                                            children: "Post"
                                                        })
                                                    ]
                                                })
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_5___default()), {
                                    dataLength: reviews.length,
                                    next: getMoreReviews,
                                    hasMore: hasMore,
                                    loader: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                        children: "Loading..."
                                    }),
                                    endMessage: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "You have seen it all"
                                    }),
                                    children: reviews.map((foundItem, index)=>{
                                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_review__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                                            id: foundItem.id,
                                            star: foundItem.star,
                                            statement: foundItem.review,
                                            userName: foundItem.userName,
                                            isAuthenticated: status,
                                            sessionUserName: status === "authenticated" ? session.user.name : "anonymous",
                                            name: name,
                                            deleteReview: deleteReview
                                        }, index);
                                    })
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("footer", {
                class: "text-muted py-5",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    class: "container",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        class: "float-end mb-1",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "#",
                            children: "Back to top"
                        })
                    })
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4734:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Review)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _review_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7521);
/* harmony import */ var _review_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_review_module_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6652);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_bi__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(567);
/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1492);
/* harmony import */ var _utils_connectFirestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1743);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_4__, _utils_connectFirestore__WEBPACK_IMPORTED_MODULE_5__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_4__, _utils_connectFirestore__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function Review(props) {
    function numToStar(num) {
        var star = "";
        for(let i = 0; i < num; i++){
            star = star + "★";
        }
        return star;
    }
    async function deleteReview() {
        const [app, db] = await (0,_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.deleteDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.doc)(db, `restaurants/${props.name}/reviews`, `${props.id}`));
        alert("Deleted");
        props.deleteReview(props.id);
    }
    async function editReview() {
        const [app, db] = await (0,_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    //   await deleteDoc(doc(db, `restaurants/${props.name}/reviews`, `${props.id}`));
    //   alert("Deleted")
    // props.deleteReview(props.id);
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            class: "row g-3",
            style: {
                paddingTop: "16px"
            },
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    class: "col-3",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        class: "card-text",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "row row-cols-1 g-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                class: "col",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    class: "d-flex justify-content-between align-items-center",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "https://cdn-icons-png.flaticon.com/512/84/84042.png",
                                        width: "100%",
                                        height: "100%",
                                        alt: "table image"
                                    })
                                })
                            })
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    class: "col",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        class: "card shadow-sm",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            class: "card-body",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    class: "d-flex justify-content-between align-items-center",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("small", {
                                            class: "text-muted",
                                            children: numToStar(props.star)
                                        }),
                                        props.isAuthenticated === "authenticated" && props.userName === props.sessionUserName && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("small", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_2__.BiEdit, {
                                                    className: (_review_module_css__WEBPACK_IMPORTED_MODULE_7___default().BiEdit),
                                                    style: {
                                                        marginRight: "5px",
                                                        cursor: "pointer"
                                                    },
                                                    onClick: editReview
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__.BsTrash, {
                                                    className: (_review_module_css__WEBPACK_IMPORTED_MODULE_7___default().BsTrash),
                                                    style: {
                                                        cursor: "pointer"
                                                    },
                                                    onClick: deleteReview
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    class: `card-text ${(_review_module_css__WEBPACK_IMPORTED_MODULE_7___default().cardText)}`,
                                    children: props.statement
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    class: "d-flex justify-content-end align-items-center",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("small", {
                                        class: "text-muted",
                                        children: props.userName
                                    })
                                })
                            ]
                        })
                    })
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7230:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RestaurantList),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_connectFirestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1743);
/* harmony import */ var _components_detailCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5068);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3745);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_1__, _components_detailCard__WEBPACK_IMPORTED_MODULE_2__, firebase_app__WEBPACK_IMPORTED_MODULE_3__, firebase_firestore__WEBPACK_IMPORTED_MODULE_4__]);
([_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_1__, _components_detailCard__WEBPACK_IMPORTED_MODULE_2__, firebase_app__WEBPACK_IMPORTED_MODULE_3__, firebase_firestore__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





// import { getAnalytics } from "firebase/analytics";

async function getStaticPaths() {
    const categoryNames = [
        "sushi",
        "donburi",
        "ramen",
        "burger"
    ];
    const [app, db] = await (0,_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
    const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)(db, "restaurants"));
    const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getDocs)(q);
    const querySnapshotDocs = querySnapshot.docs;
    const docArray = querySnapshotDocs.map((doc, index)=>{
        return doc.data();
    });
    var temp = [];
    categoryNames.map((categoryName)=>{
        for (const element of docArray){
            if (element.category === categoryName) {
                temp.push({
                    params: {
                        category: categoryName,
                        restaurant: element.name
                    }
                });
            }
        }
    });
    const paths = temp;
    return {
        paths,
        fallback: false
    };
}
async function getStaticProps({ params  }) {
    const [app, db] = await (0,_utils_connectFirestore__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
    const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)(db, "restaurants"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.where)("name", "==", `${params.restaurant}`));
    const reviewQ = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)(db, `restaurants/${params.restaurant}/reviews`), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.orderBy)("id"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.limit)(2));
    const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getDocs)(q);
    const reviewSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getDocs)(reviewQ);
    const querySnapshotDocs = querySnapshot.docs;
    const reviewSnapshotDocs = reviewSnapshot.docs;
    const selectedDoc = querySnapshotDocs[0].data();
    const reviewArray = reviewSnapshotDocs.map((doc, index)=>{
        return doc.data();
    });
    const coll = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)(db, `restaurants/${params.restaurant}/reviews`);
    const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getCountFromServer)(coll);
    const totalCount = snapshot.data().count;
    return {
        props: {
            selectedDoc,
            reviewArray,
            totalCount
        }
    };
}
function RestaurantList({ selectedDoc , reviewArray , totalCount ,  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_detailCard__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            name: selectedDoc.name,
            review: reviewArray,
            totalCount: totalCount
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1743:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ }),

/***/ 2750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);


const myLoader = ({ src , width , quality  })=>{
    return `https://img.freepik.com/${src}?w=${width}&q=${quality || 75}`;
};
const MyImage = (props)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
        loader: myLoader,
        src: "free-vector/burger-restaurant-menu-template-with-illustrations_1361-1505.jpg?w=1480&t=st=1665436786~exp=1665437386~hmac=9049ebecc677613bebedaa1c91568398f1da22da7c6c61eea2f4b13b8f54e156",
        alt: "banner",
        width: 900,
        height: 500
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyImage);


/***/ }),

/***/ 3819:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Button");

/***/ }),

/***/ 802:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Rating");

/***/ }),

/***/ 1649:
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6964:
/***/ ((module) => {

"use strict";
module.exports = require("react-bootstrap/Carousel");

/***/ }),

/***/ 6652:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/bi");

/***/ }),

/***/ 567:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/bs");

/***/ }),

/***/ 4336:
/***/ ((module) => {

"use strict";
module.exports = require("react-infinite-scroll-component");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3745:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ 1492:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,664,675], () => (__webpack_exec__(7230)));
module.exports = __webpack_exports__;

})();