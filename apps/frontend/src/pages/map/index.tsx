import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import AdminWrapper from 'shared/components/Wrappers/AdminWrapper';
import { YMaps } from '@pbe/react-yandex-maps';
import { IResult } from 'shared/models/IResult';
import axios from 'axios';
import { Card } from 'shared/components/Card';
import { Flex, Loader, Stack, Text } from '@mantine/core';
import { Map } from 'shared/components/Map';

import style from './MapPage.module.scss';

const MapPage = () => {
  const location = useLocation();
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (location?.state.result) {
      location?.state.result.map((item: IResult) => {
        try {
          if (item.address) {
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
          }
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
        <Flex gap={16}>
          <Card>
            {markers.length ? (
              <Map markers={markers} w={1139} />
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
          <Card h={'fit-content'} w={390}>
            <Stack spacing={24}>
              <Text className={style.title}>Выбранные адреса</Text>
              {location.state &&
                location.state?.result.map((item: IResult) => (
                  <Text className={style.text}>{item.address}</Text>
                ))}
            </Stack>
          </Card>
        </Flex>
      </YMaps>
      <></>
    </AdminWrapper>
  );
};

export default MapPage;
