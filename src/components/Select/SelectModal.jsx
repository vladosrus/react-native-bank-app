import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@/constants';
import OptionItem from './OptionItem';

const SelectModal = ({ visible, label, data, value, onSelect, onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View
        style={[
          s.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={s.header}>
          <Text style={s.title}>{label}</Text>

          <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
            <Text style={s.closeButton}>Закрыть</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          contentContainerStyle={s.listContent}
          renderItem={({ item }) => (
            <OptionItem
              isSelected={item.id === value}
              onPress={() => onSelect(item.id)}
              {...item}
            />
          )}
        />
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.separator,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
  },
  closeButton: {
    fontSize: FONT_SIZE.base,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.semibold,
  },
  listContent: { padding: SPACING.md },
});

export default SelectModal;
