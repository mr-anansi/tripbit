import React, { useState, useEffect } from 'react'
import MapGL from 'react-map-gl'
import ReactFilestack from 'filestack-react'
import axios from 'axios'

import { fileloaderKey } from '../config/environment'
import Mask from '../images/mask-dark-gradient.png'
import Auth from '../lib/auth'

// this is a public key but maybe change to different key and put in .env?
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2VvcmdwIiwiYSI6ImNrMzM1bnN0azBuY2IzZnBiZ3d2eDA5dGQifQ.Ym1lHqYUfUUu2m897J4hcg' // Set your mapbox token here

const example_user = {
  'id': 2,
  'username': 'kitkat',
  'first_name': 'kit',
  'last_name': 'kat',
  'score': null,
  'image': 'https://bit.ly/37UONby',
  'towns': [],
  'trips': [],
  'badges': [
    {
      "id": 1,
      "name": "﻿Afghanistan",
      "description": "Visit at least one city in Afghanistan",
      "image": "https://restcountries.eu/data/afg.svg",
      "users": []
    },
    {
      "id": 2,
      "name": "Albania",
      "description": "Visit at least one city in Albania",
      "image": "https://restcountries.eu/data/alb.svg",
      "users": []
    },
    {
      "id": 3,
      "name": "Algeria",
      "description": "Visit at least one city in Algeria",
      "image": "https://restcountries.eu/data/dza.svg",
      "users": []
    },
    {
      "id": 4,
      "name": "Angola",
      "description": "Visit at least one city in Angola",
      "image": "https://restcountries.eu/data/ago.svg",
      "users": []
    },
    {
      "id": 5,
      "name": "Argentina",
      "description": "Visit at least one city in Argentina",
      "image": "https://restcountries.eu/data/arg.svg",
      "users": []
    },
    {
      "id": 140,
      "name": "Romania",
      "description": "Visit at least one city in Romania",
      "image": "https://restcountries.eu/data/rou.svg",
      "users": []
    },
    {
      "id": 141,
      "name": "Russia",
      "description": "Visit at least one city in Russia",
      "image": "https://restcountries.eu/data/rus.svg",
      "users": []
    },
    {
      "id": 142,
      "name": "Rwanda",
      "description": "Visit at least one city in Rwanda",
      "image": "https://restcountries.eu/data/rwa.svg",
      "users": []
    },
    {
      "id": 143,
      "name": "Sao Tome And Principe",
      "description": "Visit at least one city in Sao Tome And Principe",
      "image": "https://restcountries.eu/data/stp.svg",
      "users": []
    },
    {
      "id": 144,
      "name": "Saudi Arabia",
      "description": "Visit at least one city in Saudi Arabia",
      "image": "https://restcountries.eu/data/sau.svg",
      "users": []
    },
    {
      "id": 145,
      "name": "Senegal",
      "description": "Visit at least one city in Senegal",
      "image": "https://restcountries.eu/data/sen.svg",
      "users": []
    },
    {
      "id": 146,
      "name": "Serbia",
      "description": "Visit at least one city in Serbia",
      "image": "https://restcountries.eu/data/srb.svg",
      "users": []
    },
    {
      "id": 147,
      "name": "Sierra Leone",
      "description": "Visit at least one city in Sierra Leone",
      "image": "https://restcountries.eu/data/sle.svg",
      "users": []
    },
    {
      "id": 148,
      "name": "Singapore",
      "description": "Visit at least one city in Singapore",
      "image": "https://restcountries.eu/data/sgp.svg",
      "users": []
    },
    {
      "id": 149,
      "name": "Slovakia",
      "description": "Visit at least one city in Slovakia",
      "image": "https://restcountries.eu/data/svk.svg",
      "users": []
    },
    {
      "id": 150,
      "name": "Slovenia",
      "description": "Visit at least one city in Slovenia",
      "image": "https://restcountries.eu/data/svn.svg",
      "users": []
    },
    {
      "id": 151,
      "name": "Somalia",
      "description": "Visit at least one city in Somalia",
      "image": "https://restcountries.eu/data/som.svg",
      "users": []
    },
    {
      "id": 152,
      "name": "South Africa",
      "description": "Visit at least one city in South Africa",
      "image": "https://restcountries.eu/data/zaf.svg",
      "users": []
    },
    {
      "id": 184,
      "name": "5+ Countries",
      "description": "Vistied at least 5 countries",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 185,
      "name": "10+ Countries",
      "description": "Visited at least 10 countries",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 195,
      "name": "5+ Cities",
      "description": "Vistied at least 5 cities",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 196,
      "name": "10+ Cities",
      "description": "Visited at least 10 cities",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 202,
      "name": "Europe",
      "description": "Visit at least one country on the continent of Europe",
      "image": "https://image.flaticon.com/icons/svg/533/533467.svg",
      "users": []
    },
    {
      "id": 203,
      "name": "North America",
      "description": "Visit at least one country on the continent of North America",
      "image": "https://image.flaticon.com/icons/svg/1973/1973592.svg",
      "users": []
    },
    {
      "id": 204,
      "name": "South America",
      "description": "Visit at least one country on the continent of South America",
      "image": "https://image.flaticon.com/icons/svg/1752/1752275.svg",
      "users": []
    },
    {
      "id": 205,
      "name": "Asia",
      "description": "Visit at least one country on the continent of Asia",
      "image": "https://image.flaticon.com/icons/svg/1086/1086208.svg",
      "users": []
    },
    {
      "id": 206,
      "name": "Africa",
      "description": "Visit at least one country on the continent of Africa",
      "image": "https://image.flaticon.com/icons/svg/520/520064.svg",
      "users": []
    },
    {
      "id": 207,
      "name": "Oceania",
      "description": "Visit at least one country on the continent of Oceania",
      "image": "https://image.flaticon.com/icons/svg/284/284475.svg",
      "users": []
    },
    {
      "id": 208,
      "name": "Viking",
      "description": "Visit at least one of Norway, Sweden, Denmark, Finland or Iceland",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 209,
      "name": "Columbus",
      "description": "Spain, Portugal and one of (South America)",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 210,
      "name": "Kerouac",
      "description": "Visit 6 in the USA",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 211,
      "name": "Stan",
      "description": "Visit any of the -stans",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 212,
      "name": "Arctic Circle",
      "description": "Vist any city above 66°N",
      "image": "https://image.flaticon.com/icons/svg/2445/2445217.svg",
      "users": []
    },
    {
      "id": 213,
      "name": "Equator",
      "description": "Vist any city within 1°S and 1°N",
      "image": "https://image.flaticon.com/icons/svg/1899/1899084.svg",
      "users": []
    },
    {
      "id": 214,
      "name": "Most countries",
      "description": "Visit the most countries on the platform",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 215,
      "name": "Most cities",
      "description": "Visit the most cities on the platform",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 216,
      "name": "Most capitals",
      "description": "Visit the most capitals on the platform",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    },
    {
      "id": 217,
      "name": "MEGA BADGE",
      "description": "Have the most badges on the platform",
      "image": "http://pixelartmaker.com/art/086fe7507559c28.png",
      "users": []
    }
  ],
  'groups_owned': [],
  'groups_joined': [],
  'groups_podium1': [],
  'groups_podium2': [],
  'groups_podium3': []
}

const options = {
  accept: 'image/*',
  transformations: {
    crop: true,
    circle: true,
    rotate: true
  }
}


const Profile = () => {

  // info from api get request will be stored here
  const [profile, setProfile] = useState({})
  const [errors, setErrors] = useState({})

  // TO DO write code to zoom to bounding box containing all places user has been to
  const [viewport, setViewport] = useState({
    latitude: 51.5,
    longitude: 0.13,
    zoom: 4,
    bearing: 0,
    pitch: 0
  })
  const [data, setData] = useState({})

  const handleImageUpload = (res) => {
    console.log(res.filesUploaded[0].url)
    // console.log(res.filesUploaded[1].url)
    const data = { ...data, image: res.filesUploaded[0].url }
    setData({ data })
  }


  // toggle between profile info, true for left and false for right (links next to profile image)
  const [panel, setPanel] = useState(true)
  // states for stats modals
  const [continentModal, setContinentModal] = useState(false)
  const [countryModal, setCountryModal] = useState(false)
  const [cityModal, setCityModal] = useState(false)

  // show 'right' stats
  const showRight = () => {
    setPanel(false)
  }

  // show 'left' stats
  const showLeft = () => {
    setPanel(true)
  }

  const toggleContinent = () => {
    setContinentModal(!continentModal)
  }

  const toggleCountry = () => {
    setCountryModal(!countryModal)
  }

  const toggleCity = () => {
    setCityModal(!cityModal)
  }

  useEffect(() => {
    axios.get(`api/profile/${Auth.getUserId()}`)
      .then(resp => setProfile(resp))
      .catch(err => setErrors(err))
  }, [])
  console.log('profile ', profile)

  return (
    <div>

      <MapGL
        {...viewport}
        position="absolute"
        width="100vw"
        height="66vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />

      <section className="hero" id="user-profile-header">
        <div className="hero-body level is-mobile">
          <p className="level-item subtitle is-3" onClick={showLeft}>Link 1</p>
          <figure className="level-item image is-128x128">
            <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
          </figure>
          <p className="level-item subtitle is-3" onClick={showRight}>Link 2</p>
        </div>
        <div className="level is-mobile">
          <div className="level-item has-text-centered" onClick={toggleContinent}>
            <div>
              <p className="heading">Continents</p>
              <p className="title">3</p>
            </div>
          </div>
          <div className="level-item has-text-centered" onClick={toggleCountry}>
            <div>
              <p className="heading">Countries</p>
              <p className="title">12</p>
            </div>
          </div>
          <div className="level-item has-text-centered" onClick={toggleCity}>
            <div>
              <p className="heading">Cities</p>
              <p className="title">22</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">XP</p>
              <p className="title">780</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h1 className="title is-1">Add details</h1>
          <ReactFilestack
            mode='transform'
            apikey={fileloaderKey}
            componentDisplayMode={{
              type: 'button',
              customText: 'Add an Image'
            }}
            buttonClass='button'
            options={options}
            onSuccess={handleImageUpload}
            preload={true}
          />
          {data.image &&
            <figure className="image is-128x128">
              <img className="is-rounded" src={data.image} />
              <br />
            </figure>
          }
        </div>
      </section>

      <section className={panel ? 'section' : 'section hide'} id="user-profile">
        <div className="container">
          <div className="subtitle">
            Badges
          </div>
          <div className="badge-display">
            {example_user.badges.map((badge, i) => {
              return <div className="badge" key={i}>
                <div className="image is-150x150">
                  <div className="badge" >
                    <img className="image is-150x150" style={{ backgroundImage: `url(${badge.image})` }} src={Mask} alt="" />
                    <div className="overlay">
                      <div className="is-size-6">{badge.name}</div>
                      <div className="is-size-7">{badge.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </section>

      <section className={panel ? 'section hide' : 'section'} id="user-profile">
        <div className="container">
          <div className="subtitle">
            Groups
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="subtitle">
            Need some space down here - agreed!
          </div>
        </div>
      </section>

      {/* stats modals below */}

      <div className={continentModal === true ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <p>inContinents</p>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={toggleContinent}></button>
      </div>
      
      <div className={countryModal === true ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <p>Countries you've been to</p>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={toggleCountry}></button>
      </div>
      
      <div className={cityModal === true ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <p>Cities you've been to</p>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={toggleCity}></button>
      </div>

    </div>
  )
}

export default Profile