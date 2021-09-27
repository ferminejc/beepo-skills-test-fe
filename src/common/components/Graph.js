import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  AreaSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import {
  stackOffsetWiggle,
  stackOrderInsideOut,
  curveCatmullRom,
  area,
} from 'd3-shape';

import { Stack, Animation } from '@devexpress/dx-react-chart';

const Area = (props) => {
  const path = area()
    .x(({ arg }) => arg)
    .y1(({ val }) => val)
    .y0(({ startVal }) => startVal)
    .curve(curveCatmullRom);

  return <AreaSeries.Path {...props} path={path} />;
};

const titleStyle = { marginRight: '120px' };
const TitleText = (props) => <Title.Text {...props} style={titleStyle} />;

const Graph = (props) => {
  const { endDates } = props;
  return (
    <Paper className={'fadeInUp'}>
      <Chart
        data={endDates}
        style={{ paddingLeft: '20px' }}
      >
        <ArgumentAxis tickFormat={() => (tick) => tick} />

        <AreaSeries
          name='Devices'
          valueField='NumberOfExpiringItems'
          argumentField='ExpiryDateLabel'
          seriesComponent={Area}
          color="orange"
        />

        <Animation />
        <Legend />
        <Title text='Number of Devices' textComponent={TitleText} />
        <Stack
          stacks={[
            {
              series: ['Devices'],
            },
          ]}
          offset={stackOffsetWiggle}
          order={stackOrderInsideOut}
        />
      </Chart>
    </Paper>
  );
};

export default Graph;
