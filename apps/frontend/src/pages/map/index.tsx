import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import AdminWrapper from 'shared/components/Wrappers/AdminWrapper';
import { YMaps, Map, Clusterer, Placemark } from '@pbe/react-yandex-maps';
import { IResult } from 'shared/models/IResult';
import axios from 'axios';
import { Card } from 'shared/components/Card';
import { Loader } from '@mantine/core';

const MapPage = () => {
  const location = useLocation();
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (location?.state.result) {
      location?.state.result.map((item: IResult) => {
        try {
          axios
            .get(
              `https://geocode-maps.yandex.ru/1.x/?apikey=5fff5614-b0c5-4970-b75d-28aa88c46171&format=json&geocode=Москва, ${item.address}`
            )
            .then((response) => {
              let stringArray: string[] =
                response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
                  ' '
                );
              setMarkers((item) => [
                ...item!,
                {
                  x: +stringArray[1],
                  y: +stringArray[0],
                },
              ]);
            });
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, []);

  return (
    <AdminWrapper fullWidth title="Результаты на карте">
      <YMaps
        query={{
          apikey: '5fff5614-b0c5-4970-b75d-28aa88c46171',
          load: 'package.full',
        }}
      >
        <Card>
          {markers.length ? (
            <Map
              defaultState={{
                center: [markers[0].x, markers[0].y],
                zoom: 9,
                controls: ['zoomControl', 'fullscreenControl'],
              }}
              modules={['control.ZoomControl', 'control.FullscreenControl']}
              width={1139}
              height={'80vh'}
            >
              <Clusterer
                options={{
                  preset: 'islands#invertedGreenClusterIcons',
                  groupByCoordinates: false,
                }}
              >
                {markers.map((item, index) => (
                  <Placemark
                    key={index}
                    defaultGeometry={[item.x, item.y]}
                    modules={[
                      'geoObject.addon.hint',
                      'geoObject.addon.balloon',
                    ]}
                    options={{
                      preset: 'islands#greenCircleDotIcon',
                      iconImageSize: [16, 16],
                    }}
                  />
                ))}
              </Clusterer>
            </Map>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '1139px',
                height: '80vh',
              }}
            >
              <Loader size={'xl'} color="grape.5" />
            </div>
          )}
        </Card>
      </YMaps>
      <></>
    </AdminWrapper>
  );
};

export default MapPage;
