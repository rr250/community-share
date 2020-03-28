import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function Home({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity>
        <Card>
          <Text style={globalStyles.titleText}>
            Create a new Request
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity>
        <Card>
          <Text style={globalStyles.titleText}>
            Create a new Help
          </Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
}