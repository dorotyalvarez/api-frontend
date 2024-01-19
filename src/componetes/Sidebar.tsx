// Sidebar.tsx

import React from 'react';
import { FaHome, FaUser, FaEnvelope, FaCog, FaPowerOff } from 'react-icons/fa';

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
}

const sidebarData: SidebarItem[] = [
  { label: 'Inicio', icon: <FaHome /> },
  { label: 'Perfil', icon: <FaUser /> },
  { label: 'Correo', icon: <FaEnvelope /> },
  { label: 'Configuración', icon: <FaCog /> },
  { label: 'Cerrar Sesión', icon: <FaPowerOff /> },
];

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      {sidebarData.map((item, index) => (
        <div key={index} className={`sidebar-item sidebar-item-${index}`}>
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
