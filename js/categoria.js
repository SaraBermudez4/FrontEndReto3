//Alertas
function alerta(text) {
    swal({
        title: "Exito",
        text: text,
        type: "success",
    });
}
function alertaError(text) {
    swal({
        title: "Oh, vaya...",
        text: text,
        type: "warning",
    });
}

function pintarRespuestaCategoriaId(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                        </tr>`;

    myTable += "<tr>";
    myTable += `<td id="idTableCategoria">${items.id}</td>`;
    myTable += `<td>${items.name}</td>`;
    myTable += `<td>${items.description}</td>`;
    myTable += "</tr>";

    myTable += "</table>"
    $("#resultadoCategoria").html(myTable);
}

function traerInformacionCategoriaId() {
    let id = window.location.hash.replace("#", "")
    $.ajax({
        url: `http://129.151.109.227:8080/api/Category/${id}`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaCategoriaId(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se puede ver la categoria")
        }
    });
}

function editarInformacionCategoria() {
    let id = window.location.hash.replace("#", "")
    let myData = {
        id: id,
        description: $("#description").val(),
        name: $("#nameCategoria").val()
    };
    if (myData.name !== "", myData.description !== "") {
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.109.227:8080/api/Category/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#description").val("");
                $("#nameCategoria").val("");
                traerInformacionCategoriaId();
                alerta("Se ha actualizado la categoria")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertaError("No se actualizó la categoria")
            }
        });
    }
}