import { Modal, Text, TouchableOpacity, View} from "react-native";
import {AppColors} from "../../theme/AppTheme";
import styles from "../../theme/Styles";
import React from "react";


interface DeleteModalProps {
    visible: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export default function DeleteModal({visible, onClose, onDelete}: DeleteModalProps) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.7)',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20
            }}>
                <View style={{
                    backgroundColor: AppColors.cardBackground,
                    borderRadius: 10,
                    width: '90%',
                    height: 120,
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    <View style={{alignItems: "center", justifyContent: "center", height: "50%"}}>
                        <Text style={styles.titleText}>¿Borrar lista? no se podrá recuperar</Text>
                    </View>
                    <View style={{height: "50%", width: "100%", flexDirection: "row"}}>
                        <TouchableOpacity
                            style={{
                                height: "100%",
                                width: "50%",
                                borderWidth: 3,
                                borderColor: AppColors.primary,
                                borderBottomLeftRadius: 10,
                                alignItems: "center", justifyContent: "center",
                            }} onPress={onClose}>
                            <Text style={styles.titleText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                height: "100%",
                                width: "50%",
                                borderWidth: 3,
                                borderColor: AppColors.primary,
                                borderBottomRightRadius: 10,
                                alignItems: "center", justifyContent: "center",
                                backgroundColor: AppColors.alert
                            }} onPress={onDelete}>
                            <Text style={styles.titleText}>Borrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

