// Datos de ejemplo
const categorias = [
    {
        id: 1,
        nombre: "Accidentes de Tránsito",
        descripcion: "Formatos estandarizados para la atención e investigación de accidentes de tránsito",
        icono: "fa-car-crash",
        formatos: [
            {
                id: "AT001",
                titulo: "Acta de Intervención por Accidente",
                autor: "SOT2 Juan Pérez",
                nivel: "Excelente",
                link: "https://drive.google.com/file/d/1PyHYyxGtNX4QFD1twsSDGUvk-Rp7Uejt/view",
                fechaActualizacion: "2025-11-01"
            },
            {
                id: "AT002",
                titulo: "Acta de Informe de Lesionados",
                autor: "SOT3 Luis Gamarra",
                nivel: "Bueno",
                link: "https://drive.google.com/sample2",
                fechaActualizacion: "2025-10-15"
            },
            {
                id: "AT002",
                titulo: "Acta de Informe de Lesionados",
                autor: "SOT3 Luis Gamarra",
                nivel: "Bueno",
                link: "https://drive.google.com/sample2",
                fechaActualizacion: "2025-10-15"
            },
            {
                id: "AT002",
                titulo: "Acta de Informe de Lesionados",
                autor: "SOT3 Luis Gamarra",
                nivel: "Bueno",
                link: "https://drive.google.com/sample2",
                fechaActualizacion: "2025-10-15"
            }
        ]
    },
    {
        id: 2,
        nombre: "Violencia Familiar",
        descripcion: "Documentación para casos de violencia familiar y protección a las víctimas",
        icono: "fa-house-damage",
        formatos: [
            {
                id: "VF001",
                titulo: "Acta de Intervención por Violencia",
                autor: "SO1 María Rodriguez",
                nivel: "Excelente",
                link: "https://drive.google.com/sample3",
                fechaActualizacion: "2025-11-05"
            }
        ]
    },
    {
        id: 3,
        nombre: "Robo",
        descripcion: "Formatos para denuncias e investigación de casos de robo y hurto",
        icono: "fa-mask",
        formatos: [
            {
                id: "RB001",
                titulo: "Acta de Denuncia por Robo",
                autor: "SO2 Carlos Sánchez",
                nivel: "Regular",
                link: "https://drive.google.com/sample4",
                fechaActualizacion: "2025-10-20"
            },
            {
                id: "RB002",
                titulo: "Acta de Inspección Técnica",
                autor: "SOT1 Ana López",
                nivel: "Bueno",
                link: "https://drive.google.com/sample5",
                fechaActualizacion: "2025-11-03"
            }
        ]
    }
];

// Elementos del DOM
const categoriasLista = document.getElementById('categorias-lista');
const formatosContainer = document.getElementById('formatos-container');
const searchInput = document.getElementById('searchInput');
const categoriaTemplate = document.getElementById('categoria-template');
const formatoTemplate = document.getElementById('formato-template');

let categoriaActiva = null;

// Función para crear una tarjeta de formato
function crearFormatoCard(formato) {
    const formatoElement = formatoTemplate.content.cloneNode(true);
    const card = formatoElement.querySelector('.formato-card');
    
    // Establecer el título
    card.querySelector('.formato-titulo').textContent = formato.titulo;
    
    // Establecer el autor
    card.querySelector('.formato-autor').textContent = formato.autor;
    
    // Establecer el nivel
    const nivelDiv = card.querySelector('.formato-nivel');
    nivelDiv.textContent = formato.nivel;
    nivelDiv.classList.add(`nivel-${formato.nivel.toLowerCase()}`);
    
    // Configurar vista previa PDF
    const btnPreview = card.querySelector('.btn-preview');
    btnPreview.addEventListener('click', () => {
        window.open(formato.link, '_blank');
    });
    
    // Configurar botón de descarga (redirección a Drive)
    const btnDownload = card.querySelector('.btn-download');
    btnDownload.href = "https://drive.google.com/drive/folders/tu-carpeta-compartida";
    
    // Configurar compartir
    const btnShare = card.querySelector('.btn-share');
    btnShare.addEventListener('click', () => {
        const texto = `Te comparto el formato: ${formato.titulo}\nAutor: ${formato.autor}\nEnlace: ${formato.link}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(texto)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    return formatoElement;
}

// Función para crear una tarjeta de categoría
function crearCategoriaCard(categoria) {
    const categoriaElement = categoriaTemplate.content.cloneNode(true);
    const card = categoriaElement.querySelector('.categoria-card');
    
    if (categoria.icono) {
        const iconElement = card.querySelector('.categoria-icon i');
        iconElement.classList.remove('fa-folder');
        iconElement.classList.add(categoria.icono);
    }
    
    card.querySelector('.categoria-nombre').textContent = categoria.nombre;
    card.querySelector('.categoria-descripcion').textContent = categoria.descripcion;
    card.querySelector('.count').textContent = categoria.formatos.length;
    
    const btnVer = card.querySelector('.btn-ver');
    btnVer.addEventListener('click', () => {
        const modal = document.getElementById('formatos-modal');
        const modalTitle = document.getElementById('modal-categoria-actual');
        const modalContent = document.getElementById('modal-formatos-container');
        
        modalTitle.textContent = categoria.nombre;
        categoriaActiva = categoria.id;
        
        // Renderizar formatos en el modal
        modalContent.innerHTML = '';
        categoria.formatos.forEach(formato => {
            modalContent.appendChild(crearFormatoCard(formato));
        });
        
        // Mostrar el modal con animación
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 10);
    });
    
    return categoriaElement;
}

// Función para renderizar formatos
function renderizarFormatos(formatos) {
    formatosContainer.innerHTML = '';
    if (formatos.length === 0) {
        formatosContainer.innerHTML = `
            <div class="no-resultados">
                <i class="fas fa-folder-open" style="font-size: 3rem; color: var(--text-light)"></i>
                <p>No hay formatos disponibles</p>
            </div>
        `;
        return;
    }
    formatos.forEach(formato => {
        formatosContainer.appendChild(crearFormatoCard(formato));
    });
}

// Función para renderizar la lista de categorías
function renderizarCategorias(categoriasData) {
    const categoriasLista = document.getElementById('categorias-lista');
    categoriasLista.innerHTML = '';
    
    if (categoriasData.length === 0) {
        categoriasLista.innerHTML = `
            <div class="no-resultados">
                <i class="fas fa-folder-open" style="font-size: 3rem; color: var(--text-light)"></i>
                <p>No se encontraron categorías</p>
            </div>
        `;
        return;
    }
    
    categoriasData.forEach(categoria => {
        categoriasLista.appendChild(crearCategoriaCard(categoria));
    });
}

// Función de búsqueda mejorada
function filtrarFormatos(query) {
    query = query.toLowerCase().trim();
    
    if (!query) {
        const ultimaCategoria = categoriaActiva ? 
            categorias.find(c => c.id === categoriaActiva) : 
            categorias[0];
        renderizarMenu(categorias);
        renderizarFormatos(ultimaCategoria.formatos);
        return;
    }

    // Buscar en todas las categorías y formatos
    const todosLosFormatos = [];
    categorias.forEach(categoria => {
        const formatosFiltrados = categoria.formatos.filter(formato => 
            formato.titulo.toLowerCase().includes(query) ||
            categoria.nombre.toLowerCase().includes(query) ||
            formato.autor.toLowerCase().includes(query)
        );
        
        formatosFiltrados.forEach(formato => {
            todosLosFormatos.push({
                ...formato,
                categoria: categoria.nombre
            });
        });
    });
    
    // Mostrar resultados de búsqueda
    formatosContainer.innerHTML = '';
    if (todosLosFormatos.length > 0) {
        todosLosFormatos.forEach(formato => {
            const formatoCard = crearFormatoCard(formato);
            // Agregar el nombre de la categoría al formato
            const titulo = formatoCard.querySelector('.formato-titulo');
            titulo.innerHTML = `<small style="color: var(--primary-light)">${formato.categoria}</small><br>${formato.titulo}`;
            formatosContainer.appendChild(formatoCard);
        });
    } else {
        formatosContainer.innerHTML = `
            <div class="no-resultados">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light)"></i>
                <p>No se encontraron formatos para "${query}"</p>
            </div>
        `;
    }

    // Desactivar botones de categoría durante la búsqueda
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.remove('active');
    });
}

// Configurar el cierre del modal
function inicializarModal() {
    const modal = document.getElementById('formatos-modal');
    const btnClose = document.getElementById('btnCloseModal');
    
    // Cerrar con el botón X
    btnClose.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 300);
    });
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    });
    
    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.remove('show');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    });
}

// Modificar la función inicializarApp para incluir la inicialización del modal
function inicializarApp() {
    // Renderizar las categorías
    renderizarCategorias(categorias);
    
    // Inicializar el modal
    inicializarModal();
    
    // Configurar búsqueda
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Llenar el selector de categorías
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        categoryFilter.appendChild(option);
    });
    
    // Event listeners para búsqueda y filtrado
    searchInput.addEventListener('input', aplicarFiltros);
    categoryFilter.addEventListener('change', aplicarFiltros);
}

function aplicarFiltros() {
    const query = searchInput.value.toLowerCase().trim();
    const categoriaSeleccionada = categoryFilter.value;

    let categoriasFiltradas = [...categorias];
    let mostrarTodo = true;

    // Aplicar filtro por categoría
    if (categoriaSeleccionada) {
        categoriasFiltradas = categoriasFiltradas.filter(categoria => 
            categoria.id === parseInt(categoriaSeleccionada)
        );
        
        if (query) {
            // Si hay una categoría seleccionada y hay texto de búsqueda,
            // mostrar los formatos filtrados en el modal
            mostrarTodo = false;
            const formatosFiltrados = [];
            
            categoriasFiltradas.forEach(categoria => {
                const formatosCategoria = categoria.formatos.filter(formato =>
                    formato.titulo.toLowerCase().includes(query) ||
                    formato.autor.toLowerCase().includes(query)
                );
                
                formatosCategoria.forEach(formato => {
                    formatosFiltrados.push({
                        ...formato,
                        categoria: categoria.nombre
                    });
                });
            });

            // Mostrar resultados en el modal
            const modal = document.getElementById('formatos-modal');
            const modalTitle = document.getElementById('modal-categoria-actual');
            const modalContent = document.getElementById('modal-formatos-container');
            
            modalTitle.textContent = `Resultados de búsqueda: "${query}"`;
            modalContent.innerHTML = '';
            
            if (formatosFiltrados.length > 0) {
                formatosFiltrados.forEach(formato => {
                    modalContent.appendChild(crearFormatoCard(formato));
                });
                modal.classList.remove('hidden');
                setTimeout(() => modal.classList.add('show'), 10);
            } else {
                modalContent.innerHTML = `
                    <div class="no-resultados">
                        <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light)"></i>
                        <p>No se encontraron formatos para "${query}"</p>
                    </div>
                `;
                modal.classList.remove('hidden');
                setTimeout(() => modal.classList.add('show'), 10);
            }
        }
    } else if (query) {
        // Si no hay categoría seleccionada pero hay búsqueda
        // Buscar en todas las categorías
        const formatosFiltrados = [];
        
        categorias.forEach(categoria => {
            const formatosCategoria = categoria.formatos.filter(formato =>
                formato.titulo.toLowerCase().includes(query) ||
                formato.autor.toLowerCase().includes(query)
            );
            
            if (formatosCategoria.length > 0 || 
                categoria.nombre.toLowerCase().includes(query) ||
                categoria.descripcion.toLowerCase().includes(query)) {
                
                categoriasFiltradas.push(categoria);
            }
            
            formatosCategoria.forEach(formato => {
                formatosFiltrados.push({
                    ...formato,
                    categoria: categoria.nombre
                });
            });
        });

        if (formatosFiltrados.length > 0) {
            mostrarTodo = false;
            const modal = document.getElementById('formatos-modal');
            const modalTitle = document.getElementById('modal-categoria-actual');
            const modalContent = document.getElementById('modal-formatos-container');
            
            modalTitle.textContent = `Resultados de búsqueda: "${query}"`;
            modalContent.innerHTML = '';
            formatosFiltrados.forEach(formato => {
                modalContent.appendChild(crearFormatoCard(formato));
            });
            
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.add('show'), 10);
        }
    }

    if (mostrarTodo) {
        // Solo actualizar la vista de categorías si no estamos mostrando resultados en el modal
        renderizarCategorias(categoriasFiltradas);
        // Si no hay búsqueda activa, ocultar el modal
        if (!query && !categoriaSeleccionada) {
            const modal = document.getElementById('formatos-modal');
            modal.classList.remove('show');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);

