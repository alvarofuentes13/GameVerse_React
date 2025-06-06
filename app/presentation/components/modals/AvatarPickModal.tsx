import React from "react"; // Importa React
import { Modal, View, TouchableOpacity, Text, Image } from "react-native"; // Importa componentes de React Native
import { AppColors, AppFonts } from "../../theme/AppTheme"; // Importa colores y fuentes de la aplicación
import styles from "../../theme/Styles"; // Importa estilos personalizados

// Define las propiedades del modal para seleccionar un avatar
interface AvatarPickModalProps {
    visible: boolean; // Estado de visibilidad del modal
    onClose: () => void; // Función para cerrar el modal
    onSelect: (avatar: object) => void; // Función para seleccionar un avatar
    avatarOptions: any[]; // Opciones de avatares disponibles
}

// Componente funcional que representa un modal para elegir un avatar
export default function AvatarPickModal({ visible, onClose, onSelect, avatarOptions }: AvatarPickModalProps) {
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
                    padding: 20, // Espaciado interno
                    borderRadius: 10, // Bordes redondeados
                    width: '90%', // Ancho del modal
                    borderWidth: 3, // Ancho del borde
                    borderColor: "#24243C" // Color del borde
                }}>
                    <Text style={styles.titleText}>Elige tu avatar</Text> // Título del modal
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
                        {avatarOptions.map((avatar, index) => ( // Mapea las opciones de avatares
                            <TouchableOpacity key={index} onPress={() => onSelect(avatar)}> // Botón para seleccionar un avatar
                                <Image
                                    source={avatar} // Fuente de la imagen del avatar
                                    style={{
                                        width: 70, // Ancho de la imagen
                                        height: 70, // Altura de la imagen
                                        borderRadius: 35, // Bordes redondeados para hacerla circular
                                        margin: 10, // Margen alrededor de la imagen
                                        borderWidth: 2, // Ancho del borde de la imagen
                                        borderColor: '#fff' // Color del borde de la imagen
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={onClose}> // Botón para cerrar el modal
                        <Text style={{ color: AppColors.yellow, textAlign: 'center', marginTop: 15, fontFamily: AppFonts.medium, fontSize: 16 }}>Cancelar</Text> // Texto del botón de cancelar
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
