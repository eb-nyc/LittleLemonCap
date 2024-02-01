import { View, Pressable, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <Pressable
          key={index}
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1 / sections.length,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: selections[index] ? '#F4CE14' : 'white',
            borderWidth: 0.5,
            borderColor: 'black',
          }}>
          <View>
            <Text style={{ color: selections[index] ? 'black' : 'black' }}>
              {section}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default Filters;
