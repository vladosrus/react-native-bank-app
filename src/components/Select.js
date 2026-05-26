import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Select = ({ label, data, value, onSelect, placeholder, error }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Находим выбранный объект для отображения его имени на кнопке
  const selectedItem = data.find(item => item.id === value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[styles.selectButton, error && styles.errorBorder]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.selectText, !selectedItem && styles.placeholderText]}
        >
          {selectedItem
            ? `${selectedItem.name} (${selectedItem.balance} ${selectedItem.currency})`
            : placeholder || 'Выберите из списка'}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Модальное окно со списком опций */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>{label}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Закрыть</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.optionItem,
                  item.id === value && styles.selectedOptionItem,
                ]}
                onPress={() => {
                  onSelect(item.id);
                  setModalVisible(false);
                }}
              >
                <View>
                  <Text style={styles.optionName}>{item.name}</Text>
                  <Text style={styles.optionId}>Номер: {item.id}</Text>
                </View>
                <Text style={styles.optionBalance}>
                  {item.balance} {item.currency}
                </Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C727A',
    marginBottom: 8,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E3E6',
  },
  errorBorder: {
    borderColor: '#FF3B30',
  },
  selectText: {
    fontSize: 16,
    color: '#1A1C1E',
  },
  placeholderText: {
    color: '#9AA1A9',
  },
  arrow: {
    fontSize: 12,
    color: '#9AA1A9',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E3E6',
    backgroundColor: '#FFF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  closeButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOptionItem: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F7FF',
  },
  optionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  optionId: {
    fontSize: 12,
    color: '#9AA1A9',
    marginTop: 2,
  },
  optionBalance: {
    fontSize: 16,
    fontWeight: '700',
    color: '#34C759',
  },
});

export default Select;
