var RestClient = {
  get: function (url, callback, error_callback) {

    const token = Utils.get_from_localstorage("token");
    if (!token && (window.location.pathname !== "/final20244/frontend/pages/login.html" || window.location.pathname !== "https://walrus-app-4o96g.ondigitalocean.app/frontend/pages/login.html")) {
      alert("No authentication token found. Redirecting to login page.");
      window.location.href = "pages/login.html";
      return;
    }

    $.ajax({
      url: Constants.get_api_base_url() + url,
      type: "GET",
      beforeSend: function (xhr) {
        const token = Utils.get_from_localstorage("token");
        if (token) {
          xhr.setRequestHeader("Authentication", token);
        }
      },
      success: function (response) {
        if (callback) callback(response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (error_callback) error_callback(jqXHR);
      },
    });
  },
  request: function (url, method, data, callback, error_callback) {

    const token = Utils.get_from_localstorage("token");
    if (!token && (window.location.pathname !== "/final20244/frontend/pages/login.html" || window.location.pathname !== "https://walrus-app-4o96g.ondigitalocean.app/frontend/pages/login.html")) {
      alert("No authentication token found. Redirecting to login page.");
      window.location.href = "pages/login.html";
      return;
    }

    $.ajax({
      url: Constants.get_api_base_url() + url,
      type: method,
      data: data,
      beforeSend: function (xhr) {
        const token = Utils.get_from_localstorage("token");
        if (token) {
          xhr.setRequestHeader("Authentication", token);
        }
      },
    })
      .done(function (response, status, jqXHR) {
        if (callback) callback(response);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        if (error_callback) {
          error_callback(jqXHR);
        } else {
          toastr.error(jqXHR.responseJSON.message);
        }
      });
  },
  post: function (url, data, callback, error_callback) {
    RestClient.request(url, "POST", data, callback, error_callback);
  },
  delete: function (url, data, callback, error_callback) {
    RestClient.request(url, "DELETE", data, callback, error_callback);
  },
  put: function (url, data, callback, error_callback) {
    RestClient.request(url, "PUT", data, callback, error_callback);
  },
};


// var RestClient = {
//   get: function (url, callback, error_callback) {
//     $.ajax({
//       url: Constants.get_api_base_url() + url,
//       type: "GET",
//       beforeSend: function (xhr) {
//         if (Utils.get_from_localstorage("user")) {
//           xhr.setRequestHeader(
//             "Authentication",
//             Utils.get_from_localstorage("user").token
//           );
//         }
//       },
//       success: function (response) {
//         if (callback) callback(response);
//       },
//       error: function (jqXHR, textStatus, errorThrown) {
//         if (error_callback) error_callback(jqXHR);
//       },
//     });
//   },
//   request: function (url, method, data, callback, error_callback) {
//     $.ajax({
//       url: Constants.get_api_base_url() + url,
//       type: method,
//       data: data,
//       beforeSend: function (xhr) {
//         if (Utils.get_from_localstorage("user")) {
//           xhr.setRequestHeader(
//             "Authentication",
//             Utils.get_from_localstorage("user").token
//           );
//         }
//       },
//     })
//       .done(function (response, status, jqXHR) {
//         if (callback) callback(response);
//       })
//       .fail(function (jqXHR, textStatus, errorThrown) {
//         if (error_callback) {
//           error_callback(jqXHR);
//         } else {
//           toastr.error(jqXHR.responseJSON.message);
//         }
//       });
//   },
//   post: function (url, data, callback, error_callback) {
//     RestClient.request(url, "POST", data, callback, error_callback);
//   },
//   delete: function (url, data, callback, error_callback) {
//     RestClient.request(url, "DELETE", data, callback, error_callback);
//   },
//   put: function (url, data, callback, error_callback) {
//     RestClient.request(url, "PUT", data, callback, error_callback);
//   },
// };