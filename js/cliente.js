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

function pintarRespuestaClienteId(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                        <th>ID</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        </tr>`;

    myTable += "<tr>";
    myTable += `<td>${items.idClient}</td>`;
    myTable += `<td>${items.email}</td>`;
    myTable += `<td>${items.password}</td>`;
    myTable += `<td>${items.name}</td>`;
    myTable += `<td>${items.age}</td>`;
    myTable += "</tr>";

    myTable += "</table>"
    $("#resultadoCliente").html(myTable);
}
function traerInformacionClienteId() {
    let id = window.location.hash.replace("#", "")
    $.ajax({
        url: `http://129.151.109.227:8080/api/Client/${id}`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaClienteId(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se puede ver el cliente")
        }
    });
}
function editarInformacionCliente() {

    let id = window.location.hash.replace("#", "")

    let myData = {
        idClient: id,
        name: $("#name").val(),
        age: $("#age").val(),
        password: $("#password").val(),
    };
    if (myData.name !== "" && myData.password !== "", myData.age !== "") {
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.109.227:8080/api/Client/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#name").val("");
                $("#age").val("");
                $("#password").val("");
                traerInformacionClienteId();
                alerta("Se ha actualizado el cliente")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertaError("No se actualizó el cliente")
            }
        });
    }
}