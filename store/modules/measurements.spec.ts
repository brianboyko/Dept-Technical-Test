/**
 * @jest-environment jsdom
 */

import {
  addLocations,
  removeLocation,
  setIsLoading,
  setErrMsg,
  clearErrMsg,
  fetchLatestMeasurements,
} from './measurements';
import { TEST_DATA } from '../../testData/testData';
import store from '../index';

const unmockedFetch = global.fetch;

beforeAll(() => {
  const payload = { results: TEST_DATA.slice(8, 10) };
  (global.fetch as any) = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(payload),
    });
  });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('measurement module', () => {
  beforeAll(() => {});
  it('should return the initial store.getState()', () => {
    expect(store.getState()).toEqual({
      measurements: {
        data: {},
        errMsg: '',
        isLoading: false,
      },
    });
  });
  describe('setIsLoading()', () => {
    it('should set the loading store.getState()', () => {
      store.dispatch(setIsLoading(true));
      expect(store.getState()).toEqual({
        measurements: {
          data: {},
          errMsg: '',
          isLoading: true,
        },
      });
      store.dispatch(setIsLoading(false));
      expect(store.getState()).toEqual({
        measurements: {
          data: {},
          errMsg: '',
          isLoading: false,
        },
      });
    });
  });
  describe('setErrMsg/clearErrMsg()', () => {
    it('should set the error mssage', () => {
      store.dispatch(setErrMsg(`fake error`));
      expect(store.getState()).toEqual({
        measurements: {
          data: {},
          errMsg: 'fake error',
          isLoading: false,
        },
      });
      store.dispatch(setErrMsg(`second fake error`));
      expect(store.getState()).toEqual({
        measurements: {
          data: {},
          errMsg: 'second fake error',
          isLoading: false,
        },
      });
      store.dispatch(clearErrMsg());
      expect(store.getState()).toEqual({
        measurements: {
          data: {},
          errMsg: '',
          isLoading: false,
        },
      });
    });
  });
  describe('addLocations()', () => {
    it('normalizes and adds locations', () => {
      const snippet = TEST_DATA.slice(0, 3);
      expect(Array.isArray(snippet)).toBe(true);
      store.dispatch(addLocations(snippet));
      expect(store.getState()).toEqual({
        measurements: {
          data: {
            'Haringey Roadside': {
              location: 'Haringey Roadside',
              city: 'London',
              country: 'GB',
              coordinates: { latitude: 51.5993, longitude: -0.068218 },
              measurements: [
                {
                  parameter: 'pm25',
                  value: 10,
                  lastUpdated: '2016-02-09T20:00:00+00:00',
                  unit: 'µg/m³',
                },
                {
                  parameter: 'no2',
                  value: 25,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
              ],
            },
            'London Harlington': {
              location: 'London Harlington',
              city: 'London',
              country: 'GB',
              coordinates: { latitude: 51.48879, longitude: -0.441614 },
              measurements: [
                {
                  parameter: 'o3',
                  value: 62,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
                {
                  parameter: 'no2',
                  value: 12,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
                {
                  parameter: 'pm10',
                  value: 8,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
                {
                  parameter: 'pm25',
                  value: 5,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
              ],
            },
            'Southwark A2 Old Kent Road': {
              location: 'Southwark A2 Old Kent Road',
              city: 'London',
              country: 'GB',
              coordinates: { latitude: 51.480499, longitude: -0.05955 },
              measurements: [
                {
                  parameter: 'no2',
                  value: 52,
                  lastUpdated: '2022-03-03T12:00:00+00:00',
                  unit: 'µg/m³',
                },
                {
                  parameter: 'pm25',
                  value: 4.4,
                  lastUpdated: '2022-03-05T16:00:00+00:00',
                  unit: 'µg/m³',
                },
                {
                  parameter: 'pm10',
                  value: 15,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
              ],
            },
          },
          isLoading: false,
          errMsg: '',
        },
      });
    });
  });
  describe('removeLocation()', () => {
    it('removes a location from the list', () => {
      store.dispatch(removeLocation('Southwark A2 Old Kent Road'));
      store.dispatch(removeLocation('Haringey Roadside'));

      expect(store.getState()).toEqual({
        measurements: {
          data: {
            'London Harlington': {
              location: 'London Harlington',
              city: 'London',
              country: 'GB',
              coordinates: { latitude: 51.48879, longitude: -0.441614 },
              measurements: [
                {
                  parameter: 'o3',
                  value: 62,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
                {
                  parameter: 'no2',
                  value: 12,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
                {
                  parameter: 'pm10',
                  value: 8,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
                {
                  parameter: 'pm25',
                  value: 5,
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  unit: 'µg/m³',
                },
              ],
            },
          },
          isLoading: false,
          errMsg: '',
        },
      });
    });
  });
  describe('fetchLatestMeasurements()', () => {
    it('fetches the latest measurements', async () => {
      store.dispatch(removeLocation('London Harlington'));
      expect(store.getState()).toEqual({
        measurements: {
          data: {},
          errMsg: '',
          isLoading: false,
        },
      });
      await store.dispatch(fetchLatestMeasurements('Manchester'));
      expect(store.getState()).toEqual({
        measurements: {
          data: {
            'London Teddington Bushy Park': {
              city: 'London',
              coordinates: {
                latitude: 51.425286,
                longitude: -0.345606,
              },
              country: 'GB',
              location: 'London Teddington Bushy Park',
              measurements: [
                {
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  parameter: 'pm25',
                  unit: 'µg/m³',
                  value: 5,
                },
                {
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  parameter: 'pm10',
                  unit: 'µg/m³',
                  value: 7,
                },
              ],
            },
            Thurrock: {
              city: 'London',
              coordinates: {
                latitude: 51.47707,
                longitude: 0.317969,
              },
              country: 'GB',
              location: 'Thurrock',
              measurements: [
                {
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  parameter: 'so2',
                  unit: 'µg/m³',
                  value: 1,
                },
                {
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  parameter: 'no2',
                  unit: 'µg/m³',
                  value: 22,
                },
                {
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  parameter: 'o3',
                  unit: 'µg/m³',
                  value: 50,
                },
                {
                  lastUpdated: '2022-03-05T20:00:00+00:00',
                  parameter: 'pm10',
                  unit: 'µg/m³',
                  value: 8,
                },
              ],
            },
          },
          errMsg: '',
          isLoading: false,
        },
      });
    });
  });
});
