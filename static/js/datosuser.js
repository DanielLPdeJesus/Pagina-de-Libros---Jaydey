
    const firebaseConfig = {
        //cofiguracion bd
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
                    <img src="${libro.file}" class="bd-placeholder-img card-img-top" width="100%" height="auto" role="img" aria-label="Imagen del libro" preserveAspectRatio="xMidYMid slice" focusable="false" alt="Imagen del libro">
                    <div class="card-body">
                      <h5 class="card-title">${libro.titulo}</h5>
                      <h6 class="card-title">Categoria: ${libro.categoria}</h6>
                      <h6 class="card-title">Fecha de Publicacion: ${libro.fecha}</h6>
                      <p class="card-text">${libro.descripcion}</p>
                      <p class="card-text"><strong>Recomendación:</strong> ${libro.recomendacion}</p>
                      <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="${libro.descarga}" class="btn btn-sm btn-secondary comprar-btn">Comprar</a>
                      </div>
                        <small class="text-muted"><strong>Autor:</strong> ${libro.autor}</small>
                      </div>
                    </div>
                  </div>
                `;
                librosContainer.appendChild(libroElement);
            }
        }
    });

    
  