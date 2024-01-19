// Obtener.tsx
import React from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const Obtener: React.FC = () => {
  // Estado local para almacenar la lista de productos.
  const [products, setProducts] = React.useState([]);

  // Efecto de montaje para cargar los productos al inicializar el componente.
  React.useEffect(() => {
    fetchProducts();
  }, []);

  // Estado local para manejar la visibilidad del modal de edición.
  const [showModal, setShowModal] = React.useState(false);

  // Estado local para almacenar el producto que se está editando.
  const [editedProduct, setEditedProduct] = React.useState({
    id: "",
    name: "",
    price: 0,
    description: "",
  });

  // Función para realizar la solicitud HTTP y cargar los productos.
  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    setProducts(response.data);
  };

  // Función para manejar la eliminación de un producto.
  const handleDelete = async (product: any) => {
    await axios.delete("http://localhost:3000/products/" + product.id);
    await fetchProducts();
  };

  // Función para manejar la apertura del modal de edición.
  const handleEdit = (product: any) => {
    setEditedProduct(product);
    setShowModal(true);
  };

  // Función para manejar el cierre del modal de edición.
  const handleCloseModal = () => {
    setShowModal(false);
    setEditedProduct({
      id: "",
      name: "",
      price: 0,
      description: "",
    });
  };

  // Función para guardar los cambios después de la edición.
  const handleSaveEdit = async () => {
    await axios.put(
      `http://localhost:3000/products/${editedProduct.id}`,
      editedProduct
    );
    await fetchProducts();
    handleCloseModal();
  };

  return (
    <div className="tabla_div">
      <h2>Lista de Productos:</h2>
      {products ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>
                  <Button
                    variant="outline-info"
                    onClick={() => handleDelete(product)}
                    style={{ margin: "5px" }}
                  >
                    Eliminar
                  </Button>{" "}
                  <Button
                    variant="outline-info"
                    onClick={() => handleEdit(product)}
                    style={{ margin: "5px" }}
                  >
                    Editar
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Cargando datos...</p>
      )}

      {/* Modal para la edición */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                value={editedProduct.name}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio del producto"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción del producto"
                value={editedProduct.description}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Obtener;
