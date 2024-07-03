var FoodsService = {
    load_foods_report: function () {
        RestClient.get("rest/foods/report", function(response) {
            console.log(response); // Debugging line to inspect the response

            if (!response || !Array.isArray(response)) {
                console.error("Invalid response structure:", response);
                return;
            }

            var foodsTable = $('#foods-table tbody');
            foodsTable.empty();
            response.forEach(function(food) {
                var row = '<tr>' +
                          '<td>' + food.name + '</td>' +
                          '<td>' + food.brand + '</td>' +
                          '<td><img src="' + food.image + '" alt="' + food.name + '" style="width:50px;height:50px;"></td>' +
                          '<td>' + food.energy + '</td>' +
                          '<td>' + food.protein + '</td>' +
                          '<td>' + food.fat + '</td>' +
                          '<td>' + food.fiber + '</td>' +
                          '<td>' + food.carbs + '</td>' +
                          '</tr>';
                foodsTable.append(row);
            });
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Request failed: ", textStatus, errorThrown);
        });
    }
};

$(document).ready(function() {
    FoodsService.load_foods_report();
});

// var FoodsService = {
//     load_foods_report: function () {
//         RestClient.get("rest/foods/report", function(response) {
//             console.log(response); // Debugging line to inspect the response

//             if (!response) {
//                 console.error("Invalid response structure:", response);
//                 return;
//             }

//             // Ensure the response is an array
//             var foods = Array.isArray(response) ? response : [response];
//             console.log(foods);
//             var foodsTable = $('#foods-table tbody');
//             foodsTable.empty();
//             foods.forEach(function(food) {
//                 var row = '<tr>' +
//                           '<td>' + food.name + '</td>' +
//                           '<td>' + food.brand + '</td>' +
//                           '<td>' + food.image + '</td>' +
//                           '<td>' + food.energy + '</td>' +
//                           '<td>' + food.protein + '</td>' +
//                           '<td>' + food.fat + '</td>' +
//                           '<td>' + food.fiber + '</td>' +
//                           '<td>' + food.carbs + '</td>' +
//                           '</tr>';
//                 foodsTable.append(row);
//             });
//         }).fail(function(jqXHR, textStatus, errorThrown) {
//             console.error("Request failed: ", textStatus, errorThrown);
//         });
//     }
// }

// $(document).ready(function() {
//     FoodsService.load_foods_report();
// });