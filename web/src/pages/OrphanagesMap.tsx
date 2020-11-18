import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { FiArrowRight } from "react-icons/fi";

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
   id: number;
   latitude: number;
   longitude: number;
   name: string;
}

function OrphanagesMap() {
   const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

   useEffect(() => {
      api.get('/orphanages').then(response => {
         setOrphanages(response.data);
      })
   }, []);

   return (
      <div id="page-map">
         <aside>
            <header>
               <Link to='/'>
                  <img src={mapMarkerImg} alt="Happy" />

               </Link>

               <h2>Escolha um orfanato no mapa</h2>
               <p>Muitas criaças estão esperando sua visita :)</p>
            </header>

            <footer>
               <strong>Mauá</strong>
               <span>São Paulo</span>
            </footer>
         </aside>

         <Map
            center={[-23.6712935, -46.468151]}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
         >
            {/* <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}
            <TileLayer
               url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />

            {orphanages.map(orphanage => {
               return (
                  <Marker
                     position={[orphanage.latitude, orphanage.longitude]}
                     icon={mapIcon}
                     key={orphanage.id}
                  >
                     <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                           <FiArrowRight size={20} color="#fff" />
                        </Link>
                     </Popup>
                  </Marker>
               )
            })}

         </Map>

         <Link to='/orphanages/create' className="create-orphanage">
            <FiPlus size={26} color="#FFF" />
         </Link>
      </div>
   )
}
export default OrphanagesMap
