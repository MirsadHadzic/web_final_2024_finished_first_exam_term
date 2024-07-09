var MehoTabelaService = {
    load_meho_tabela: function () {
        RestClient.get("rest/meho", function(response) {
            console.log(response); // Debugging line to inspect the response

            if (!response || !Array.isArray(response)) {
                console.error("Invalid response structure:", response);
                return;
            }

            var mehoTable = $('#mehoTabela-table tbody');
            mehoTable.empty();
            response.forEach(function(meho) {
                var row = '<tr>' +
                          '<td>' + meho.imena_naka + '</td>' +
                          '<td>' + meho.prezimena_naka + '</td>' +
                          '<td>' + meho.brojevi_naki + '</td>' +
                          '<td>' +
                          '<button class="deletebtn" onclick="MehoTabelaService.deleteRow(' + meho.id + ')">Delete</button>' +
                          '<button class="randomizebtn" onclick="MehoTabelaService.randomPrice(' + meho.id + ')">Randomize</button>' +
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
            MehoTabelaService.load_meho_tabela(); // Refresh the list
        }, function(jqXHR, textStatus, errorThrown) {
            alert("An error occurred while deleting the item: " + jqXHR.responseText);
        });
    },

    randomPrice: function(id) {
        console.log("Randomizing ID: ", id); // Debugging line to inspect the id
        RestClient.post('rest/meho/' + id, {}, function(data) {
            alert("You have successfully generated a random number!");
            MehoTabelaService.load_meho_tabela(); // Refresh the list
        }, function(jqXHR, textStatus, errorThrown) {
            alert("An error occurred while generating the random number: " + jqXHR.responseText);
        });
    }
};

$(document).ready(function() {
    MehoTabelaService.load_meho_tabela();
});
