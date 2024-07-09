$(document).ready(function () {
    // Initialize DataTable
    var table = $('#tbl_meho').DataTable({
        ajax: {
            url: 'http://localhost/final20244/backend/rest/meho',
            dataSrc: '',
            beforeSend: function (xhr) {
                const token = Utils.get_from_localstorage("token");
                if (token) {
                    xhr.setRequestHeader("Authentication", token);
                }
            }
        },
        columns: [
            { data: null, defaultContent: '<button class="btn btn-primary btn-edit">Edit</button> <button class="btn btn-danger btn-delete">Delete</button>' },
            { data: 'imena_naka' },
            { data: 'prezimena_naka' },
            { data: 'brojevi_naki' }
        ]
    });

    // Open modal for adding
    $('#btn-add').on('click', function () {
        $('#add-meho-modal').modal('show');
    });

    // Form submission for adding
    $('#add-meho-form').on('submit', function (e) {
        e.preventDefault();
        var formData = $(this).serialize();

        const token = Utils.get_from_localstorage("token");

        $.ajax({
            url: 'http://localhost/final20244/backend/rest/add/meho',
            type: 'POST',
            data: formData,
            headers: {
                "Authentication": token
            },
            success: function () {
                $('#add-meho-modal').modal('hide');
                table.ajax.reload();
                toastr.success('Entry added successfully.');
            },
            error: function (error) {
                toastr.error('Error adding entry.');
            }
        });
    });

// Form submission for editing
var table = $('#tbl_meho').DataTable({
    // Your DataTable configuration
});

$(document).ready(function () {
    // Open modal for editing
    $('#tbl_meho tbody').on('click', '.btn-edit', function () {
        var id = $(this).data('id');
        var rowData = table.row($(this).parents('tr')).data();

        $('#edit-id').val(id);
        $('#edit-imena_naka').val(rowData.imena_naka);
        $('#edit-prezimena_naka').val(rowData.prezimena_naka);
        $('#edit-brojevi_naki').val(rowData.brojevi_naki);

        $('#edit-meho-modal').modal('show'); // Ensure modal opens
    });

    // Form submission for editing
    $('#edit-meho-form').on('submit', function (e) {
        e.preventDefault();
        var formData = $(this).serialize(); // Serialize form data
        var id = $('#edit-id').val(); // Get ID from hidden input

        const token = Utils.get_from_localstorage("token");

        $.ajax({
            url: 'http://localhost/final20244/backend/rest/meho/' + id,
            type: 'PUT',
            data: formData,
            headers: {
                "Authentication": token
            },
            success: function (data) {
                $('#edit-meho-modal').modal('hide');
                table.ajax.reload(); // Reload DataTable after update
                toastr.success('Entry updated successfully.');
            },
            error: function (xhr, status, error) {
                toastr.error('Error updating entry: ' + xhr.responseText);
            }
        });
    });
});




    // Delete entry
    $('#tbl_meho tbody').on('click', '.btn-delete', function () {
        var data = table.row($(this).parents('tr')).data();
        if (confirm('Do you want to delete entry with ID ' + data.id + '?')) {
            const token = Utils.get_from_localstorage("token");

            $.ajax({
                url: 'http://localhost/final20244/backend/rest/meho/' + data.id,
                type: 'DELETE',
                headers: {
                    "Authentication": token
                },
                success: function () {
                    table.ajax.reload();
                    toastr.success('Entry deleted successfully.');
                },
                error: function (error) {
                    toastr.error('Error deleting entry.');
                }
            });
        }
    });

    // Reset form on modal close
    $('#add-meho-modal').on('hidden.bs.modal', function () {
        $('#add-meho-form')[0].reset();
    });

    // Reset form on modal close
    $('#edit-meho-modal').on('hidden.bs.modal', function () {
        $('#edit-meho-form')[0].reset();
        $('#edit-id').val('');
    });
});
