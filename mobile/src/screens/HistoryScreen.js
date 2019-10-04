import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import { List } from '../components/List';
import { CustomContributionGraph } from '../components/CustomContributionGraph';
import { getWeights } from '../actions/dataActions';
import { loading } from '../actions/commonActions';
import { NavigationEvents } from 'react-navigation';


const HistoryScreen = (props) => {
    const isLoading = useSelector(state => state.common.isLoading);
    const token = useSelector(state => state.auth.accessToken);
    const [weights, setWeights] = useState([]);
    const dispatch = useDispatch();

    const handleGetWeights = () => {
      dispatch(getWeights(token))
        .then(res => {
          setWeights(res.data);
        })
        .catch(err => {
          dispatch(loading(false));
          ToastAndroid.show(err.response.data.message);
        })
    }

      if(isLoading) {
        return (
          <ActivityIndicator size="large" color="#0000ff" />
        )
      }
        return (
          <View>
            <NavigationEvents
              onWillFocus={handleGetWeights}
            />
            <ScrollView>
                <CustomContributionGraph
                    weights={weights}
                />
                <List weights={weights} navigation={props.navigation}/>
            </ScrollView>
          </View>
      )
}
    export default HistoryScreen;