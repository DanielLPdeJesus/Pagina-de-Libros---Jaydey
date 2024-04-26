
     const firebaseConfig = {
    //configuracion bd
  };


  firebase.initializeApp(firebaseConfig);

  const db = firebase.database();


db.ref('books').once('value', (snapshot) => {
  const libros = snapshot.val();

  const librosContainer = document.getElementById('libros-container');

  for (const libroId in libros) {
      if (libros.hasOwnProperty(libroId)) {
          const libro = libros[libroId];
          const libroElement = document.createElement('div');
          libroElement.className = "col";
          libroElement.innerHTML = `
              <div class="card shadow-sm">
                  <img src="${libro.file}" class="bd-placeholder-img card-img-top" width="100%" height="225" role="img" aria-label="Imagen del libro" preserveAspectRatio="xMidYMid slice" focusable="false" alt="Imagen del libro">
                  <div class="card-body">
                      <h5 class="card-title">${libro.titulo}</h5>
                      <p class="card-text">${libro.descripcion}</p>
                      <p class="card-text"><strong>Recomendación:</strong> ${libro.recomendacion}</p>
                      <p class="card-text">Categoría: ${libro.categoria}</p>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-secondary" onclick="confirmarEliminar('${libroId}')">Eliminar</button>
                              <button type="button" class="btn btn-sm btn-secondary editar-libro" data-libro-id="${libroId}" data-titulo="${libro.titulo}" data-autor="${libro.autor}" data-fecha="${libro.fecha}" data-descarga="${libro.descarga}" data-recomendacion="${libro.recomendacion}" data-categoria="${libro.categoria}" data-descripcion="${libro.descripcion}">Editar</button>
                          </div>
                          <small class="text-muted">${libro.autor}</small>
                      </div>
                  </div>
              </div>
          `;
          librosContainer.appendChild(libroElement);
      }
  }

  // Agregar evento click a todos los botones de editar con clase "editar-libro"
  const editarBotones = document.querySelectorAll('.editar-libro');
  editarBotones.forEach(boton => {
      boton.addEventListener('click', function() {
          const libroId = this.getAttribute('data-libro-id');
          const titulo = this.getAttribute('data-titulo');
          const autor = this.getAttribute('data-autor');
          const fecha = this.getAttribute('data-fecha');
          const descarga = this.getAttribute('data-descarga');
          const recomendacion = this.getAttribute('data-recomendacion');
          const categoria = this.getAttribute('data-categoria');
          const descripcion = this.getAttribute('data-descripcion');
          abrirModalEditar(libroId, titulo, autor, fecha, descarga, recomendacion, categoria, descripcion);
      });
  });
});

// Función para abrir el modal de edición con los datos del libro seleccionado
function abrirModalEditar(libroId, tituloActual, autorActual, fechaActual, descargaActual, recomendacionActual, categoriaActual, descripcionActual) {
  document.getElementById('libroIdEditar').value = libroId;
  document.getElementById('tituloEditar').value = tituloActual;
  document.getElementById('autorEditar').value = autorActual;
  document.getElementById('fechaEditar').value = fechaActual;
  document.getElementById('descargaEditar').value = descargaActual;
  document.getElementById('recomendacionEditar').value = recomendacionActual;
  document.getElementById('categoriaEditar').value = categoriaActual;
  document.getElementById('descripcionEditar').value = descripcionActual;
  const modal = new bootstrap.Modal(document.getElementById('editarLibroModal'));
  modal.show();
}

// Manejador de evento para el envío del formulario de edición
document.getElementById('formularioEditarLibro').addEventListener('submit', function(event) {
  event.preventDefault();
  const libroId = document.getElementById('libroIdEditar').value;
  const titulo = document.getElementById('tituloEditar').value;
  const autor = document.getElementById('autorEditar').value;
  const fecha = document.getElementById('fechaEditar').value;
  const descarga = document.getElementById('descargaEditar').value;
  const recomendacion = document.getElementById('recomendacionEditar').value;
  const categoria = document.getElementById('categoriaEditar').value;
  const descripcion = document.getElementById('descripcionEditar').value;

  // Actualiza los datos del libro en Firebase
  db.ref('books').child(libroId).update({
      titulo: titulo,
      autor: autor,
      fecha: fecha,
      descarga: descarga,
      recomendacion: recomendacion,
      categoria: categoria,
      descripcion: descripcion
  }).then(() => {
      console.log("Libro actualizado exitosamente");
      actualizarInterfazUsuario();
      const modal = bootstrap.Modal.getInstance(document.getElementById('editarLibroModal'));
      modal.hide();
  }).catch((error) => {
      console.error("Error al actualizar el libro:", error);
  });
});

     function eliminarLibro(libroId) {
      db.ref('books').child(libroId).remove()
          .then(() => {
              console.log("Libro eliminado exitosamente");
              actualizarInterfazUsuario();
          })
          .catch((error) => {
              console.error("Error al eliminar el libro:", error);
          });
    }


    function actualizarInterfazUsuario() {
      location.reload();
    }

    function confirmarEliminar(libroId) {
        Swal.fire({
            title: "¿Estás seguro de que deseas eliminar este libro?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarLibro(libroId);
            }
        });
    }
    