var MehoService = {
    load_meho: function () {
        RestClient.get("rest/meho", function(response) {
            console.log(response); // Debugging line to inspect the response

            if (!response || !Array.isArray(response)) {
                console.error("Invalid response structure:", response);
                return;
            }

            var mehoTable = $('#meho-table tbody');
            mehoTable.empty();
            response.forEach(function(meho) {
                var row = '<tr>' +
                          '<td>' + meho.imena_naka + '</td>' +
                          '<td>' + meho.prezimena_naka + '</td>' +
                          '<td>' + meho.brojevi_naki + '</td>' +
                          '<td>' +
                          '<button class="deletebtn" onclick="MehoService.deleteRow(' + meho.id + ')">Delete</button>' +
                          '<button class="randomizebtn" onclick="MehoService.randomPrice(' + meho.id + ')">Randomize</button>' +
                          '</td>' +
                          '</tr>';
                mehoTable.append(row);
            });
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Request failed: ", textStatus, errorThrown);
        });
    },

    deleteRow: function(id) {
        console.log("Deleting ID: ", id); // Debugging line to inspect the id
        RestClient.delete('rest/meho/' + id, {}, function(data) {
            alert("You have successfully deleted this item!");
            MehoService.load_meho(); // Refresh the list
        }, function(jqXHR, textStatus, errorThrown) {
            alert("An error occurred while deleting the item: " + jqXHR.responseText);
        });
    },

    randomPrice: function(id) {
        console.log("Randomizing ID: ", id); // Debugging line to inspect the id
        RestClient.post('rest/meho/' + id, {}, function(data) {
            alert("You have successfully generated a random number!");
            MehoService.load_meho(); // Refresh the list
        }, function(jqXHR, textStatus, errorThrown) {
            alert("An error occurred while generating the random number: " + jqXHR.responseText);
        });
    }
};

$(document).ready(function() {
    MehoService.load_meho();
});
