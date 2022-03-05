import normalizeBy from './normalizeBy';
import { TEST_DATA } from '../testData/testData';

describe('utils/normalizeBy()', () => {
  it('normalizes an array of data based on a provided key', () => {
    expect(TEST_DATA).toHaveLength(16);
    const result = normalizeBy(TEST_DATA, 'location');
    expect(Object.keys(result).sort()).toEqual([
      'Google Street View Car',
      'Haringey Roadside',
      'London Bexley',
      'London Eltham',
      'London Haringey Priory Park South',
      'London Harlington',
      'London Hillingdon',
      'London N. Kensington',
      'London Teddington',
      'London Teddington Bushy Park',
      'Southend-on-Sea',
      'Southwark A2 Old Kent Road',
      'Thurrock',
      'Tower Hamlets Roadside',
    ]);
    expect(result['Google Street View Car']).toEqual( {
        "city": "London",
        "coordinates": null,
        "country": "GB",
        "location": "Google Street View Car",
        "measurements":  [
           {
            "lastUpdated": "2019-10-05T16:19:13+00:00",
            "parameter": "no",
            "unit": "ppm",
            "value": 0.026888,
          },
           {
            "lastUpdated": "2019-10-28T20:12:27+00:00",
            "parameter": "co2",
            "unit": "ppm",
            "value": 429.471,
          },
           {
            "lastUpdated": "2019-10-28T20:12:27+00:00",
            "parameter": "no2",
            "unit": "ppm",
            "value": 0.016766,
          },
           {
            "lastUpdated": "2019-10-05T16:19:13+00:00",
            "parameter": "nox",
            "unit": "µg/m³",
            "value": 81.2461538461538,
          },
           {
            "lastUpdated": "2019-10-28T20:12:27+00:00",
            "parameter": "pm25",
            "unit": "µg/m³",
            "value": 10.42832,
          },
        ],
      }
    );
  });
});
