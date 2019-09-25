import React from 'react';
import { Dimensions } from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import { getCurrentDateInISO, countObjWithSameDate } from '../utils/dateUtils';

export const CustomContributionGraph = (props) => {

    const { weights, ...otherProps } = props;
    const now = getCurrentDateInISO();

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2 // optional, default 3
      }


    const commitsData = countObjWithSameDate(weights.map(weight => ({ date: weight.date.slice(0, 10), count: 1 })));

    return (
        <ContributionGraph
        values={commitsData}
        endDate={new Date(now)}
        numDays={105}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={chartConfig}
        {...otherProps}
        />
    )
}
