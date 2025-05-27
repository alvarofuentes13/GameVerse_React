import React from "react";
import { Modal, View, TouchableOpacity, Text, Image } from "react-native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import styles from "../../theme/Styles";

interface AvatarPickModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (avatar: object) => void;
    avatarOptions: any[];
}

export default function AvatarPickModal({ visible, onClose, onSelect, avatarOptions }: AvatarPickModalProps) {
    return (
        <Modal visible={visible} transparent animationType="fade" >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.7)',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20
            }}>
                <View style={{
                    backgroundColor: AppColors.cardBackground,
                    padding: 20,
                    borderRadius: 10,
                    width: '90%',
                    borderWidth: 3,
                    borderColor: "#24243C"
                }}>
                    <Text style={ styles.titleText }>Elige tu avatar</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
                        {avatarOptions.map((avatar, index) => (
                            <TouchableOpacity key={index} onPress={() => onSelect(avatar)}>
                                <Image
                                    source={avatar}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 35,
                                        margin: 10,
                                        borderWidth: 2,
                                        borderColor: '#fff'
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={{ color: AppColors.yellow, textAlign: 'center', marginTop: 15, fontFamily: AppFonts.medium, fontSize: 16 }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
