import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const Nuevo: React.FC = () => {
  // Estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);

  // Estados para almacenar los detalles del nuevo producto
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

  // Función para manejar el cambio en los inputs del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Realizar una solicitud POST para crear un nuevo producto
      await axios.post("http://localhost:3000/products", newProduct);
      // Limpiar el formulario después de la creación exitosa
      setNewProduct({
        name: "",
        price: 0,
        description: "",
      });
      // Ocultar el formulario después de crear el producto
      setShowForm(false);
      alert("Producto creado exitosamente");
    } catch (error) {
      alert("Error al crear el producto:");
    }
  };
  // Función para manejar el clic en el botón "Cancelar"
  const handleCancel = () => {
    setShowForm(false);
  };
  // También puedes restablecer el formulario en este punto si lo deseas
  return (
    <div className="nuevo-producto">
      {/* Mostrar el formulario solo si showForm es true */}
      {showForm ? (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formProductName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio del producto"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          {/* Campo de entrada para la descripción del producto */}
          <Form.Group controlId="formProductDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripción del producto"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          {/* Botón para enviar el formulario */}
          <Button variant="primary" type="submit">
            Crear Producto
          </Button>
          {/* Botón para cancelar la creación del producto */}
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </Form>
      ) : (
        // Botón para mostrar el formulario
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Nuevo Producto
        </Button>
      )}
    </div>
  );
};

export default Nuevo;
