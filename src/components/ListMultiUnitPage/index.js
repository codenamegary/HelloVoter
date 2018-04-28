import React, { PureComponent } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-simple-modal';
import KnockPage from '../KnockPage';

export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      refer: props.navigation.state.params.refer,
      node: props.navigation.state.params.node,
      myNodes: props.navigation.state.params.refer.state.myNodes,
      isKnockMenuVisible: false,
    };
  }

  render() {
    const { refer } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}} contentContainerStyle={{flexGrow:1}}>
        <View>
          <Text style={{fontSize: 20, padding: 10}}>{this.state.node.address.join(", ")}</Text>
          <FlatList
            scrollEnabled={false}
            data={refer.getChildNodesById(this.state.node.id, this.state.myNodes)}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              let nodes = refer.getChildNodesById(item.id, this.state.myNodes);
              let color = refer.getPinColor(item);

              let icon = (color === "red" ? "ban" : "address-book");

              let info = {};

              if (nodes.length)  {
                let last = nodes[nodes.length-1];
                if (last.survey) {
                  info.FullName = last.survey.FullName;
                  info.PartyAffiliation = last.survey.PartyAffiliation;
                }
                info.LastVisted = last.created;
              };

              return (
                <View key={item.id} style={{padding: 10}}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      this.setState({ isKnockMenuVisible: true });
                    }}>
                    <Icon name={icon} size={40} color={color} style={{margin: 5}} />
                    <Text>Unit: {item.unit}, {JSON.stringify(info)}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <Modal
          open={this.state.isKnockMenuVisible}
          modalStyle={{width: 335, height: 280, backgroundColor: "transparent",
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          style={{alignItems: 'center'}}
          offset={0}
          overlayBackground={'rgba(0, 0, 0, 0.75)'}
          animationDuration={200}
          animationTension={40}
          modalDidOpen={() => undefined}
          modalDidClose={() => this.setState({isKnockMenuVisible: false})}
          closeOnTouchOutside={true}
          disableOnBackPress={false}>
          <KnockPage refer={this} />
        </Modal>

      </ScrollView>
     );
   }
}

const iconStyles = {
  justifyContent: 'center',
  borderRadius: 10,
  padding: 10,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  centerscreen: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  header: {
    fontSize: 22,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});
