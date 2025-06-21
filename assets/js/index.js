  AOS.init({ duration: 1000, once: true });

  const habilidades = [
    { nombre: "HTML/CSS", nivel: 90, color: "bg-info" },
    { nombre: "JavaScript", nivel: 75, color: "bg-warning" },
    { nombre: "PHP", nivel: 70, color: "bg-primary" },
    { nombre: "MySQL", nivel: 65, color: "bg-success" },
    { nombre: "Python", nivel: 60, color: "bg-danger" },
    { nombre: "Java", nivel: 55, color: "bg-secondary" },
    { nombre: "C++", nivel: 50, color: "bg-dark" }
  ];

  const habilidadesBlandas = [
    { nombre: "Trabajo en equipo", icono: "bi-people-fill" },
    { nombre: "Responsabilidad", icono: "bi-check2-circle" },
    { nombre: "Comunicación", icono: "bi-chat-dots-fill" },
    { nombre: "Organización", icono: "bi-calendar-check-fill" },
    { nombre: "Aprendizaje continuo", icono: "bi-lightbulb-fill" }
  ];

  const proyectos = [
    {
      titulo: "EcuPunto",
      imagen: "https://via.placeholder.com/350x150?text=EcuPunto",
      descripcion: "Sistema web para incentivar el reciclaje en escuelas mediante puntos canjeables.",
      detalles: "Sistema desarrollado con PHP, MySQL y Bootstrap para gestión de reciclaje y premios.",
      tecnologias: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      repo: "https://github.com/dustinmacias/ecupunto"
    },
    {
      titulo: "Juegos Godot",
      imagen: "https://via.placeholder.com/350x150?text=Juegos+Godot",
      descripcion: "Juegos básicos hechos con Godot (en desarrollo).",
      detalles: "Proyectos personales para aprender desarrollo de videojuegos.",
      tecnologias: ["Godot", "GDScript"],
      repo: ""
    },
    {
      titulo: "Tienda Online",
      imagen: "https://via.placeholder.com/350x150?text=Tienda+Online",
      descripcion: "Tienda con carrito y gestión de usuarios.",
      detalles: "Proyecto básico de ecommerce usando PHP y MySQL.",
      tecnologias: ["PHP", "MySQL", "Bootstrap"],
      repo: "https://github.com/dustinmacias/tienda-online"
    }
  ];

  function cargarHabilidades() {
    const contenedor = document.getElementById("skills-container");
    contenedor.innerHTML = "";
    habilidades.forEach(h => {
      const div = document.createElement("div");
      div.className = "col-md-6 mb-3";
      div.innerHTML = `
        <h5>${h.nombre}</h5>
        <div class="progress">
          <div class="progress-bar ${h.color}" role="progressbar" style="width: ${h.nivel}%" aria-valuenow="${h.nivel}" aria-valuemin="0" aria-valuemax="100">${h.nivel}%</div>
        </div>`;
      contenedor.appendChild(div);
    });
  }

  function cargarHabilidadesBlandas() {
    const contenedor = document.getElementById("soft-skills-container");
    contenedor.innerHTML = "";
    habilidadesBlandas.forEach(hb => {
      const div = document.createElement("div");
      div.className = "col-md-4 mb-3 d-flex align-items-center";
      div.innerHTML = `
        <i class="bi ${hb.icono} fs-2 me-3 text-primary"></i>
        <h5 class="mb-0">${hb.nombre}</h5>`;
      contenedor.appendChild(div);
    });
  }

  function cargarProyectos() {
    const contenedor = document.getElementById("projects-container");
    contenedor.innerHTML = "";
    proyectos.forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "col-md-4 mb-4";
      div.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${p.imagen}" class="card-img-top" alt="${p.titulo}" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.titulo}</h5>
            <p class="card-text flex-grow-1">${p.descripcion}</p>
            <div class="mb-2">
              ${p.tecnologias.map(t => `<span class="badge bg-secondary badge-tec">${t}</span>`).join("")}
            </div>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              ${p.repo ? `<a href="${p.repo}" target="_blank" class="btn btn-outline-dark btn-sm">Repositorio</a>` : `<span></span>`}
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#projectModal" data-index="${i}">Ver más</button>
            </div>
          </div>
        </div>`;
      contenedor.appendChild(div);
    });
  }

  function cargarTestimonios() {
    const testimonios = JSON.parse(localStorage.getItem("testimonios")) || [];
    const contenedor = document.getElementById("testimonials-container");
    contenedor.innerHTML = "";
    testimonios.forEach(t => {
      const div = document.createElement("div");
      div.className = "col-md-6 mb-4";
      div.innerHTML = `
        <div class="card shadow-sm">
          <div class="card-body">
            <p class="card-text fst-italic">"${t.texto}"</p>
            <h6 class="card-subtitle mt-3 text-end">- ${t.nombre}</h6>
          </div>
        </div>`;
      contenedor.appendChild(div);
    });
  }

  function mostrarDetallesProyecto(event) {
    const button = event.target;
    if (!button.matches("button[data-index]")) return;
    const index = button.getAttribute("data-index");
    const proyecto = proyectos[index];
    document.getElementById("projectModalLabel").textContent = proyecto.titulo;
    document.getElementById("projectModalBody").innerHTML = `
      <img src="${proyecto.imagen}" class="img-fluid mb-3 rounded" alt="${proyecto.titulo}" />
      <p>${proyecto.detalles}</p>
      <h6>Tecnologías usadas:</h6>
      <p>${proyecto.tecnologias.join(", ")}</p>
      ${proyecto.repo ? `<a href="${proyecto.repo}" target="_blank" class="btn btn-outline-primary">Ver repositorio</a>` : ""}
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    cargarHabilidades();
    cargarHabilidadesBlandas();
    cargarProyectos();
    cargarTestimonios();

    document.getElementById("projects-container").addEventListener("click", mostrarDetallesProyecto);

    const toggle = document.getElementById("toggleDark");
    if (toggle) {
      toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const icon = toggle.querySelector("i");
        if (document.body.classList.contains("dark-mode")) {
          icon.classList.remove("bi-moon-fill");
          icon.classList.add("bi-sun-fill");
        } else {
          icon.classList.remove("bi-sun-fill");
          icon.classList.add("bi-moon-fill");
        }
      });
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Gracias por tu mensaje, me pondré en contacto pronto.");
        e.target.reset();
      });
    }

    const testimonialForm = document.getElementById("testimonial-form");
    if (testimonialForm) {
      testimonialForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("testimonial-name").value.trim();
        const texto = document.getElementById("testimonial-text").value.trim();
        if (!nombre || !texto) return;

        const nuevos = JSON.parse(localStorage.getItem("testimonios")) || [];
        nuevos.push({ nombre, texto });
        localStorage.setItem("testimonios", JSON.stringify(nuevos));

        e.target.reset();
        cargarTestimonios();
      });
    }
  });
