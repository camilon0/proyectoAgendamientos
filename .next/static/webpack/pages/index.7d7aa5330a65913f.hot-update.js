"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./app/services/api.js":
/*!*****************************!*\
  !*** ./app/services/api.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createActivity: () => (/* binding */ createActivity),\n/* harmony export */   deleteActivity: () => (/* binding */ deleteActivity),\n/* harmony export */   fetchActivities: () => (/* binding */ fetchActivities),\n/* harmony export */   updateActivity: () => (/* binding */ updateActivity)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _apiConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiConfig */ \"./app/services/apiConfig.js\");\n\n\n// Crear instancia de Axios\nconst axiosInstance = axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create({\n    baseURL: _apiConfig__WEBPACK_IMPORTED_MODULE_0__.API_ROUTES.baseURL,\n    headers: {\n        \"Content-Type\": \"application/json\"\n    }\n});\n// Interceptor para manejar errores globalmente\naxiosInstance.interceptors.response.use((response)=>response, (error)=>{\n    console.error(\"API Error:\", error.message);\n    return Promise.reject(error);\n});\n// Obtener las actividades\nconst fetchActivities = async ()=>{\n    const response = await axiosInstance.get(_apiConfig__WEBPACK_IMPORTED_MODULE_0__.API_ROUTES.listActivities);\n    return response.data;\n};\n// Crear una nueva actividad\nconst createActivity = async (activity)=>{\n    const response = await axiosInstance.post(_apiConfig__WEBPACK_IMPORTED_MODULE_0__.API_ROUTES.createActivity, activity);\n    return response.data;\n};\n// Editar una actividad existente\nconst updateActivity = async (activityId1, updatedActivity)=>{\n    const response = await axiosInstance.put(_apiConfig__WEBPACK_IMPORTED_MODULE_0__.API_ROUTES.editActivity(activityId1), updatedActivity);\n    return response.data;\n};\n// Eliminar una actividad\nconst deleteActivity = async (activityId1)=>{\n    await axiosInstance.delete(_apiConfig__WEBPACK_IMPORTED_MODULE_0__.API_ROUTES.deleteActivity(activityId1));\n};\nconsole.log(\"Deleting activity with URL:\", _apiConfig__WEBPACK_IMPORTED_MODULE_0__.API_ROUTES.deleteActivity(activityId));\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvc2VydmljZXMvYXBpLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEwQjtBQUNlO0FBRXpDLDJCQUEyQjtBQUMzQixNQUFNRSxnQkFBZ0JGLDZDQUFLQSxDQUFDRyxNQUFNLENBQUM7SUFDakNDLFNBQVNILGtEQUFVQSxDQUFDRyxPQUFPO0lBQzNCQyxTQUFTO1FBQ1AsZ0JBQWdCO0lBQ2xCO0FBQ0Y7QUFFQSwrQ0FBK0M7QUFDL0NILGNBQWNJLFlBQVksQ0FBQ0MsUUFBUSxDQUFDQyxHQUFHLENBQ3JDLENBQUNELFdBQWFBLFVBQ2QsQ0FBQ0U7SUFDQ0MsUUFBUUQsS0FBSyxDQUFDLGNBQWNBLE1BQU1FLE9BQU87SUFDekMsT0FBT0MsUUFBUUMsTUFBTSxDQUFDSjtBQUN4QjtBQUdGLDBCQUEwQjtBQUNuQixNQUFNSyxrQkFBa0I7SUFDN0IsTUFBTVAsV0FBVyxNQUFNTCxjQUFjYSxHQUFHLENBQUNkLGtEQUFVQSxDQUFDZSxjQUFjO0lBQ2xFLE9BQU9ULFNBQVNVLElBQUk7QUFDdEIsRUFBRTtBQUVGLDRCQUE0QjtBQUNyQixNQUFNQyxpQkFBaUIsT0FBT0M7SUFDbkMsTUFBTVosV0FBVyxNQUFNTCxjQUFja0IsSUFBSSxDQUN2Q25CLGtEQUFVQSxDQUFDaUIsY0FBYyxFQUN6QkM7SUFFRixPQUFPWixTQUFTVSxJQUFJO0FBQ3RCLEVBQUU7QUFFRixpQ0FBaUM7QUFDMUIsTUFBTUksaUJBQWlCLE9BQU9DLGFBQVlDO0lBQy9DLE1BQU1oQixXQUFXLE1BQU1MLGNBQWNzQixHQUFHLENBQ3RDdkIsa0RBQVVBLENBQUN3QixZQUFZLENBQUNILGNBQ3hCQztJQUVGLE9BQU9oQixTQUFTVSxJQUFJO0FBQ3RCLEVBQUU7QUFFRix5QkFBeUI7QUFDbEIsTUFBTVMsaUJBQWlCLE9BQU9KO0lBQ25DLE1BQU1wQixjQUFjeUIsTUFBTSxDQUFDMUIsa0RBQVVBLENBQUN5QixjQUFjLENBQUNKO0FBQ3ZELEVBQUU7QUFDRlosUUFBUWtCLEdBQUcsQ0FDVCwrQkFDQTNCLGtEQUFVQSxDQUFDeUIsY0FBYyxDQUFDSiIsInNvdXJjZXMiOlsiRDpcXDEwLk1ha2FpYUNsb3VkXFxQcm95ZWN0b0FnZW5kYW1pZW50b0NpdGFzXFxmcm9udEFnZW5kYW1pZW50b3NcXGFwcFxcc2VydmljZXNcXGFwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IEFQSV9ST1VURVMgfSBmcm9tIFwiLi9hcGlDb25maWdcIjtcclxuXHJcbi8vIENyZWFyIGluc3RhbmNpYSBkZSBBeGlvc1xyXG5jb25zdCBheGlvc0luc3RhbmNlID0gYXhpb3MuY3JlYXRlKHtcclxuICBiYXNlVVJMOiBBUElfUk9VVEVTLmJhc2VVUkwsIC8vIERlZmluZSB1bmEgY2xhdmUgYmFzZVVSTCBlbiBhcGlDb25maWdcclxuICBoZWFkZXJzOiB7XHJcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIEludGVyY2VwdG9yIHBhcmEgbWFuZWphciBlcnJvcmVzIGdsb2JhbG1lbnRlXHJcbmF4aW9zSW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShcclxuICAocmVzcG9uc2UpID0+IHJlc3BvbnNlLFxyXG4gIChlcnJvcikgPT4ge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkFQSSBFcnJvcjpcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gIH1cclxuKTtcclxuXHJcbi8vIE9idGVuZXIgbGFzIGFjdGl2aWRhZGVzXHJcbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2aXRpZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvc0luc3RhbmNlLmdldChBUElfUk9VVEVTLmxpc3RBY3Rpdml0aWVzKTtcclxuICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxufTtcclxuXHJcbi8vIENyZWFyIHVuYSBudWV2YSBhY3RpdmlkYWRcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUFjdGl2aXR5ID0gYXN5bmMgKGFjdGl2aXR5KSA9PiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvc0luc3RhbmNlLnBvc3QoXHJcbiAgICBBUElfUk9VVEVTLmNyZWF0ZUFjdGl2aXR5LFxyXG4gICAgYWN0aXZpdHlcclxuICApO1xyXG4gIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG59O1xyXG5cclxuLy8gRWRpdGFyIHVuYSBhY3RpdmlkYWQgZXhpc3RlbnRlXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVBY3Rpdml0eSA9IGFzeW5jIChhY3Rpdml0eUlkLCB1cGRhdGVkQWN0aXZpdHkpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zSW5zdGFuY2UucHV0KFxyXG4gICAgQVBJX1JPVVRFUy5lZGl0QWN0aXZpdHkoYWN0aXZpdHlJZCksXHJcbiAgICB1cGRhdGVkQWN0aXZpdHlcclxuICApO1xyXG4gIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG59O1xyXG5cclxuLy8gRWxpbWluYXIgdW5hIGFjdGl2aWRhZFxyXG5leHBvcnQgY29uc3QgZGVsZXRlQWN0aXZpdHkgPSBhc3luYyAoYWN0aXZpdHlJZCkgPT4ge1xyXG4gIGF3YWl0IGF4aW9zSW5zdGFuY2UuZGVsZXRlKEFQSV9ST1VURVMuZGVsZXRlQWN0aXZpdHkoYWN0aXZpdHlJZCkpO1xyXG59O1xyXG5jb25zb2xlLmxvZyhcclxuICBcIkRlbGV0aW5nIGFjdGl2aXR5IHdpdGggVVJMOlwiLFxyXG4gIEFQSV9ST1VURVMuZGVsZXRlQWN0aXZpdHkoYWN0aXZpdHlJZClcclxuKTtcclxuIl0sIm5hbWVzIjpbImF4aW9zIiwiQVBJX1JPVVRFUyIsImF4aW9zSW5zdGFuY2UiLCJjcmVhdGUiLCJiYXNlVVJMIiwiaGVhZGVycyIsImludGVyY2VwdG9ycyIsInJlc3BvbnNlIiwidXNlIiwiZXJyb3IiLCJjb25zb2xlIiwibWVzc2FnZSIsIlByb21pc2UiLCJyZWplY3QiLCJmZXRjaEFjdGl2aXRpZXMiLCJnZXQiLCJsaXN0QWN0aXZpdGllcyIsImRhdGEiLCJjcmVhdGVBY3Rpdml0eSIsImFjdGl2aXR5IiwicG9zdCIsInVwZGF0ZUFjdGl2aXR5IiwiYWN0aXZpdHlJZCIsInVwZGF0ZWRBY3Rpdml0eSIsInB1dCIsImVkaXRBY3Rpdml0eSIsImRlbGV0ZUFjdGl2aXR5IiwiZGVsZXRlIiwibG9nIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./app/services/api.js\n"));

/***/ })

});