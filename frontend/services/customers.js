var CustomersService = {
    reload_customers_datatable: function () {
        Utils.get_datatable(
            "customers-list",
            Constants.get_api_base_url() + "rest/customers"
        );
    },
    load_customers: function () {
        RestClient.get("rest/customers", function(response) {
            console.log(response); // Debugging line to inspect the response

            if (!response || !Array.isArray(response)) {
                console.error("Invalid response structure:", response);
                return;
            }

            var customersList = $('#customers-list');
            customersList.empty();
            customersList.append('<option selected>Please select one customer</option>');
            response.forEach(function(customer) {
                customersList.append('<option value="' + customer.id + '">' + customer.first_name + ' ' + customer.last_name + '</option>');
            });

            // Attach change event to the select list to load meals for the selected customer
            customersList.change(function() {
                var selectedCustomerId = $(this).val();
                if (selectedCustomerId) {
                    CustomersService.load_customer_meals(selectedCustomerId);
                }
            });
        });
    },
    load_customer_meals: function (customerId) {
        RestClient.get("rest/customer/meals/" + customerId, function(response) {
            console.log(response); // Debugging line to inspect the response

            if (!response) {
                console.error("Invalid response structure:", response);
                return;
            }

            // Ensure the response is an array
            var meals = Array.isArray(response) ? response : [response];

            var customerMealsTable = $('#customer-meals tbody');
            customerMealsTable.empty();
            meals.forEach(function(meal) {
                var row = '<tr>' +
                          '<td>' + meal.name + '</td>' +
                          '<td>' + meal.brand + '</td>' +
                          '<td>' + meal.created_at + '</td>' +
                          '</tr>';
                customerMealsTable.append(row);
            });
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Request failed: ", textStatus, errorThrown);
        });
    },
    add_customer: function (customerData, successCallback, errorCallback) {
        RestClient.post("rest/customers/add", customerData, function(response) {
            console.log("Response from server:", response); // Add more logging here
            
            if (response && response.id) {
                successCallback(response); // Assuming your response has an id property indicating success
            } else {
                console.error("Unexpected response structure:", response);
                errorCallback(response);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Request failed: ", textStatus, errorThrown);
            errorCallback({ message: "Failed to add customer" });
        });
    }
};

// $(document).ready(function() {
//     CustomersService.load_customers();
// });



    
//     fetch_customers: function () {
//       RestClient.get('customers', function (customers) {
//         let customersList = $('#customers-list');
//         customersList.empty();
//         customersList.append('<option selected>Please select one customer</option>');
//         customers.forEach(customer => {
//           customersList.append(`<option value="${customer.id}">${customer.first_name} ${customer.last_name}</option>`);
//         });
//       });
//     }
//   };
  
//   $(document).ready(function () {
//     CustomersService.fetch_customers();
//   });
  
//   CustomersService.fetch_customer_meals = function (customerId) {
//     RestClient.get(`customers/${customerId}/meals`, function (meals) {
//       let mealsTable = $('#customer-meals tbody');
//       mealsTable.empty();
//       meals.forEach(meal => {
//         mealsTable.append(`
//           <tr>
//             <td>${meal.food_name}</td>
//             <td>${meal.food_brand}</td>
//             <td>${meal.meal_date}</td>
//           </tr>
//         `);
//       });
//     });
//   };
  
//   $('#customers-list').on('change', function () {
//     let customerId = $(this).val();
//     if (customerId) {
//       CustomersService.fetch_customer_meals(customerId);
//     }
//   });
  