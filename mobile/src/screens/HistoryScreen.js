import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { List } from '../components/List';
import { CustomContributionGraph } from '../components/CustomContributionGraph';
import { getWeights } from '../actions/dataActions';
import ActionTypes from '../consts/ActionTypes';
import { NavigationEvents } from 'react-navigation';


export const HistoryScreen = (props) => {

    const token = useSelector(state => state.auth.accessToken);
    const message = useSelector(state => state.common.message);
    const weights = useSelector(state => state.data.weights);
    const dispatch = useDispatch();

    useEffect(() => {
        if(message) {
          ToastAndroid.show(message, ToastAndroid.SHORT);
          dispatch({ type: ActionTypes.CLEAR_MESSAGES });
        }
      })

    const commitsData = [
        { date: '2017-01-02', count: 1 },
        { date: '2017-01-03', count: 2 },
        { date: '2017-01-04', count: 3 },
        { date: '2017-01-05', count: 4 },
        { date: '2017-01-06', count: 5 },
        { date: '2017-01-30', count: 2 },
        { date: '2017-01-31', count: 3 },
        { date: '2017-03-01', count: 2 },
        { date: '2017-04-02', count: 4 },
        { date: '2017-03-05', count: 2 },
        { date: '2017-02-30', count: 4 }
      ]
        return (
          <View>
            <NavigationEvents
              onWillFocus={() => dispatch(getWeights(token))}
            />
            <ScrollView>
                <CustomContributionGraph
                    weights={weights}
                />
                <List weights={weights}/>
            </ScrollView>
          </View>
      )
}
