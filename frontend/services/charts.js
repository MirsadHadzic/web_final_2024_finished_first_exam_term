    $(document).ready(function () {
        // Fetch and display the pie chart
        RestClient.get('rest/nutrients', function (data) {
            const nutrientData = data.map(nutrient => ({
                name: nutrient.name,
                y: 1 // each nutrient as one unit
            }));

            Highcharts.chart('pie-chart-container', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Nutrients Distribution'
                },
                series: [{
                    name: 'Nutrients',
                    colorByPoint: true,
                    data: nutrientData
                }]
            });
        });

    // // Fetch and display the DataTable
    // Utils.get_datatable('nutrients-table', 'http://localhost/final20244/backend/rest/nutrients', [
    //     { data: 'id' },
    //     { data: 'name' },
    //     { data: 'external_id' },
    //     { data: 'unit' },
    //     { data: 'hamo' } // Ensure 'hamo' matches your API response key
    // ], null, function() {
    //     console.log('DataTable initialized successfully.');
    // }, null, 1, 'desc', function() {
    //     console.log('DataTable draw callback.');
    // });

    // Fetch and display the DataTable

    // NE RADI

    // var NutrientService = {
    //     reload_nutrients_datatable: function () {
    //         Utils.get_datatable(
    //             "nutrients-table",
    //             Constants.get_api_base_url() + "rest/nutrients",
    //             [
    //                 { data: 'id', title: 'ID' },
    //                 { data: 'name', title: 'Name' },
    //                 { data: 'external_id', title: 'External ID' },
    //                 { data: 'unit', title: 'Unit' },
    //                 { data: 'hamo', title: 'Hamo' }
    //             ],
    //             [],
    //             function () {
    //                 console.log('Nutrients DataTable initialized successfully.');
    //             },
    //             null,
    //             null,
    //             null,
    //             function () {
    //                 console.log('Nutrients DataTable draw callback.');
    //             }
    //         );
    //     }
    // };
    
    
    
    // OVO DOLJE RADI

    $(document).ready(function () {
        var table = $('#nutrients-table').DataTable({
            ajax: {
                url: Constants.get_api_base_url() + 'rest/nutrients',
                type: 'GET',
                headers: {
                    "Authentication": Utils.get_from_localstorage("token")
                },
                dataSrc: function (json) {
                    console.log('Data from API:', json); // Inspect the data format
                    return json; // Adjust this if needed
                }
            },
            columns: [
                { data: 'id', title: 'ID' },
                { data: 'name', title: 'Name' },
                { data: 'external_id', title: 'External ID' },
                { data: 'unit', title: 'Unit' },
                { data: 'hamo', title: 'Hamo' }
            ],
            pageLength: 10,
            processing: true,
            serverSide: false,
            // Enable server-side sorting
            order: [[0, 'asc']], // Default sorting by the first column (adjust as needed)
            initComplete: function () {
                console.log('DataTable initialized successfully.');
            },
            drawCallback: function () {
                console.log('DataTable draw callback.');
            }
        });
    });
    

    // OVO DOLJE RADI

    // $(document).ready(function() {   
    //     var table = $('#nutrients-table').DataTable({
    //         paging: false,
    //         searching: false,
    //         ajax: {
    //             url: "http://localhost/final20244/backend/rest/nutrients",
    //             type: "GET",
    //             headers: {
    //                 "Authentication": Utils.get_from_localstorage("token")
    //             },
    //             dataSrc: ""
    //         },
    //         columns: [
    //             { "title": "ID", "data": "id" },
    //             { "title": "Name", "data": "name" },
    //             { "title": "External ID", "data": "external_id" },
    //             { "title": "Unit", "data": "unit" },
    //             { "title": "Hamo", "data": "hamo" }
    //         ]
    //     });

    //     setInterval(function () {
    //         $('#nutrients-table').DataTable().ajax.url(
    //             "http://localhost/final20244/backend/rest/nutrients"
    //         ).load();
    //     }, 3000);
    // });



        // Fetch and display the Highcharts plot
        RestClient.get('rest/nutrients', function (data) {
            const nutrientNames = data.map(nutrient => `${nutrient.id} ${nutrient.name}`);
            const nutrientUnits = data.map(nutrient => nutrient.unit);

            Highcharts.chart('highcharts-container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Nutrient Units'
                },
                xAxis: {
                    categories: nutrientNames,
                    title: {
                        text: 'Nutrients'
                    },
                    reversed: false // Ensures x-axis always goes up
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Unit'
                    },
                    reversed: false // Ensures y-axis always goes up
                },
                accessibility: {
                    enabled: false // Disable accessibility module
                },
                series: [{
                    name: 'Unit',
                    data: nutrientUnits
                }]
            });
        });
    });
