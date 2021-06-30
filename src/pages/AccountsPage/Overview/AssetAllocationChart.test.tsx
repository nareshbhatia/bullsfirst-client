import React from 'react';
import { RefreshContextProvider } from '../../../contexts';
import { render, waitForElementToBeRemoved } from '../../../test/test-utils';
import {
  AssetAllocationChart,
  computePieSeries,
  computePieDrilldown,
} from './AssetAllocationChart';

const sectorAllocations = [
  {
    categoryId: 'consumer-cyclical',
    categoryName: 'Consumer Cyclical',
    value: 2000,
    percentage: 0.2,
    children: [
      {
        categoryId: 'autos',
        categoryName: 'Autos',
        value: 500,
        percentage: 0.25,
      },
      {
        categoryId: 'restaurants',
        categoryName: 'Restaurants',
        value: 1500,
        percentage: 0.75,
      },
    ],
  },
  {
    categoryId: 'technology',
    categoryName: 'Technology',
    value: 8000,
    percentage: 0.8,
    children: [
      {
        categoryId: 'computer-hardware',
        categoryName: 'Computer Hardware',
        value: 1000,
        percentage: 0.125,
      },
      {
        categoryId: 'application-software',
        categoryName: 'Application Software',
        value: 7000,
        percentage: 0.875,
      },
    ],
  },
];

const expectedSeries = [
  {
    name: 'Sectors',
    data: [
      { name: 'Technology', y: 80, drilldown: 'technology' },
      { name: 'Consumer Cyclical', y: 20, drilldown: 'consumer-cyclical' },
    ],
  },
];

const expectedDrilldown = {
  activeDataLabelStyle: {
    color: '#000000',
    fontWeight: 'normal',
    textDecoration: 'none',
  },
  series: [
    {
      id: 'consumer-cyclical',
      name: 'Consumer Cyclical',
      data: [
        ['Restaurants', 75],
        ['Autos', 25],
      ],
    },
    {
      id: 'technology',
      name: 'Technology',
      data: [
        ['Application Software', 88],
        ['Computer Hardware', 13],
      ],
    },
  ],
};

// mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    accountId: 'brokerage-account',
  }),
}));

describe('<AssetAllocationChart />', () => {
  test('computePieSeries() computes the series correctly', () => {
    const actualSeries = computePieSeries(sectorAllocations);
    expect(actualSeries).toEqual(expectedSeries);
  });

  test('computePieDrilldown() computes the drilldown correctly', () => {
    const actualDrilldown = computePieDrilldown(sectorAllocations);
    expect(actualDrilldown).toEqual(expectedDrilldown);
  });

  test('renders correctly', async () => {
    const { container, getByText } = render(
      <RefreshContextProvider>
        <AssetAllocationChart />
      </RefreshContextProvider>
    );

    await waitForElementToBeRemoved(getByText('Loading...'));

    const pies = container.querySelectorAll('.highcharts-point');
    expect(pies).toHaveLength(3);
  });
});
