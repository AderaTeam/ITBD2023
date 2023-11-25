import { Map as YandexMap, Clusterer, Placemark } from '@pbe/react-yandex-maps';

interface Props {
  w?: number;
  markers: { x: number; y: number }[];
}

export const Map = ({ markers, w }: Props) => {
  return (
    <YandexMap
      defaultState={{
        center: [markers[0].x, markers[0].y],
        zoom: 9,
        controls: ['zoomControl', 'fullscreenControl'],
      }}
      modules={['control.ZoomControl', 'control.FullscreenControl']}
      width={w}
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
            modules={['geoObject.addon.hint', 'geoObject.addon.balloon']}
            options={{
              preset: 'islands#greenCircleDotIcon',
              iconImageSize: [16, 16],
            }}
          />
        ))}
      </Clusterer>
    </YandexMap>
  );
};
