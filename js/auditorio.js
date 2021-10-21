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

function pintarRespuestaAuditorioId(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                        <th>ID</th>
                        <th>Dueño</th>
                        <th>Capacidad</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        </tr>`;

    myTable += "<tr>";
    myTable += `<td id="idTableAuditorio">${items.id}</td>`;
    myTable += `<td>${items.owner}</td>`;
    myTable += `<td>${items.capacity}</td>`;
    myTable += `<td>${items.name}</td>`;
    myTable += `<td>${items.description}</td>`;
    myTable += "</tr>";
    myTable += "</table>"
    $("#resultadoAuditorio").html(myTable);
}

function traerInformacionAuditorioId() {
    let id = window.location.hash.replace("#", "")
    $.ajax({
        url: `http://129.151.109.227:8080/api/Audience/${id}`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaAuditorioId(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se puede ver el auditorio")
        }
    });
}

function editarInformacionAuditorio() {
    let id = window.location.hash.replace("#", "")
    let myData = {
        id: id,
        owner: $("#owner").val(),
        capacity: $("#capacity").val(),
        description: $("#description").val(),
        name: $("#nameAuditorio").val()
    };
    if (myData.owner !== "" && myData.description !== "" && myData.capacity !== "" && myData.name !== "") {
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.109.227:8080/api/Audience/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#owner").val("");
                $("#capacity").val("");
                $("#description").val("");
                $("#nameAuditorio").val("");
                traerInformacionAuditorioId();
                alerta("Se ha actualizado el auditorio")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertaError("No se actualizó el auditorio")
            }
        });
    }
}