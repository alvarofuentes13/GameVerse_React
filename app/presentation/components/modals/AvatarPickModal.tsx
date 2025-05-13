import React from "react";
import { Modal, View, TouchableOpacity, Text, Image } from "react-native";

interface AvatarPickModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (avatarUri: string) => void;
    avatarOptions: any[];
}

export default function AvatarPickModal({ visible, onClose, onSelect, avatarOptions }: AvatarPickModalProps) {
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
                    backgroundColor: '#1E1E2F',
                    padding: 20,
                    borderRadius: 10,
                    width: '90%'
                }}>
                    <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>Elige tu avatar</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                        <Text style={{ color: '#FFD700', textAlign: 'center', marginTop: 15 }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
