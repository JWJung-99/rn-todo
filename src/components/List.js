import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from '../components/ListItem';
import PropTypes from 'prop-types';
import { GRAY } from '../Colors';

const Separator = () => {
  return <View style={styles.separator} />;
};

const List = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ListItem item={item} />}
      windowSize={2}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: GRAY.LIGHT,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default List;
