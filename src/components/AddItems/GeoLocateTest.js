import React from 'react';
import {geolocated} from 'react-geolocated';
import Geocode from 'react-geocode';
import  ReverseGeocoder from 'open-street-map-reverse-geo-node-client';
import Axios from 'axios';
import LocationButton from './LocationButton'

const reverse = require('reverse-geocode')
const  geo  =  ReverseGeocoder
var geocoder = require('geocoder');
const parser = require('fast-xml-parser');
const he = require('he');


const options = {
  attributeNamePrefix : "@_",
  attrNodeName: "attr", //default is 'false'
  textNodeName : "#text",
  ignoreAttributes : true,
  ignoreNameSpace : false,
  allowBooleanAttributes : false,
  parseNodeValue : true,
  parseAttributeValue : false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  localeRange: "", //To support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
  tagValueProcessor : a => he.decode(a) //default is a=>a
};

class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
        response: [],
        postalCode: 0
    }
}

    getAddress = async() => {
      if(this.props.coords.longitude){
       let location = await Axios.get(`http://api.geonames.org/findNearbyPostalCodes?lat=${this.props.coords.latitude}&lng=${this.props.coords.longitude}&username=ghuscroft`).then((reject, cleared)=> {this.setState({response: reject})})
       var tObj = parser.getTraversalObj(this.state.response.data,options);
       let jsonObj = parser.convertToJson(tObj,options);
       let ps = (jsonObj.geonames.code[0].postalcode)
       this.setState({
        postalCode: ps
      })
      console.log(this.state.postalCode)
      this.props.updateZip(this.state.postalCode)
      this.props.getStores()
    }
    };
    
   
  render() 
  

  {
    return (
    <>
  
    {this.props.coords ?
    <div style={{display: "block"}}><LocationButton onClick={()=>this.getAddress()}/> <p style={{fontSize: "10px" , position: "relative" , top: "-10px"}}>Find My Zip</p> </div>: null
  }
    
    {/* {!this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
              <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
              <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
              <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
            </tbody>
          </table>
               
          : <div>Getting the location data&hellip; </div>
        
        } */}
        </>
        )
  }
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Demo);