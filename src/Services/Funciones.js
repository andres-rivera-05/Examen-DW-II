import axios from "axios";

export const borrarLibro = async (idLibro, setCambioEstado) => {
    const url = `http://localhost:5000/api/libro/delete/${idLibro}`;
    await axios.delete(url);
    setCambioEstado(prevState => prevState + 1)
}

export const obtenerLibros = async () => {
    try {
        const url = "http://localhost:5000/api/libro";
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener libros:", error);
        throw error;
    }
}

export const buscarLibros = (filtro, dataLibros, setBusquedaRealizada, setNoResultados) => {
    if (filtro.trim() === '') {
        return [];
    } else {
        const resultados = dataLibros.filter(libro =>
            libro.id.toString().includes(filtro.toLowerCase()) ||
            libro.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
            libro.autor.toLowerCase().includes(filtro.toLowerCase()) ||
            libro.estado.toLowerCase().includes(filtro.toLowerCase())
        );

        setBusquedaRealizada(resultados.length > 0);
        setNoResultados(resultados.length === 0);
        return resultados;
    }
}

