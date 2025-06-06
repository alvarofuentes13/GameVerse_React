import { Modal, Text, TouchableOpacity, View } from "react-native"; // Importa componentes de React Native
import { AppColors } from "../../theme/AppTheme"; // Importa colores de la aplicación
import styles from "../../theme/Styles"; // Importa estilos personalizados
import React from "react"; // Importa React

// Define las propiedades del modal de eliminación
interface DeleteModalProps {
    visible: boolean; // Estado de visibilidad del modal
    onClose: () => void; // Función para cerrar el modal
    onDelete: () => void; // Función para realizar la acción de eliminación
}

// Componente funcional que representa un modal de confirmación de eliminación
export default function DeleteModal({ visible, onClose, onDelete }: DeleteModalProps) {
    return (
        <Modal visible={visible} transparent animationType="fade"> // Modal con fondo transparente
            <View style={{
                flex: 1, // Ocupa todo el espacio disponible
                backgroundColor: 'rgba(0,0,0,0.7)', // Fondo oscuro semi-transparente
                justifyContent: 'center', // Centra verticalmente
                alignItems: 'center', // Centra horizontalmente
                padding: 20 // Espaciado interno
            }}>
                <View style={{
                    backgroundColor: AppColors.cardBackground, // Color de fondo del contenido del modal
                    borderRadius: 10, // Bordes redondeados
                    width: '90%', // Ancho del modal
                    height: 120, // Altura del modal
                    flexDirection: "column", // Disposición en columnas
                    justifyContent: "space-between" // Espaciado entre elementos
                }}>
                    <View style={{ alignItems: "center", justifyContent: "center", height: "50%" }}>
                        <Text style={styles.titleText}>¿Borrar lista? no se podrá recuperar</Text> // Mensaje de advertencia
                    </View>
                    <View style={{ height: "50%", width: "100%", flexDirection: "row" }}>
                        <TouchableOpacity
                            style={{
                                height: "100%", // Altura del botón
                                width: "50%", // Ancho del botón
                                borderWidth: 3, // Ancho del borde
                                borderColor: AppColors.primary, // Color del borde
                                borderBottomLeftRadius: 10, // Esquina inferior izquierda redondeada
                                alignItems: "center", justifyContent: "center", // Centra el contenido
                            }}
                            onPress={onClose} // Cierra el modal al presionar
                        >
                            <Text style={styles.titleText}>Cancelar</Text> // Texto del botón de cancelar
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                height: "100%", // Altura del botón
                                width: "50%", // Ancho del botón
                                borderWidth: 3, // Ancho del borde
                                borderColor: AppColors.primary, // Color del borde
                                borderBottomRightRadius: 10, // Esquina inferior derecha redondeada
                                alignItems: "center", justifyContent: "center", // Centra el contenido
                                backgroundColor: AppColors.alert // Color de fondo del botón de borrar
                            }}
                            onPress={onDelete} // Ejecuta la función de eliminación al presionar
                        >
                            <Text style={styles.titleText}>Borrar</Text> // Texto del botón de borrar
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
